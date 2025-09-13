import { useLoaderData } from "react-router";
import { ChannelCard } from "../components";

export default function Subscription() {
    const subscriptions = useLoaderData();
    console.log(subscriptions.data[0])
    return (
        <div>{subscriptions.data.map(item => <ChannelCard key={item._id} channel={item.channel} />)}</div>
    )
}

export const loadSubscriptions = async ({ request }) => {
    const res = await fetch(`/api/v1/subscriptions/`,
        { method: "GET", credentials: "include", signal: request.signal });
    if (!res.ok) throw data("Record Not Found", { status: res.status, statusText: res.statusText });
    return await res.json();
}
