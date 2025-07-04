import React from 'react';
import {useTranslations} from "next-intl";

interface ErrorProps {
    error: string;
    setError: (error: string | null) => void;
}

const ErrorAlert: React.FC<ErrorProps> = ({error, setError}) => {

    return (
        <>
            <div
                className="error-screen mx-auto max-w-3xl w-full bg-red-600 p-4 rounded-lg flex items-center justify-between shadow-lg">
                <span className="flex-1">{error}</span>
                <button onClick={() => setError(null)}
                        className="text-white font-bold px-2 py-1 bg-transparent rounded-full hover:bg-red-700 transition">
                    X
                </button>
            </div>
        </>
    );
};

export default ErrorAlert;
