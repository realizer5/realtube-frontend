import { Clock8 } from "lucide-react";
import { Link } from "react-router";

export default function VideoCard({ }) {
    return (
        <div className="relative rounded-xl p-2 cursor-pointer hover:bg-air-superiority-blue duration-200">
            <Link to="/abcd" className="absolute inset-0"></Link>
            <img src={`https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpaperaccess.com%2Ffull%2F5733895.jpg&f=1&nofb=1&ipt=8ceccbdfa80457c64ca9dd22673485e8a260ed0a5ac2648f4dacaaf1f55f6f03`}
                alt="thumbnail" className="rounded-lg" />
            <div className="flex gap-2 mt-2">
                <Link to="/hera" className="relative z-10">
                    <img src={`https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.hdqwalls.com%2Fwallpapers%2Frick-and-morty-smith-adventures-4k-di.jpg&f=1&nofb=1&ipt=dc6a9961e9dd2ee09007aa2bb9ba6e1663ee528aed6ffb8eab5b673fee75d3d7`}
                        alt="channel logo" className="rounded-full size-8" />
                </Link>
                <div>
                    <h2 className="font-semibold">Realizer and rick and morty</h2>
                    <Link to="/nise" className="text-sm relative z-10">realizer</Link>
                    <div className="text-sm flex items-center gap-4">
                        <span className="">330K views</span>
                        <span className="inline-flex items-center">
                            <Clock8 className="inline w-[1em] h-[1em] mr-2" />
                            3 months ago
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
