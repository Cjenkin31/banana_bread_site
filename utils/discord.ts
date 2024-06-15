import axios from 'axios';

export async function fetchDiscordUserInfo(discordId: string) {
  const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;

  if (!DISCORD_BOT_TOKEN) {
    throw new Error('DISCORD_BOT_TOKEN is not set');
  }

  const response = await axios.get(`https://discord.com/api/users/${discordId}`, {
    headers: {
      Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
    },
  });

  return response.data;
}
