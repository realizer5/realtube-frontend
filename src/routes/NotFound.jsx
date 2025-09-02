import { Link } from "react-router";
import { isRouteErrorResponse, useRouteError, } from "react-router";

export default function NotFound() {
    return (
        <div className="text-5xl font-bold">
            Not Found try again loser
            <Link to={"/"}> Home </Link>
        </div>
    )
}


export function ErrorBoundary() {
    const error = useRouteError();

    if (isRouteErrorResponse(error)) {
        return (
            <div>
                <h1>
                    {error.status} {error.statusText}
                </h1>
                <p>{error.data}</p>
            </div>
        );
    } else if (error instanceof Error) {
        return (
            <div>
                <h1>Error</h1>
                <p>{error.message}</p>
                <p>The stack trace is:</p>
                <pre>{error.stack}</pre>
            </div>
        );
    } else {
        return <h1>Unknown Error</h1>;
    }
}

