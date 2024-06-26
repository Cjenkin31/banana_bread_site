// app/pages/coin-flip.tsx
import React from 'react';
import { useRouter } from 'next/router';

export default function CoinFlip() {
  const [result, setResult] = React.useState<string | null>(null);
  const router = useRouter();

  const flipCoin = () => {
    setResult(Math.random() > 0.5 ? 'Heads' : 'Tails');
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <button
        className="self-start mt-10 bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-150 ease-in-out"
        onClick={() => router.back()}
      >
        &larr; Back
      </button>
      <h1 className="text-5xl font-bold mb-5">Coin Flip Game</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-150 ease-in-out"
        onClick={flipCoin}
      >
        Flip Coin
      </button>
      {result && <p className="mt-5 text-3xl animate-pulse">{result}</p>}
    </main>
  );
}
