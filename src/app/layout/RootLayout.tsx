import { FC } from 'react';
import { Link, Outlet } from 'react-router-dom';

export const RootLayout: FC = () => {
  return (
    <>
      <header className="py-4">
        <Link to="/">
          <div className="flex items-center">
            <div className="h-8 w-8">
              <img src="/logo.svg" alt="logo" />
            </div>
            <div className="text-xl font-bold text-cyan-700">VALANTIS</div>
          </div>
        </Link>
      </header>
      <main className="w-full">
        <Outlet />
      </main>
    </>
  );
};
