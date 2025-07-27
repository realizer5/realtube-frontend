import { MonitorPlay, Search, X } from "lucide-react";
import { Button } from "./";

export default function Navbar() {
    return (
        <nav className="px-4 py-2 font-ubuntu flex justify-between sticky top-0 z-30 bg-white">
            <a href="" className="flex gap-1 text-barn-red items-center">
                <MonitorPlay />
                <h1 className="font-semibold text-normal">Realtube</h1>
            </a>
            <div className="flex items-center w-100">
                <div className="relative flex justify-end items-center w-full">
                    <input type="search" className="w-full rounded-s-2xl py-2 px-4 font-medium border
                    focus:outline-0 focus:border-air-superiority-blue transition-colors duration-100"
                        placeholder="Search" />
                    {<X className="absolute right-2 rounded-full cursor-pointer p-2 hover:bg-gray-200 h-10 w-10" />}
                </div>
                <button className="rounded-e-2xl py-2 px-4 border border-l-0 cursor-pointer"><Search /></button>
            </div>
            <Button>Log In</Button>
        </nav>
    )
}
