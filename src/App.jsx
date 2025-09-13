import { Outlet } from "react-router"
import { Header } from "./components"
import useAuthStore from "./store/store";
import useFetch from "./hooks/useFetch";

function App() {
    const login = useAuthStore(state => state.login);
    const { data, loading } = useFetch("/api/v1/users/current-user", {
        method: "GET",
        credentials: "include"
    });
    if (loading) return <div> loading... </div>
    if (data) {
        login(data);
        return (
            <>
                <Header />
                <Outlet />
            </>
        )
    }
}

export default App
