import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import jwt from 'jsonwebtoken';
import { adminDb } from '../firebaseAdmin';

interface JwtPayload {
  discordId: string;
  username: string;
  avatar: string;
}

function isJwtPayload(decoded: any): decoded is JwtPayload {
  return decoded && typeof decoded.discordId === 'string' && typeof decoded.username === 'string';
}

const Home = ({ user, bananas }: { user: any, bananas: number }) => {
  const [discordId, setDiscordId] = useState('');
  const [authToken, setAuthToken] = useState('');
  const [message, setMessage] = useState('');
  const [isVerified, setIsVerified] = useState(!!user);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ discordId, authToken }),
      });

      const data = await res.json();
      if (data.message) {
        setIsVerified(true);
        window.location.reload();
      } else {
        setMessage(data.error);
      }
    } catch (error) {
      setMessage('An error occurred');
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-cover bg-gray-900 p-4 text-white">
      {!isVerified ? (
        <section className="flex flex-col items-center mt-10">
          <h2 className="text-3xl font-bold mb-5">Verify Your Discord ID </h2>
          <h3 className=" font-bold mb-5">(use /get_auth_token in Discord to get your Auth Token) </h3>
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <input
              type="text"
              placeholder="Discord ID"
              value={discordId}
              onChange={(e) => setDiscordId(e.target.value)}
              className="mb-4 p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              placeholder="Auth Token"
              value={authToken}
              onChange={(e) => setAuthToken(e.target.value)}
              className="mb-4 p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Verify and Link Discord ID
            </button>
          </form>
          {message && <p className="mt-5">{message}</p>}
        </section>
      ) : (
        <>
          <header className="mb-10">
            <h1 className="text-5xl font-bold text-white shadow-lg">Welcome to the BananaBread Gaming Corner</h1>
            <p className="mt-3 text-lg">Play, Compete, and Earn Rewards</p>

          </header>
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <GameCard title="Slots" description="Try your luck at our themed slot machines." image="/images/slot_card_image.png" link="/slots" />
            <GameCard title="BlackJack" description="Beat the dealer to 21 in our Blackjack game." image="/images/blackjack_card_image.png" link="/blackjack" />
            <GameCard title="Poker" description="Join the table in our high-stakes Poker games." image="/images/poker_card_image.png" link="/poker" />
            <GameCard title="Coin Flipping" description="A quick flip can double your stakes or more." image="/images/coin_card_image.png" link="/coin-flip" />
            <GameCard title="Roulette" description="Place your bets on our Roulette wheel." image="/images/roulette_card_image.png" link="/roulette" />
          </section>
        </>
      )}
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies.token || '';

  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not set');
  }

  let decodedToken: JwtPayload | null = null;
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (isJwtPayload(decoded)) {
      decodedToken = decoded;
    }
  } catch (error) {
    console.error('Error verifying token:', error);
  }

  console.log('Decoded Token:', decodedToken);

  if (!decodedToken) {
    return {
      props: { user: null, bananas: 0 },
    };
  }

  const userRef = adminDb.ref(`users/${decodedToken.discordId}`);
  const userSnapshot = await userRef.get();
  const userData = userSnapshot.val();

  console.log('User Data:', userData);

  return {
    props: {
      user: userData ? {
        username: userData.user_name || null,
        avatar: `https://cdn.discordapp.com/avatars/${decodedToken.discordId}/${decodedToken.avatar}` || null,
      } : null,
      bananas: userData ? userData.bananas || 0 : 0,
    },
  };
};

function GameCard({ title, description, image, link }: { title: string, description: string, image: string, link: string }) {
  return (
    <div className="rounded-lg overflow-hidden shadow-lg transition-transform duration-300 ease-in-out hover:scale-105">
      <Link href={link} legacyBehavior>
        <a>
          <Image src={image} alt={title} width={400} height={250} objectFit="cover" />
          <div className="p-4 bg-black bg-opacity-70">
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="text-sm">{description}</p>
          </div>
        </a>
      </Link>
    </div>
  );
}

export default Home;
