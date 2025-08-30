import { useParams } from "react-router"
import { Button, VideoPlayer } from "../components";
import useFetch from "../hooks/useFetch";

export default function Watch() {
    const { videoId } = useParams();
    const { data, error, loading } = useFetch(`/api/v1/videos/${videoId}`);
    if (loading) return (
        <>
            loading...
        </>
    );
    const { videoFile, title, owner } = data.data;
    const { avatar, username } = owner;
    return (
        <div>
            <VideoPlayer videoLink={videoFile} />
            <div className="border">
                <h1>{title}</h1>
                <img src={avatar} alt="" className="w-12 rounded-full" />
                <h2>{username}</h2>
                <Button>Subscribe</Button>
            </div>
        </div>
    )
}

