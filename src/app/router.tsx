import { AboutPage, CartPage, CatalogPage, MainPage, SignInPage, SignUpPage } from '~app/pages/lazy.tsx';
import { NAVIGATION_ROUTES } from '~config/navigation.ts';
import { createBrowserRouter } from 'react-router';

import { MainLayout } from '~/components/layouts/mainLayout.tsx';

export const AppRouter = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: NAVIGATION_ROUTES.main,
        element: <MainPage />,
      },
      {
        path: NAVIGATION_ROUTES.signin,
        element: <SignInPage />,
      },
      {
        path: NAVIGATION_ROUTES.signup,
        element: <SignUpPage />,
      },
      {
        path: NAVIGATION_ROUTES.about,
        element: <AboutPage />,
      },
      {
        path: NAVIGATION_ROUTES.catalog,
        element: <CatalogPage />,
      },
      {
        path: NAVIGATION_ROUTES.cart,
        element: <CartPage />,
      },
    ],
  },
]);
