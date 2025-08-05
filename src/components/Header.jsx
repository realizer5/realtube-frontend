import { Menu, MonitorPlay, Search, X } from "lucide-react";
import { Button } from "./";
import { useRef, useState } from "react";
import { Link } from "react-router";

const SearchForm = () => {
    const [search, setSearch] = useState("");
    const searchRef = useRef(null);

    const clearField = () => {
        setSearch("");
        searchRef.current.focus()
    }

    return (
        <form className="flex items-center w-100">
            <div className="relative flex justify-end items-center w-full">
                <input type="search" className="w-full rounded-s-2xl py-2 px-4 font-medium border
                    focus:outline-0 focus:border-air-superiority-blue transition-colors duration-100"
                    placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)}
                    ref={searchRef} />
                {search && <button type="reset" className="absolute right-2 rounded-full cursor-pointer
                        p-2 hover:bg-gray-200 h-10 w-10" onClick={clearField} ><X /></button>}
            </div>
            <button type="submit" className="rounded-e-2xl py-2 px-4 border border-l-0 cursor-pointer">
                <Search className="active:scale-95" />
            </button>
        </form>
    )
}

const Navbar = ({ toggleSidebar }) => {
    return (
        <nav className="px-4 py-2 font-ubuntu flex justify-between bg-white">
            <div className="flex items-center gap-2">
                <Button onClick={toggleSidebar}>
                    <Menu />
                </Button>
                <Link to="/" className="flex gap-1 text-barn-red items-center">
                    <MonitorPlay />
                    <h1 className="font-semibold text-normal">Realtube</h1>
                </Link>
            </div>
            <SearchForm />
            <Button>Log In</Button>
        </nav >
    )
}

const Sidebar = ({ isOpen }) => {
    return (
        <aside className={`bg-white min-h-screen fixed top-0 -z-10 w-40
         ${isOpen ? "translate-x-0" : "-translate-x-40"} transition-transform duration-200`}>
        </aside >
    )
};

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };
    return (
        <header className="sticky z-30 top-0">
            <Navbar toggleSidebar={toggleSidebar} />
            <Sidebar isOpen={isOpen} />
        </header>
    )
};

export default Header
