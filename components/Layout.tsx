import { ReactNode } from 'react';
import Image from 'next/image';

interface LayoutProps {
  children: ReactNode;
  user: any;
  bananas: number;
}

const Layout: React.FC<LayoutProps> = ({ children, user, bananas }) => {
  return (
    <div>
      {user && (
        <header className="fixed top-0 right-0 p-4 bg-gray-800 text-white flex items-center z-50">
          <div className="w-12 h-12 rounded-full mr-4 relative">
            <Image src={user.avatar} alt={user.username} layout="fill" objectFit="cover" className="rounded-full" />
          </div>
          <div>
            <p className="text-lg">Logged in as: {user.username}</p>
            <p className="text-lg">Banana Coins: {bananas}</p>
          </div>
        </header>
      )}
      <main className="">{children}</main>
    </div>
  );
};

export default Layout;
