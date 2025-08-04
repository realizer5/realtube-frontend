import { useEffect, useRef, useState } from "react"

export default function Carousel({ slides = [] }) {
    const [slide, setSlide] = useState(0);
    const intervalRef = useRef(null);
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
                <div className="flex h-full transition-transform duration-300" style={{
                    transform: `translateX(-${(slide / slideLength) * 100}%)`,
                }}>
                    {slides.map(item => (
                        <div className="w-screen" key={item}>
                            <img src={item} alt="" className="object-center object-cover" />
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
        </div >
    )
}
