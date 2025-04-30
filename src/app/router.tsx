import { MainLayout } from '~components/layouts/mainLayout.tsx';
import { createBrowserRouter } from 'react-router';

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
          const { CartPage } = await import('~app/pages/cart-page/cartPage.tsx');

          return {
            element: <CartPage />,
          };
        },
      },
    ],
  },
]);
