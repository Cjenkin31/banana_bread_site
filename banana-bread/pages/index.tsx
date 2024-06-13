// pages/index.tsx
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

function Home() {
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-cover bg-gray-900 p-4 text-white">
      {!session && (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
          <h1 className="text-5xl font-bold mb-5">Welcome to the BananaBread Gaming Corner</h1>
          <button
            onClick={() => signIn('discord')}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-150 ease-in-out"
          >
            Sign in with Discord
          </button>
        </div>
      )}
      {session && (
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

          <footer className="mt-10">
            <p>Powered by The Banana Bread Bot</p>
            <button
              onClick={() => signOut()}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-150 ease-in-out mt-5"
            >
              Sign out
            </button>
          </footer>
        </>
      )}
    </main>
  );
}

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
