import { X } from "lucide-react";
import { Dropzone } from "../components";

const Upload = () => {
    return (
        <div className="px-1 absolute inset-0 z-30 grid place-items-center bg-black/20">
            <div className="w-full max-w-5xl rounded-xl shadow mx-auto h-[90vh] bg-white">
                <div className="flex justify-between py-2 px-4 border-b">
                    <h1 className="text-xl font-semibold">Upload Video</h1>
                    <X />
                </div>
                <Dropzone />
            </div>
        </div>
    )
}

export default Upload
