import { data, useLoaderData, useParams, } from "react-router"
import { Button, VideoPlayer } from "../components";
import { ThumbsUp } from "lucide-react";
import { useRef, useState } from "react";
import useAuthStore from "../store/store";
import useFetch from "../hooks/useFetch";

export default function Watch() {
    const video = useLoaderData();
    const { videoId } = useParams();
    const [comment, setComment] = useState("");
    const divRef = useRef(null);
    const { loading, data, error } = useFetch(`/api/v1/comments/${videoId}`);
    const handleSubmit = async () => {
        setComment("");
        if (divRef.current) divRef.current.innerText = '';
        if (comment.trim() === '') return;
        const sendComment = await fetch(`/api/v1/comments/${videoId}`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ content: comment }),
        });
        console.log(sendComment);
    }

    const handleInput = (e) => {
        const text = e.currentTarget.innerText;
        setComment(text.trim());
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };
    const { videoFile, title, owner, description } = video.data;
    const { avatar, username } = owner;
    const userAvatar = useAuthStore(state => state.user.avatar);

    return (
        <div>
            <VideoPlayer videoLink={videoFile} />
            <div className="py-2 px-4">
                <h1 className="mb-2 text-2xl font-bold">{title}</h1>
                <div className="flex items-center gap-2">
                    <img src={avatar} alt="" className="w-12 rounded-full" />
                    <h2 className="font-semibold text-lg">{username}</h2>
                    <Button>Subscribe</Button>
                    <div className="ml-auto">
                        <Button><ThumbsUp /></Button>
                    </div>
                </div>
                <div className="bg-papaya-whip rounded-md p-2 mt-2">
                    <p>{description}</p>
                </div>
                <div className="mt-2">
                    <div className="flex gap-2">
                        <img src={userAvatar} alt="" className="size-12 rounded-full object-cover" />
                        <div className="w-full">
                            <div ref={divRef} className='w-full text-sm whitespace-pre-wrap wrap-break-word
                            border-b outline-none p-1 max-h-[20vh] overflow-scroll scroll-pb-2'
                                role='textarea' aria-multiline="true" aria-invalid="false" spellCheck="true"
                                autoCorrect="off" contentEditable="true" suppressContentEditableWarning
                                onInput={handleInput} onKeyDown={handleKeyDown}
                            ></div>
                            <div className="text-right mt-2 space-x-2">
                                <Button>Cancel</Button>
                                <Button onClick={handleSubmit}>Comment</Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    {data && data.docs.map(item => <p className="whitespace-pre-wrap wrap-break-word">{item.content}</p>)}
                </div>
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
