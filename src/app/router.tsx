import { AboutPage, CartPage, CatalogPage, MainPage, SignInPage, SignUpPage } from '~app/pages/lazy.tsx';
import { PageSkeleton } from '~components/ui/page-skeleton/pageSkeleton.tsx';
import { navigationRoutes } from '~config/navigation.ts';
import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router';

import { MainLayout } from '~/components/layouts/mainLayout.tsx';

export const AppRouter = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: navigationRoutes.main.path,
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <MainPage />
          </Suspense>
        ),
      },
      {
        path: navigationRoutes.login.path,
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <SignInPage />
          </Suspense>
        ),
      },
      {
        path: navigationRoutes.signup.path,
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <SignUpPage />
          </Suspense>
        ),
      },
      {
        path: navigationRoutes.about.path,
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <AboutPage />
          </Suspense>
        ),
      },
      {
        path: navigationRoutes.catalog.path,
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <CatalogPage />
          </Suspense>
        ),
      },
      {
        path: navigationRoutes.cart.path,
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <CartPage />
          </Suspense>
        ),
      },
    ],
  },
]);
