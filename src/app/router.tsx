import { createBrowserRouter } from 'react-router';

import { MainLayout } from '~/components/layouts/mainLayout.tsx';

export const AppRouter = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        async lazy() {
          const { MainPage } = await import('./pages/main-page/mainPage.tsx');

          return {
            element: <MainPage />,
          };
        },
      },
      {
        path: '/signin',
        async lazy() {
          const { SignInPage } = await import('./pages/signin-page/signinPage.tsx');

          return {
            element: <SignInPage />,
          };
        },
      },
      {
        path: '/signup',
        async lazy() {
          const { SignupPage } = await import('./pages/signup-page/signupPage.tsx');

          return {
            element: <SignupPage />,
          };
        },
      },
      {
        path: '/about',
        async lazy() {
          const { AboutPage } = await import('./pages/about-page/aboutPage.tsx');

          return {
            element: <AboutPage />,
          };
        },
      },
      {
        path: '/catalog',
        async lazy() {
          const { CatalogPage } = await import('./pages/catalog-page/catalogPage.tsx');

          return {
            element: <CatalogPage />,
          };
        },
      },
      {
        path: '/cart',
        async lazy() {
          const { CartPage } = await import('~/app/pages/cart-page/cartPage.tsx');

          return {
            element: <CartPage />,
          };
        },
      },
    ],
  },
]);
