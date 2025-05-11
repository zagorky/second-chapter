import { AboutPage, CartPage, CatalogPage, MainPage, SignInPage, SignUpPage } from '~app/pages/lazy';
import { PageSkeleton } from '~components/ui/page-skeleton/pageSkeleton';
import { navigationRoutes } from '~config/navigation';
import { ProtectedRoute } from '~features/sign-in/components/protectedRoute';
import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router';

import { MainLayout } from '~/components/layouts/mainLayout';

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
          <ProtectedRoute>
            <Suspense fallback={<PageSkeleton />}>
              <SignInPage />
            </Suspense>
          </ProtectedRoute>
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
