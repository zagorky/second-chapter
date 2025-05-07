import { Header } from '~components/ui/header/header.tsx';
import { Outlet } from 'react-router';

export const MainLayout = () => {
  return (
    <div className="bg-muted min-h-screen">
      <Header />
      <main className="mx-auto w-full max-w-6xl p-8 text-center">
        <Outlet />
      </main>
    </div>
  );
};
