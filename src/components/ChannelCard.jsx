import { Button } from ".";

export default function ChannelCard({ channel = [] }) {
    return (
        <div className="py-2 px-4 h-30 flex justify-between">
            <div className="flex gap-4">
                <img src={channel.avatar} alt="channel logo" className="rounded-full h-full
                aspect-square object-cover" />
                <div className="pt-2">
                    <h1 className="text-2xl">{channel.fullName}</h1>
                    <span>@{channel.username}</span>
                </div>
            </div>
            <div className="flex items-center">
                <Button variant="outline">
                    Subscribed
                </Button>
            </div>
        </div>
    )
}

