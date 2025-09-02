import { Pause, Play, Volume2, VolumeOff } from "lucide-react";
import { useEffect, useRef, useState } from "react"

export default function VideoPlayer({ videoLink }) {
    const videoRef = useRef(null);
    const progressRef = useRef(null);
    const containerRef = useRef(null);

    const [mute, setMute] = useState(false);
    const [play, setPlay] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [bufferPercent, setBufferPercent] = useState(0);

    const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

    useEffect(() => {
        const video = videoRef.current;
        const updateTime = () => {
            setCurrentTime(video.currentTime);
            requestAnimationFrame(updateTime);
        }
        const updateDuration = () => setDuration(video.duration);
        const updateBuffer = () => {
            if (video.buffered.length > 0 && video.duration > 0) {
                const bufferedEnd = video.buffered.end(video.buffered.length - 1);
                const percent = (bufferedEnd / video.duration) * 100;
                setBufferPercent(percent);
            }
        };

        if (video) {
            video.addEventListener('timeupdate', updateTime);
            video.addEventListener('loadedmetadata', updateDuration);
            video.addEventListener('durationchange', updateDuration);
            video.addEventListener('progress', updateBuffer);
            video.addEventListener('loadstart', updateBuffer);
        }

        return () => {
            if (video) {
                video.removeEventListener('timeupdate', updateTime);
                video.removeEventListener('loadedmetadata', updateDuration);
                video.removeEventListener('durationchange', updateDuration);
                video.removeEventListener('progress', updateBuffer);
                video.removeEventListener('loadstart', updateBuffer);
            }
        };
    }, []);

    const togglePlay = () => {
        const video = videoRef.current;
        if (video.paused) {
            video.play();
            setPlay(true);
        } else {
            video.pause();
            setPlay(false);
        }
    }
    const toggleMute = () => {
        const video = videoRef.current;
        if (mute) {
            video.volume = 1;
            setMute(false);
        } else {
            video.volume = 0;
            setMute(true);
        }
    };
    const toggleFullscreen = () => {
        const container = containerRef.current;
        if (!document.fullscreenElement) {
            container.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    };
    const videoKeyboardControls = (e) => {
        switch (e.key) {
            case " ":
            case "k":
                togglePlay();
                break;
            case "f":
                toggleFullscreen();
                break;
            case "m":
                toggleMute();
                break;
        }
    }
    const formatTime = (time) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = Math.floor(time % 60);

        if (hours > 0) {
            return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div ref={containerRef}
            className="relative bg-black max-w-6xl mx-auto" onKeyDown={videoKeyboardControls}>
            <video ref={videoRef} onClick={togglePlay} onDoubleClick={toggleFullscreen} className="w-full max-h-screen">
                <source src={videoLink} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="px-2 absolute bottom-0 inset-x-0">
                <div className="flex w-full h-1 bg-papaya-whip/50 cursor-pointer group ">
                    <div className="flex items-center relative bg-fire-brick h-full" style={{ width: `${progressPercent}%` }}>
                        <div className="absolute size-3 rounded-full bg-fire-brick -right-1 "></div>
                    </div>
                    <div className="h-full bg-papaya-whip/60" style={{ width: `${bufferPercent}%` }}></div>
                </div>
                <div className="flex items-center text-white my-2 space-x-4">
                    <button className="cursor-pointer" onClick={togglePlay}>
                        {play ? <Pause /> : <Play />}
                    </button>
                    <button className="cursor-pointer" onClick={toggleMute}>
                        {mute ? <VolumeOff /> : <Volume2 />}
                    </button>
                    <div className="text-sm">
                        {formatTime(currentTime) + " / " + formatTime(duration)}
                    </div>
                </div>
            </div>
        </div>
    )
}

