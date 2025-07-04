import {useTranslations} from 'next-intl';
import React from "react";

const Intro = () => {
    const t = useTranslations('Chat');

    return (
        <>
            <div
                className="max-[950px]:landscape:hidden flex justify-center items-center max-[380px]:pt-0 max-[380px]:pb-0 pb-1 sm:p-1 dark:bg-gray-700">
                <div className="text-center text-black dark:text-white">
                    <h2 className="font-bold max-[380px]:text-xl text-2xl">
                        👋 {t('greetings')}
                    </h2>
                </div>
            </div>
        </>
    );
};

export default Intro;