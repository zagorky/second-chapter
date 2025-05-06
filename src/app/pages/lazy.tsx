import { lazy } from 'react';

export const MainPage = lazy(() => import('~app/pages/main-page/mainPage.tsx'));
export const SignInPage = lazy(() => import('~app/pages/sign-in-page/signInPage.tsx'));
export const CatalogPage = lazy(() => import('~app/pages/catalog-page/catalogPage.tsx'));
export const SignUpPage = lazy(() => import('~app/pages/sign-up-page/signUpPage.tsx'));
export const AboutPage = lazy(() => import('~app/pages/about-page/aboutPage.tsx'));
export const CartPage = lazy(() => import('~app/pages/cart-page/cartPage.tsx'));
