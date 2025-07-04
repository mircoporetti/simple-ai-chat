import React from 'react';
import {useTranslations} from "next-intl";

const Copyrights: React.FC = () => {

    const t = useTranslations('Chat');

    return (
        <>
            <div className="flex-grow text-center">
                <p className="text-xs mx-auto pr-3 font-bold pt-2 text-black dark:text-white">
                    {t('copyrights')} |{' '}
                    <a
                        href="https://linkedin.com/in/mirco-poretti-197282b4"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                    >
                        LinkedIn
                    </a>
                </p>
            </div>
        </>
    );
};

export default Copyrights;
