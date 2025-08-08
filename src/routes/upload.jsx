import { Upload, X } from "lucide-react";
import { Button } from "../components";

export default function upload() {
    return (
        <div className="rounded-xl border">
            <div className="flex justify-between py-2 px-4 border-b">
                <h1 className="text-xl font-semibold">Upload Video</h1>
                <X />
            </div>
            <div className="grid place-items-center space-y-2 p-2">
                <div className="rounded-full bg-gray-900 text-white p-4 inline-block">
                    <Upload size={96} />
                </div>
                <p>Drag and drop video files to upload</p>
                <Button>Select Video
                </Button>
            </div>
            <input type="file" name="" accept=".mp4,.mkv,.webm" className="" />
        </div>
    )
}

