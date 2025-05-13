import { Header } from '~components/ui/header/header';
import { Outlet, useLocation } from 'react-router';

export const MainLayout = () => {
  const location = useLocation();

  return (
    <div className="bg-muted min-h-screen">
      <Header />
      <main className="mx-auto w-full max-w-6xl p-8 text-center">
        <Outlet key={location.pathname} />
      </main>
    </div>
  );
};
