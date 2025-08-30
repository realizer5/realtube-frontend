export default function VideoPlayer({ videoLink }) {
    return (
        <video controls className="max-h-200" >
            <source src={videoLink} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    )
}

