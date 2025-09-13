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
            try {
                setLoading(true);
                const response = await fetch(url, { ...options, signal: abortControllerRef.current?.signal })
                if (!response.ok) throw new Error(`Failed to fetch data: ${response.statusText}`);
                const data = await response.json();
                setData(data.data);
            } catch (error) {
                setError(error);
            }
            setLoading(false);
        })();
    }, [url]);

    return { loading, error, data };
}

export default useFetch;
