import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "./Home";
import NotFound, { ErrorBoundary } from "./NotFound";
import Login from "./Login";
import Signup from "./Signup";
import Upload from "./Upload";
import Watch, { loadVideo } from "./Watch";
import Subscription, { loadSubscriptions } from "./Subscription";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        ErrorBoundary: NotFound,
        children: [
            { index: true, Component: Home },
            { path: "login", Component: Login },
            { path: "signup", Component: Signup },
            { path: "upload", Component: Upload },
            { path: "subscriptions", loader: loadSubscriptions, Component: Subscription, ErrorBoundary: ErrorBoundary },
            { path: "watch/:videoId", loader: loadVideo, Component: Watch, ErrorBoundary: ErrorBoundary },
        ]
    },
]);
