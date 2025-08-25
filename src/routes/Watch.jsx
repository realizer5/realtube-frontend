import { useEffect, useState } from "react";
import { useParams } from "react-router"

export default function Watch() {
    const [video, setVideo] = useState([]);
    const { videoId } = useParams();
    useEffect(() => {
        ; (async () => {
            const response = await fetch(`/api/v1/videos/${videoId}`, { method: "GET" });
            if (!response.ok) {
                return console.log(response);
            }
            const result = await response.json();
            console.log(result.data.videoFile);
            setVideo(result.data);
        })();
    }, []);

    if (!video || !video.videoFile) {
        return <p>Loading video...</p>;
    }

    return (
        <div>
            <video controls className="max-h-200">
                <source src={video.videoFile} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    )
}

