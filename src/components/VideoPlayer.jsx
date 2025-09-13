import { Captions, ChevronRight, CircleGauge, Maximize, Minimize, Pause, Play, RotateCcw, Settings, Settings2, Volume2, VolumeOff } from "lucide-react";
import { useEffect, useRef, useState } from "react"

export default function VideoPlayer({ videoLink }) {
    const videoRef = useRef(null);
    const progressRef = useRef(null);
    const containerRef = useRef(null);
    const volumeDivRef = useRef(null);

    const [mute, setMute] = useState(false);
    const [play, setPlay] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [bufferPercent, setBufferPercent] = useState(0);
    const [fullScreen, setFullScreen] = useState(false);
    const [volume, setVolume] = useState(1);
    const [ended, setEnded] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [playbackRate, setPlaybackRate] = useState(1);

    const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

    useEffect(() => {
        const video = videoRef.current;
        const container = containerRef.current;
        const volumeDiv = volumeDivRef.current;

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
            volumeDiv.addEventListener("wheel", handleWheel, { passive: false });
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
            case ">":
                changePlaybackRate(+0.25);
                break;
            case "<":
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
    const handleVolumeChange = (newVolume) => {
        const clamped = Math.max(0, Math.min(1, parseFloat(newVolume).toFixed(2)));
        setVolume(clamped);
        videoRef.current.volume = clamped;
        setMute(clamped === 0);
    };
    const skip = (seconds) => {
        const video = videoRef.current;
        video.currentTime = Math.max(0, Math.min(duration, video.currentTime + seconds));
    };
    const changePlaybackRate = (rate) => {
        console.log(rate, typeof rate);
        const video = videoRef.current;
        const currentRate = video.playbackRate;
        const limit = currentRate + rate <= 2 && currentRate + rate >= 0.25;
        if (limit) {
            video.playbackRate = currentRate + rate;
            setPlaybackRate(video.playbackRate);
        }
    };
    const handleWheel = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const delta = e.deltaY > 0 ? -0.05 : 0.05;
        let newVolume = videoRef.current.volume + delta;
        handleVolumeChange(newVolume);
    };

    return (
        <div ref={containerRef} className="relative bg-black max-w-6xl mx-auto"
            onKeyDown={videoKeyboardControls} >
            <video autoPlay ref={videoRef} onClick={togglePlay} onDoubleClick={toggleFullscreen} className="w-full"
                src={videoLink} tabIndex={-1}>
                Your browser does not support the video tag.
            </video>
            <div className="px-4 absolute bottom-0 inset-x-0">
                <div className="group nise pt-2 cursor-pointer" ref={progressRef} onClick={handleProgressClick}>
                    <div className="relative flex w-full bg-papaya-whip/50  h-1 group-hover:h-1.5 duration-200">
                        <div className="flex items-center relative z-10 bg-fire-brick h-full"
                            style={{ width: `${progressPercent}%` }}>
                            <div className="absolute size-4 rounded-full bg-fire-brick -right-0.5"></div>
                        </div>
                        <div className="absolute inset-0  w-full overflow-hidden">
                            <div className="absolute h-full bg-papaya-whip/50"
                                style={{ width: `${bufferPercent}%`, left: `${progressPercent}%` }}></div>
                        </div>
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
                    <div className="group flex items-center space-x-1" ref={volumeDivRef}>
                        <button className="cursor-pointer" onClick={toggleMute}>
                            {mute ? <VolumeOff /> : <Volume2 />}
                        </button>
                        <input type="range" min={0} max={1} step={0.01} value={mute ? 0 : volume}
                            onChange={(e) => handleVolumeChange(e.target.value)} className="w-0 h-1 rounded-lg appearance-none
                            volume-slider group-hover:w-15 group-hover:opacity-100 opacity-0 duration-200"
                            style={{
                                background: `linear-gradient(to right, hsla(40, 91%, 91%, 1) 0%, hsla(40, 91%, 91%, 1)
                                ${(mute ? 0 : volume) * 100}%, hsla(40, 91%, 91%, 0.2) ${(mute ? 0 : volume) * 100}%,
                                hsla(40, 91%, 91%, 0.2) 100%`}} />
                    </div>
                    <span className="text-sm">
                        {formatTime(currentTime) + " / " + formatTime(duration)}
                    </span>
                    <div className="flex ml-auto space-x-4">
                        <button className={`cursor-pointer ${showSettings ? "rotate-30" : ""} duration-200`}
                            onClick={() => setShowSettings(!showSettings)}>
                            <Settings />
                        </button>
                        <button className="cursor-pointer" onClick={toggleFullscreen}>
                            {fullScreen ? <Minimize /> : <Maximize />}
                        </button>
                    </div>
                </div>
            </div>
            {
                showSettings &&
                <ul className="py-2 absolute right-2 bottom-13 bg-black/90 text-papaya-whip rounded-md text-nowrap">
                    <li className="flex items-center gap-2 hover:bg-gray-600 cursor-pointer py-2 px-4 duration-200">
                        <CircleGauge /> Playback Speed <span>{playbackRate === 1 ? "normal" : playbackRate}</span>
                        <ChevronRight />
                    </li>
                    <li className="flex itmes-center gap-2 hover:bg-gray-600 cursor-pointer py-2 px-4 duration-200">
                        <Captions /> Subtitles/CC <span>none</span>
                        <ChevronRight />
                    </li>
                    <li className="flex items-center gap-2 hover:bg-gray-600 cursor-pointer py-2 px-4 duration-200">
                        <Settings2 /> Quality <span>1080</span>
                        <ChevronRight />
                    </li>
                </ul>
            }
        </div >
    )
}

