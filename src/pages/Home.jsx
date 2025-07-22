import Navbar from "../components/Navbar";

export default function Home() {
    return (
        <>
            <Navbar />
            <div className="h-120 bg-gray-200">
                <span>Carousel</span>
            </div>
            <div className="h-100 bg-gray-100">
                <span>Video grid</span>
            </div>
            <div className="bg-gray-500">
                <span>footer</span>
            </div>
        </>
    )
}

