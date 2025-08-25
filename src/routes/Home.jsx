import { useEffect, useState } from "react";
import { Carousel, VideoCard } from "../components";

export default function Home() {
    const [videos, setVideos] = useState([]);
    const slides = videos.map(item => item.thumbnail);
    useEffect(() => {
        ; (async () => {
            const response = await fetch("/api/v1/videos", { method: "GET" });
            const result = await response.json();
            setVideos(result.data.docs);
        })();
    }, []);
    return (
        <>
            <Carousel slides={slides} />
            <main>
                <section className="p-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {videos.map((item, index) => (
                            <VideoCard key={index} video={item} />
                        ))}
                    </div>
                </section>
            </main>
        </>
    )
}

