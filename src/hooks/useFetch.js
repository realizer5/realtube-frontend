import { useState, useEffect, useRef } from 'react';

const useFetch = (url, options = { method: "GET" }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const abortControllerRef = useRef(null);

    useEffect(() => {
        (async () => {
            abortControllerRef.current?.abort();
            abortControllerRef.current = new AbortController();
            setLoading(true);
            try {
                const response = await fetch(url, { ...options, signal: abortControllerRef.current?.signal })
                if (!response.ok) throw new Error(`Failed to fetch data: ${response.statusText}`);
                const result = await response.json();
                setData(result.data);
            } catch (err) {
                if (err.name !== "AbortError") {
                    setError(err);
                }
            } finally {
                setLoading(false);
            }
        })();
    }, [url]);

    return { loading, error, data };
}

export default useFetch;
