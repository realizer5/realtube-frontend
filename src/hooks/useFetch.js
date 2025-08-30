import { useState, useEffect } from 'react';

const useFetch = (url, options = { method: "GET" }) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!url) return;

        const controller = new AbortController();
        const signal = controller.signal;

        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(url, { ...options, signal });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }

                const json = await response.json();
                setData(json);
                setLoading(false);
            } catch (err) {
                if (err.name !== 'AbortError') {
                    setError(err.message || 'Something went wrong');
                }
            }
        };

        fetchData();

        return () => controller.abort();
    }, [url]);

    return { data, error, loading };
}

export default useFetch;
