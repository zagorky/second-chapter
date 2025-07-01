import { appInitializer } from '~app/appInitializer';
import {
  AboutPage,
  CartPage,
  CatalogPage,
  ErrorPage,
  MainPage,
  ProductPage,
  ProfilePage,
  SignInPage,
  SignUpPage,
} from '~app/pages/lazy';
import { AboutUsPageSkeleton } from '~components/ui/page-skeleton/aboutUsPageSkeleton';
import { CartPageSkeleton } from '~components/ui/page-skeleton/cartPageSkeleton';
import { CatalogPageSkeleton } from '~components/ui/page-skeleton/catalogPageSkeleton';
import { ErrorPageSkeleton } from '~components/ui/page-skeleton/errorPageSkeleton';
import { MainPageSkeleton } from '~components/ui/page-skeleton/mainPageSkeleton';
import { ProductPageSkeleton } from '~components/ui/page-skeleton/productPageSkeleton';
import { ProfilePageSkeleton } from '~components/ui/page-skeleton/profilePageSkeleton';
import { SignupPageSkeleton } from '~components/ui/page-skeleton/signupPageSkeleton';
import { SinginPageSkeleton } from '~components/ui/page-skeleton/singinPageSkeleton';
import { authenticatedUserGuard, navigationRoutes, unauthenticatedUserGuard } from '~config/navigation';
import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router';

import { MainLayout } from '~/components/layouts/mainLayout';

export const appRouter = createBrowserRouter([
  {
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    loader: appInitializer.initialize,
    hydrateFallbackElement: <></>,
    children: [
      {
        path: navigationRoutes.main.path,
        errorElement: <ErrorPage />,
        element: (
          <Suspense fallback={<MainPageSkeleton />}>
            <MainPage />
          </Suspense>
        ),
      },
      {
        path: navigationRoutes.login.path,
        errorElement: <ErrorPage />,
        loader: authenticatedUserGuard,
        element: (
          <Suspense fallback={<SinginPageSkeleton />}>
            <SignInPage />
          </Suspense>
        ),
      },
      {
        path: navigationRoutes.signup.path,
        loader: authenticatedUserGuard,
        errorElement: <ErrorPage />,
        element: (
          <Suspense fallback={<SignupPageSkeleton />}>
            <SignUpPage />
          </Suspense>
        ),
      },
      {
        path: navigationRoutes.about.path,
        errorElement: <ErrorPage />,
        element: (
          <Suspense fallback={<AboutUsPageSkeleton />}>
            <AboutPage />
          </Suspense>
        ),
      },
      {
        path: navigationRoutes.catalog.path,
        errorElement: <ErrorPage />,
        element: (
          <Suspense fallback={<CatalogPageSkeleton />}>
            <CatalogPage />
          </Suspense>
        ),
      },
      {
        path: navigationRoutes.cart.path,
        errorElement: <ErrorPage />,
        element: (
          <Suspense fallback={<CartPageSkeleton />}>
            <CartPage title={navigationRoutes.cart.title} />
          </Suspense>
        ),
      },
      {
        path: navigationRoutes.product.path + '/:key',
        errorElement: <ErrorPage />,
        element: (
          <Suspense fallback={<ProductPageSkeleton />}>
            <ProductPage />
          </Suspense>
        ),
      },
      {
        path: navigationRoutes.profile.path,
        errorElement: <ErrorPage />,
        loader: unauthenticatedUserGuard,
        element: (
          <Suspense fallback={<ProfilePageSkeleton />}>
            <ProfilePage />
          </Suspense>
        ),
      },
      {
        path: navigationRoutes.error.path,
        element: (
          <Suspense fallback={<ErrorPageSkeleton />}>
            <ErrorPage />
          </Suspense>
        ),
      },
    ],
  },
]);
