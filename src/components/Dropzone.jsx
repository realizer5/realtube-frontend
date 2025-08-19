import { Button } from "../components";
import { useEffect, useRef, useState } from "react";

const UploadForm = ({ video }) => {
    const [thumbnail, setThumbnail] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("video", video);
        formData.append("thumbnail", thumbnail);
        console.log(formData);
    }
    return (
        <>
            <form className="grid mt-10 mx-10 gap-10 place-items-center" onSubmit={handleSubmit}>
                <input type="text" name="" value={title} placeholder="title (required)"
                    className="w-full border rounded text-sm py-1 px-2"
                    onChange={(e) => setTitle(e.target.value)} />
                <textarea rows="" cols="" value={description} placeholder="description"
                    className="w-full border rounded text-sm py-1 px-2"
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <div className="w-full space-x-4">
                    <label htmlFor="thumbnail" className="cursor-pointer text-sm">Select Thumbnail</label>
                    <input id="thumbnail" type="file" name="" accept=".png,.jpg,.jpeg,.webp,.heic"
                        className="border rounded text-sm py-1 px-2 cursor-pointer"
                        onChange={(e) => setThumbnail(e.target.files[0])} />
                </div>
                <Button type="submit">upload</Button>
            </form>
        </>
    )
};

const Dropzone = () => {
    const [video, setVideo] = useState(null);
    const [isDraging, setIsDraging] = useState(false);
    const [status, setStatus] = useState("idle");
    const dragCounter = useRef(0);
    const inputRef = useRef(null);

    useEffect(() => {
        if (video && status !== "droped") {
            setIsDraging(true);
            const timer = setTimeout(() => setIsDraging(false), 300);
            return () => clearTimeout(timer); // clean-up
        }
    }, [video]);

    const handleDragOver = (e) => { e.preventDefault(); };
    const handleDragEnter = (e) => {
        e.preventDefault();
        dragCounter.current += 1;
        setIsDraging(true)
    };
    const handleDragLeave = (e) => {
        e.preventDefault();
        dragCounter.current -= 1;
        if (dragCounter.current === 0) {
            setIsDraging(false)
        };
    }
    const handleDrop = (e) => {
        e.preventDefault();
        dragCounter.current = 0;
        setIsDraging(false);
        const file = e.dataTransfer.files[0];
        if (file.type.startsWith("video/")) {
            setVideo(file);
            setStatus("droped");
        } else {
            setStatus("invalid");
            console.log("invalid file");
        }
    };

    const handleClick = () => { inputRef.current.click(); };
    const handleFileChange = (e) => {
        if (e.target.files) setVideo(e.target.files[0])
    }

    if (status === "uploaded") return <UploadForm video={video} />

    return (
        <>
            <div className="h-full grid place-items-center space-y-2 p-2" onDrop={handleDrop}
                onDragOver={handleDragOver} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave}>
                <div className="grid place-items-center space-y-2">
                    <div className="size-30 rounded-full bg-gray-900 text-white p-8 inline-flex items-end justify-center
                    cursor-pointer relative overflow-hidden" onClick={handleClick}>
                        <div className="grid place-items-center relative z-10">
                            <div className={`grid place-items-center duration-200
                                    ${isDraging ? "translate-y-2" : !isDraging && video ? "animate-takeoff" : ""}`}
                                onAnimationEnd={() => setStatus("uploaded")}>
                                <div className={`w-0 h-0 border-l-20 border-l-transparent border-r-20
                                    border-r-transparent border-b-20 border-b-gray-400 duration-200
                                    ${isDraging ? "translate-y-2" : ""}`}></div>
                                <div className={`bg-gray-400 duration-200 w-4 h-4
                                    ${isDraging ? "scale-x-150 scale-y-80" : ""}`} ></div>
                            </div>
                            <div className={`bg-gray-400 w-10 h-2 mt-2 ${video ? "opacity-0" : "opacity-100"} duration-500`}></div>
                        </div>
                        <div className={`w-30 h-150 absolute bg-[url(/src/assets/speed_line_darkmode.svg)]
                         -translate-y-30 ${video ? "animate-speedline" : ""}`}></div>
                    </div>
                    <p>Drag and drop video files to upload</p>
                    <Button onClick={handleClick}>Select Video</Button>
                </div>
            </div >
            <input type="file" name="" accept=".mp4,.mkv,.webm" className="hidden" ref={inputRef}
                onChange={handleFileChange} />
        </>
    )
};

export default Dropzone
