'use client' // Error components must be Client Components

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Error({
                                  error,
                                  reset,
                              }: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    const router = useRouter();

    const handleClick = () => {
        router.push('/');
    };

    return (
        <div className="grid h-screen px-4 bg-white place-content-center w-full">
            <div className="text-center">
                <h2 className="text-gray-200 text-9xl">Oops</h2>
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                     😓 Something went wrong...
                </h2>
                <button
                    type="button"
                    className="inline-block px-5 py-3 mt-6 text-sm font-medium text-white bg-red-200 rounded hover:bg-red-400 focus:outline-none focus:ring"
                    onClick={handleClick}
                >Back</button>
            </div>
        </div>
    )
}
