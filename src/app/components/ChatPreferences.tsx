import React from 'react';
import LanguageSwitcher from "./LanguageSwitcher";
import DarkModeToggle from "./DarkModeToggle";

type Props = {
    onLanguageChange: () => void;
    disclaimer: string;
};

const ChatPreferences: React.FC<Props> = ({ onLanguageChange, disclaimer }:Props) => {

    return (
        <>
            <div
                className="flex w-full items-center justify-between text-center text-black dark:text-white max-[950px]:landscape:pt-3 pt-5">
                <div><LanguageSwitcher onLanguageChange={onLanguageChange}/></div>
                <div className="flex-grow text-center">
                    <p className="text-xs mx-auto pr-3">{disclaimer}</p>
                </div>
                <div className="ml-4"><DarkModeToggle/></div>
            </div>
        </>
    );
};

export default ChatPreferences;
