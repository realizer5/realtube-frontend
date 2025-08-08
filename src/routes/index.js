import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "./Home";
import NotFound from "./NotFound";
import Login from "./Login";
import Signup from "./Signup";
import upload from "./upload";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            { index: true, Component: Home },
            { path: "login", Component: Login },
            { path: "signup", Component: Signup },
            { path: "upload", Component: upload },
        ]
    },
    {
        path: "*",
        Component: NotFound,
    }
]);
