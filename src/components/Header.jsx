import {
    Bell,
    ChevronRight, GalleryVerticalEnd, History, Home, ListVideo, Menu, MonitorPlay, Search,
    SquarePlay, ThumbsUp, X
} from "lucide-react";
import { Button } from "./";
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import useAuthStore from "../store/store";

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

const UserComponent = () => {
    const avatar = useAuthStore(state => state.user.avatar);
    return (
        <button className="size-10 rounded-full cursor-pointer">
            <img src={avatar} alt="avatar" className="rounded-full" />
        </button>
    )
}


const Navbar = ({ toggleSidebar, isOpen }) => {
    const isAuthenticated = useAuthStore(state => state.isAuthenticated);
    const bellRef = useRef(null);
    const borderRipple = () => {
        bellRef.current.classList.replace("border-transparent", "border-air-superiority-blue")
        setTimeout(() => {
            bellRef.current.classList.replace("border-air-superiority-blue", "border-transparent")
        }, 150);
    }
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
            <div className="space-x-4 flex items-center">
                {isAuthenticated ?
                    <>
                        <Link to="/upload">
                            <Button>Create</Button>
                        </Link>
                        <button className="cursor-pointer hover:bg-air-superiority-blue/50 border border-transparent
                            active:bg-air-superiority-blue duration-200 p-2 rounded-full"
                            onMouseUp={borderRipple} ref={bellRef}>
                            <Bell /></button>
                        <UserComponent />
                    </> :
                    <Link to="/login">
                        <Button>Log In</Button>
                    </Link>}
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
    const location = useLocation();
    useEffect(() => { setIsOpen(false) }, [location]);
    return (
        <>
            <header className="sticky z-30 top-0">
                <Navbar toggleSidebar={toggleSidebar} isOpen={isOpen} />
                <Sidebar isOpen={isOpen} />
            </header>
            {isOpen &&
                <div className="absolute inset-0 bg-black/50 z-10" onClick={toggleSidebar}></div>
            }
        </>
    )
};

export default Header
