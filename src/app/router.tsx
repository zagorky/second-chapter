import { appInitializer } from '~app/appInitializer';
import { AboutUsPageSkeleton } from '~app/pages/about-page/aboutUsPageSkeleton';
import { CartPageSkeleton } from '~app/pages/cart-page/cartPageSkeleton';
import { CatalogPageSkeleton } from '~app/pages/catalog-page/catalogPageSkeleton';
import { ErrorPageSkeleton } from '~app/pages/error-page/errorPageSkeleton';
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
import { MainPageSkeleton } from '~app/pages/main-page/mainPageSkeleton';
import { ProductPageSkeleton } from '~app/pages/product-page/productPageSkeleton';
import { ProfilePageSkeleton } from '~app/pages/profile-page/profilePageSkeleton';
import { SignupPageSkeleton } from '~app/pages/sign-in-page/signupPageSkeleton';
import { SinginPageSkeleton } from '~app/pages/sign-up-page/singinPageSkeleton';
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
