import { Header } from '~components/ui/header/header';
import { Outlet, useLocation } from 'react-router';

export const MainLayout = () => {
  const location = useLocation();

  return (
    <div className="bg-secondary-background flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto flex w-full max-w-6xl flex-grow flex-col p-8 text-center">
        <Outlet key={location.pathname} />
      </main>
    </div>
  );
};
