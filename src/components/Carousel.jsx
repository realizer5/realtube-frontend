import { useEffect, useRef, useState } from "react"

export default function Carousel({ }) {
    const [slide, setSlide] = useState(0);
    const intervalRef = useRef(null);
    const slides = [
        `https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpaperaccess.com%2Ffull%2F401170.jpg&f=1&nofb=1&ipt=ff2f0fff0073d42305ecd83521cca65317a9aaddde5505fd637e79c4b609e833`,
        `https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpaperaccess.com%2Ffull%2F5733895.jpg&f=1&nofb=1&ipt=8ceccbdfa80457c64ca9dd22673485e8a260ed0a5ac2648f4dacaaf1f55f6f03`,
        `https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.hdqwalls.com%2Fwallpapers%2Frick-and-morty-smith-adventures-4k-di.jpg&f=1&nofb=1&ipt=dc6a9961e9dd2ee09007aa2bb9ba6e1663ee528aed6ffb8eab5b673fee75d3d7`
    ];
    const slideLength = slides.length;
    const changeSlide = (num) => {
        setSlide(num);
    };
    const startCarousel = () => {
        intervalRef.current = setInterval(() => {
            setSlide(prev => (prev === slideLength - 1 ? 0 : prev + 1));
        }, 3000)
    }
    useEffect(() => {
        startCarousel();
        return () => {
            clearInterval(intervalRef.current);
        }
    }, []);
    return (
        <div className="h-120 bg-gray-400 relative flex justify-center items-end overflow-hidden"
            onMouseEnter={() => clearInterval(intervalRef.current)} onMouseLeave={startCarousel}>
            <div className="size-full flex">
                <div className={`flex h-full ${`-translate-x-${slide}/${slideLength}`} transition-transform duration-300`}>
                    {slides.map(item => (
                        <div className="w-screen" key={item}>
                            <img src={item} alt="" />
                        </div>
                    ))}
                </div>
            </div>
            <div className="space-x-2 absolute mb-4">
                {slides.map((item, index) => (
                    <button key={item} type="butoon" onClick={() => changeSlide(index)}
                        className={`rounded-full border border-prussian-blue size-4 cursor-pointer
p-0.25 bg-clip-content ${slide === index && "bg-prussian-blue"}`}></button>
                ))}
            </div>
        </div>
    )
}
