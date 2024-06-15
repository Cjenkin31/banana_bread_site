import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { adminDb } from '../../../firebaseAdmin';
import { fetchDiscordUserInfo } from '../../../utils/discord';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not set');
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { discordId, authToken } = req.body;

    if (!discordId || !authToken) {
      return res.status(400).json({ error: 'Missing discordId or authToken' });
    }

    try {
      const ref = adminDb.ref(`users/${discordId}/auth_token`);
      const snapshot = await ref.get();

      if (!snapshot.exists()) {
        return res.status(404).json({ error: 'User not found' });
      }

      const storedToken = snapshot.val();

      if (storedToken === authToken) {
        const userInfoSnapshot = await adminDb.ref(`users/${discordId}`).get();
        const userInfo = userInfoSnapshot.val();

        // Fetch the correct username and avatar from Discord API
        const discordUserInfo = await fetchDiscordUserInfo(discordId);

        const token = jwt.sign({ discordId, username: discordUserInfo.username, avatar: discordUserInfo.avatar }, JWT_SECRET, { expiresIn: '7d' });

        res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=604800; Secure; SameSite=Strict`);
        return res.status(200).json({ message: 'User authenticated successfully', username: discordUserInfo.username, avatar: `https://cdn.discordapp.com/avatars/${discordId}/${discordUserInfo.avatar}`, bananas: userInfo.bananas });
      } else {
        return res.status(403).json({ error: 'Invalid auth token' });
      }
    } catch (error) {
      console.error('Error verifying user:', error);
      return res.status(500).json({ error: 'Failed to verify user' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
