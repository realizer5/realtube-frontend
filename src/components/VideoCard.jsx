import { Clock8 } from "lucide-react";
import { Link } from "react-router";

const timeAgo = (dateString) => {
    const now = new Date();
    const past = new Date(dateString);
    const diffInSeconds = Math.floor((now - past) / 1000);

    const units = [
        { label: "year", seconds: 365 * 24 * 60 * 60 },
        { label: "month", seconds: 30 * 24 * 60 * 60 },
        { label: "day", seconds: 24 * 60 * 60 },
        { label: "hour", seconds: 60 * 60 },
        { label: "minute", seconds: 60 },
        { label: "second", seconds: 1 }
    ];

    for (const unit of units) {
        const amount = Math.floor(diffInSeconds / unit.seconds);
        if (amount >= 1) {
            return `${amount} ${unit.label}${amount > 1 ? "s" : ""} ago`;
        }
    }

    return "just now";
}

export default function VideoCard({ video }) {

    return (
        <div className="relative rounded-xl p-2 cursor-pointer hover:bg-air-superiority-blue duration-200">
            <Link to="/abcd" className="absolute inset-0"></Link>
            <img src={video.thumbnail}
                alt="thumbnail" className="rounded-lg w-full aspect-video object-cover" />
            <div className="flex gap-4 mt-2">
                <Link to="/hera" className="relative z-10 h-fit">
                    <img src={video.owner[0].avatar}
                        alt="channel logo" className="rounded-full w-10 aspect-square object-cover" />
                </Link>
                <div>
                    <h2 className="font-semibold">{video.title}</h2>
                    <Link to="/nise" className="text-sm relative z-10">{video.owner[0].username}</Link>
                    <div className="text-sm flex items-center gap-4">
                        <span className="">{video.views} views</span>
                        <span className="inline-flex items-center">
                            <Clock8 className="inline w-[1em] h-[1em] mr-2" />
                            {timeAgo(video.createdAt)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
