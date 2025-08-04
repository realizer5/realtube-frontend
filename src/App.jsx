import { Outlet } from "react-router"
import { Header } from "./components"

function App() {

    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}

export default App
