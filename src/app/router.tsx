import {createBrowserRouter} from "react-router";
import {MainLayout} from "~components/layouts/main-layout.tsx";

export const AppRouter = createBrowserRouter([
    {
        element: <MainLayout/>,
        children:[
            {
                path: '/',
                async lazy() {
                    const { MainPage } = await import('../app/pages/main-page/main-page.tsx');
                    return {
                        element: <MainPage />
                    };
                }
            },
            {
                path: '/about',
                async lazy() {
                    const { AboutPage } = await import('../app/pages/about-page/about-page.tsx');
                    return {
                        element: <AboutPage />
                    };
                }
            },
            {
                path: '/catalog',
                async lazy() {
                    const { CatalogPage } = await import('../app/pages/catalog-page/catalog-page.tsx');
                    return {
                        element: <CatalogPage />
                    };
                }
            },
            {
                path: '/cart',
                async lazy() {
                    const { CartPage } = await import('~app/pages/cart-page/cart-page.tsx');
                    return {
                        element: <CartPage />
                    };
                }
            },
        ]
    },
])