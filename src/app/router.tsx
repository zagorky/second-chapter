import { AboutPage, CartPage, CatalogPage, MainPage, SignInPage, SignUpPage } from '~app/pages/lazy.tsx';
import { navigationRoutes } from '~config/navigation.ts';
import { createBrowserRouter } from 'react-router';

import { MainLayout } from '~/components/layouts/mainLayout.tsx';

export const AppRouter = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: navigationRoutes.main.path,
        element: <MainPage />,
      },
      {
        path: navigationRoutes.login.path,
        element: <SignInPage />,
      },
      {
        path: navigationRoutes.signup.path,
        element: <SignUpPage />,
      },
      {
        path: navigationRoutes.about.path,
        element: <AboutPage />,
      },
      {
        path: navigationRoutes.catalog.path,
        element: <CatalogPage />,
      },
      {
        path: navigationRoutes.cart.path,
        element: <CartPage />,
      },
    ],
  },
]);
