import { Outlet } from "react-router"
import { Header } from "./components"
import useAuthStore from "./store/store";
import { useEffect } from "react";

function App() {
    const login = useAuthStore(state => state.login);
    useEffect(() => {
        ; (async () => {
            try {

                const response = await fetch("/api/v1/users/current-user", {
                    method: "GET",
                    credentials: "include"
                });
                if (!response.ok) {
                    await fetch("/api/v1/users/refresh-token", {
                        method: "POST",
                        credentials: "include"
                    });
                }
                const user = await response.json();
                login(user);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        })();
    }, []);
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}

export default App
