import Carousel from "../components/Carousel";
import Navbar from "../components/Navbar";

export default function Home() {
    return (
        <>
            <Navbar />
            <Carousel />
            <div className="h-100 bg-gray-100">
                <span>Video grid</span>
            </div>
            <div className="bg-gray-500">
                <span>footer</span>
            </div>
        </>
    )
}

