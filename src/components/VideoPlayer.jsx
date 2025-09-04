import { Maximize, Minimize, Pause, Play, RotateCcw, Volume2, VolumeOff } from "lucide-react";
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
    const [fullScreen, setFullScreen] = useState(false);
    const [volume, setVolume] = useState(1);
    const [ended, setEnded] = useState(false);

    const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

    useEffect(() => {
        const video = videoRef.current;
        const container = containerRef.current;

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
        const handleEnd = () => {
            setPlay(false);
            setEnded(true);
        }
        const handlePlay = () => setPlay(true);
        const handleFullscreenChange = () => {
            setFullScreen(!!document.fullscreenElement);
        };


        if (video) {
            video.addEventListener('timeupdate', updateTime);
            video.addEventListener('loadedmetadata', updateDuration);
            video.addEventListener('durationchange', updateDuration);
            video.addEventListener('progress', updateBuffer);
            video.addEventListener('loadstart', updateBuffer);
            video.addEventListener("ended", handleEnd);
            video.addEventListener("play", handlePlay);
            container.addEventListener("fullscreenchange", handleFullscreenChange);
        }

        return () => {
            if (video) {
                video.removeEventListener('timeupdate', updateTime);
                video.removeEventListener('loadedmetadata', updateDuration);
                video.removeEventListener('durationchange', updateDuration);
                video.removeEventListener('progress', updateBuffer);
                video.removeEventListener('loadstart', updateBuffer);
                video.addEventListener("ended", handleEnd);
                video.removeEventListener("play", handlePlay);
                container.removeEventListener("fullscreenchange", handleFullscreenChange);
            }
        };
    }, []);

    const togglePlay = () => {
        const video = videoRef.current;
        if (video.paused) {
            video.play();
            setPlay(true);
            setEnded(false);
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
            setFullScreen(true);
        } else {
            document.exitFullscreen();
            setFullScreen(false);
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
            case "ArrowRight":
            case "l":
                skip(10);
                break;
            case "ArrowLeft":
            case "j":
                skip(-10);
                break;
            case "<":
                changePlaybackRate(+0.25);
                break;
            case ">":
                changePlaybackRate(-0.25);
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
    const handleProgressClick = (e) => {
        const rect = progressRef.current.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        const newTime = percent * duration;
        videoRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    };
    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        videoRef.current.volume = newVolume;
        setMute(newVolume === 0);
    };
    const skip = (seconds) => {
        const video = videoRef.current;
        video.currentTime = Math.max(0, Math.min(duration, video.currentTime + seconds));
    };
    const changePlaybackRate = (rate) => {
        const video = videoRef.current;
        const currentRate = video.playbackRate;
        const limit = currentRate + rate <= 2 && currentRate + rate >= 0.25;
        if (limit) {
            video.playbackRate = currentRate + rate;
        }
    };

    return (
        <div ref={containerRef} className="relative bg-black max-w-6xl mx-auto"
            onKeyDown={videoKeyboardControls} >
            <video autoPlay ref={videoRef} onClick={togglePlay} onDoubleClick={toggleFullscreen} className="w-full"
                src={videoLink} tabIndex={-1}>
                Your browser does not support the video tag.
            </video>
            <div className="px-4 absolute bottom-0 inset-x-0">
                <div className="relative flex w-full bg-papaya-whip/50 cursor-pointer h-1 hover:h-1.5 duration-200"
                    ref={progressRef} onClick={handleProgressClick}>
                    <div className="flex items-center relative z-10 bg-fire-brick h-full"
                        style={{ width: `${progressPercent}%` }}>
                        <div className="absolute size-4 rounded-full bg-fire-brick -right-0.5"></div>
                    </div>
                    <div className="absolute inset-0  w-full overflow-hidden">
                        <div className="absolute h-full bg-papaya-whip/50"
                            style={{ width: `${bufferPercent}%`, left: `${progressPercent}%` }}></div>
                    </div>
                </div>
                <div className="flex items-center text-white my-2 space-x-4">
                    <button className="cursor-pointer" onClick={togglePlay}>
                        {ended ? (
                            <RotateCcw />
                        ) : play ? (
                            <Pause />
                        ) : (
                            <Play />
                        )}
                    </button>
                    <div className="flex items-center space-x-1">
                        <button className="cursor-pointer" onClick={toggleMute}>
                            {mute ? <VolumeOff /> : <Volume2 />}
                        </button>
                        <input type="range" min={0} max={1} step={0.01} value={mute ? 0 : volume}
                            onChange={handleVolumeChange} className="w-20 h-1 rounded-lg bg-black" />
                    </div>
                    <span className="text-sm">
                        {formatTime(currentTime) + " / " + formatTime(duration)}
                    </span>
                    <div className="ml-auto">
                        <button className="cursor-pointer" onClick={toggleFullscreen}>
                            {fullScreen ? <Minimize /> : <Maximize />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

