import {
    ChevronRight, GalleryVerticalEnd, History, Home, ListVideo, Menu, MonitorPlay, Search,
    SquarePlay, ThumbsUp, User, X
} from "lucide-react";
import { Button } from "./";
import { useRef, useState } from "react";
import { Link, NavLink } from "react-router";

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
                <input type="search" className="w-full rounded-s-2xl py-2 px-4 pr-8 font-medium border
                    focus:outline-0 focus:border-air-superiority-blue transition-colors duration-100"
                    placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)}
                    ref={searchRef} />
                {search && <button type="reset" className="absolute right-0 rounded-full cursor-pointer
                        p-2 hover:bg-gray-900/20 size-10" onClick={clearField} ><X /></button>}
            </div>
            <button type="submit" className="rounded-e-2xl py-2 px-4 border border-l-0 cursor-pointer bg-air-superiority-blue">
                <Search className="active:scale-95" />
            </button>
        </form>
    )
}

const Navbar = ({ toggleSidebar, isOpen }) => {
    return (
        <nav className="px-4 py-2 flex justify-between bg-white">
            <div className="flex items-center gap-2">
                <button className="rounded-md px-4 py-2 font-bold cursor-pointer inline-block
                    active:scale-95 transition-colors duration-200 hover:bg-air-superiority-blue text-black"
                    onClick={toggleSidebar}>
                    {isOpen ? <X /> : <Menu />}
                </button>
                <Link to="/" className="flex gap-1 text-prussian-blue items-center">
                    <MonitorPlay />
                    <h1 className="font-semibold text-normal">Realtube</h1>
                </Link>
            </div>
            <SearchForm />
            <div className="space-x-2">
                <Link to="/upload">
                    <Button>Create</Button>
                </Link>
                <Link to="/login">
                    <Button>Log In</Button>
                </Link>
            </div>
        </nav >
    )
};

const Sidebar = ({ isOpen }) => {
    return (
        <aside className={`bg-white min-h-screen fixed top-0 -z-10 w-60
         ${isOpen ? "translate-x-0" : "-translate-x-60"} transition-transform duration-200 px-2 `}>
            <ul className="mt-16 py-2 ">
                <li>
                    <NavLink to={"/"}
                        className={({ isActive }) => `${isActive ? "bg-air-superiority-blue" : ""} hover:bg-air-superiority-blue px-4 py-2 rounded-lg flex items-center gap-4`}>
                        <Home />
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/subscriptions"}
                        className={({ isActive }) => `${isActive ? "bg-air-superiority-blue" : ""} hover:bg-air-superiority-blue px-4 py-2 rounded-lg flex items-center gap-4`}>
                        <GalleryVerticalEnd />
                        Subscriptions
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/profile"}
                        className={({ isActive }) => `${isActive ? "bg-air-superiority-blue" : ""} hover:bg-air-superiority-blue px-4 py-2 rounded-lg flex items-center gap-4`}>
                        <User />
                        Profile
                    </NavLink>
                </li>
            </ul>
            <ul className="border-t bordert-t-gray-500 py-2">
                <li>
                    <NavLink to={"/"}
                        className={`hover:bg-air-superiority-blue px-4 py-2 rounded-lg flex items-center gap-2`}>
                        You
                        <ChevronRight size={20} />
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/"}
                        className={`hover:bg-air-superiority-blue px-4 py-2 rounded-lg flex items-center gap-4`}>
                        <History />
                        History
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/"}
                        className={`hover:bg-air-superiority-blue px-4 py-2 rounded-lg flex items-center gap-4`}>
                        <ListVideo />
                        Playlists
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/"}
                        className={`hover:bg-air-superiority-blue px-4 py-2 rounded-lg flex items-center gap-4`}>
                        <SquarePlay />
                        Your Videos
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/"}
                        className={`hover:bg-air-superiority-blue px-4 py-2 rounded-lg flex items-center gap-4`}>
                        <ThumbsUp />
                        Liked Videos
                    </NavLink>
                </li>
            </ul>
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
            <Navbar toggleSidebar={toggleSidebar} isOpen={isOpen} />
            <Sidebar isOpen={isOpen} />
        </header>
    )
};

export default Header
