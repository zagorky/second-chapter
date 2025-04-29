import '../App.css'
import {RouterProvider} from "react-router/dom";
import {AppRouter} from "~app/router.tsx";

export const App = () => {
    return (
        <RouterProvider router={AppRouter} />
    );
};

