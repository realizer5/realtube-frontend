import { Carousel, VideoCard } from "../components";
import useFetch from "../hooks/useFetch";

export default function Home() {
    const { loading, error, data } = useFetch("/api/v1/videos");
    if (error) return <div>{error.message}</div>
    if (loading) return <div>loading... </div>
    if (data) {
        const slides = data.docs.filter((_, index) => index < 4).map(item => item.thumbnail);
        return (
            <>
                <Carousel slides={slides} />
                <main>
                    <section className="p-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                            {data.docs.map((item, index) => (
                                <VideoCard key={index} video={item} />
                            ))}
                        </div>
                    </section>
                </main>
            </>
        )
    }
}
