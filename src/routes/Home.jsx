import { Carousel, VideoCard } from "../components";

const slides = [
    `https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpaperaccess.com%2Ffull%2F401170.jpg&f=1&nofb=1&ipt=ff2f0fff0073d42305ecd83521cca65317a9aaddde5505fd637e79c4b609e833`,
    `https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpaperaccess.com%2Ffull%2F5733895.jpg&f=1&nofb=1&ipt=8ceccbdfa80457c64ca9dd22673485e8a260ed0a5ac2648f4dacaaf1f55f6f03`,
    `https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.hdqwalls.com%2Fwallpapers%2Frick-and-morty-smith-adventures-4k-di.jpg&f=1&nofb=1&ipt=dc6a9961e9dd2ee09007aa2bb9ba6e1663ee528aed6ffb8eab5b673fee75d3d7`
];

export default function Home() {
    return (
        <>
            <Carousel slides={slides} />
            <main>
                <section className="p-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        <VideoCard />
                        <VideoCard />
                        <VideoCard />
                        <VideoCard />
                        <VideoCard />
                        <VideoCard />
                        <VideoCard />
                        <VideoCard />
                        <VideoCard />
                    </div>
                </section>
            </main>
        </>
    )
}

