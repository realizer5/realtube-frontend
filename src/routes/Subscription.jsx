import useFetch from "../hooks/useFetch"

export default function Subscription() {
    const { data, error, loading } = useFetch("/api/v1/subscriptions");
    return (
        <div></div>
    )
}

