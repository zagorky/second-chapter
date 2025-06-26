import { lazy } from 'react';

export const MainPage = lazy(() => import('~app/pages/main-page/mainPage'));
export const SignInPage = lazy(() => import('~app/pages/sign-in-page/signInPage'));
export const CatalogPage = lazy(() => import('~app/pages/catalog-page/catalogPage'));
export const SignUpPage = lazy(() => import('~app/pages/sign-up-page/signUpPage'));
export const AboutPage = lazy(() => import('~app/pages/about-page/aboutPage'));
export const CartPage = lazy(() => import('~app/pages/cart-page/cartPage'));
export const ErrorPage = lazy(() => import('~app/pages/error-page/errorPage'));
export const ProductPage = lazy(() => import('~app/pages/product-page/productPage'));
export const ProfilePage = lazy(() => import('~app/pages/profile-page/profilePage'));
