import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "./Home";
import NotFound from "./NotFound";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            { index: true, Component: Home },
        ]
    },
    {
        path: "*",
        Component: NotFound,
    }
]);
