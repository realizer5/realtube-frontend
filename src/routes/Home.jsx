import { useEffect, useState } from "react";
import { Carousel, VideoCard } from "../components";
import useAuthStore from "../store/store";

export default function Home() {
    const [slides, setSlides] = useState([]);
    const [videos, setVideos] = useState([]);
    const isAuthorized = useAuthStore(state => state.isAuthorized);
    useEffect(() => {
        ; (async () => {
            const response = await fetch("/api/v1/videos", { method: "GET" });
            const result = await response.json();
            console.log(result.data.docs)
            setSlides([result.data.docs[0].thumbnail]);
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

