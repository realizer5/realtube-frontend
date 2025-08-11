import { Button } from "../components";
import { useRef, useState } from "react";

const Dropzone = ({ onClick }) => {
    const [isDraging, setIsDraging] = useState(false);
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState("idle");
    const [uploadProgress, setUploadProgress] = useState(0);
    const dragCounter = useRef(0);
    const inputRef = useRef(null);

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
        setFile(e.dataTransfer.files[0]);
        setStatus("droped");
    };

    const handleClick = () => { inputRef.current.click(); };
    const handleFileChange = (e) => {
        if (e.target.files) setFile(e.target.files[0])
    }
    const handleFileUpload = async () => {
        if (!file) return;
        setStatus("uploading");
        const formData = new FormData();
        formData.append("file", file);
        try {
            await fetch();
        } catch (error) {

        }
    }

    return (
        <>
            <div className="h-full grid place-items-center space-y-2 p-2" onDrop={handleDrop}
                onDragOver={handleDragOver} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave}>
                <div className="grid place-items-center space-y-2">
                    <div className="size-30 rounded-full bg-gray-900 text-white p-8 inline-flex items-end justify-center
                    cursor-pointer relative overflow-hidden" onClick={handleClick}>
                        <div className="grid place-items-center relative z-10">
                            <div className={`${status === "droped" ? "animate-takeoff" : ""} grid place-items-center`}>
                                <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px]
                        border-r-transparent border-b-[20px] border-b-gray-400"></div>
                                <div className={`bg-gray-400 ${isDraging ? "w-5 h-2" : "w-3 h-5"} duration-200`} ></div>
                            </div>
                            <div className={`bg-gray-400 w-10 h-2 mt-1 ${status === "droped" ? "opacity-0" : "opacity-100"} duration-200`}></div>
                        </div>
                        <div className={`w-30 h-150 absolute bg-[url(/src/assets/speed_line_darkmode.svg)]
                         -translate-y-30 ${status === "droped" ? "animate-speedline" : ""}`}></div>
                    </div>
                    <p>Drag and drop video files to upload</p>
                    <Button onClick={handleClick}>Select Video</Button>
                </div>
            </div>
            <input type="file" name="" accept=".mp4,.mkv,.webm" className="hidden" ref={inputRef}
                onChange={handleFileChange} />
        </>
    )
};

export default Dropzone
