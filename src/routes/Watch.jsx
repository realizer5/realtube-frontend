import { data, useLoaderData, } from "react-router"
import { Button, VideoPlayer } from "../components";

export default function Watch() {
    const video = useLoaderData();
    console.log(video);
    const { videoFile, title, owner } = video.data;
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

export const loadVideo = async ({ request, params }) => {
    const res = await fetch(`/api/v1/videos/${params.videoId}`,
        { method: "GET", signal: request.signal });
    if (!res.ok) throw data("Record Not Found", { status: res.status, statusText: res.statusText });
    return await res.json();
}
