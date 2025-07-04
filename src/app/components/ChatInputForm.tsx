import React from 'react';
import {ArrowUpIcon} from "@heroicons/react/16/solid";
import ChatPreferences from './ChatPreferences';
import Copyrights from './Copyrights';

type Props = {
    input: string;
    setInput: (val: string) => void;
    handleSubmit: (e: React.FormEvent) => Promise<void>;
    onLanguageChange: () => void;
    disclaimer: string;
    inputRef: React.RefObject<HTMLTextAreaElement | null>;
};

export default function ChatInputForm({
                                          input,
                                          setInput,
                                          handleSubmit,
                                          onLanguageChange,
                                          disclaimer,
                                          inputRef
                                      }: Props) {

    const autoResize = (textarea: HTMLTextAreaElement) => {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
    };

    return (
        <form
            className="w-full max-w-3xl mx-auto max-[380px]:pl-6 max-[380px]:pr-6 pl-4 pr-4 max-[380px]:pb-4 pb-4 sm:pb-6 max-[950px]:landscape:pb-3"
            onSubmit={handleSubmit}
        >
            <div className="flex w-full items-center relative">
        <textarea
            ref={inputRef}
            className="max-[950px]:landscape:h-12 w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white rounded-3xl p-2 pr-14 pt-6 max-[950px]:landscape:pt-2 max-[380px]:text-sm shadow placeholder-gray-600 dark:placeholder-gray-400 focus:outline-none dark:focus:border-gray-600 resize-none"
            value={input}
            placeholder="Type your message..."
            onChange={(e) => setInput(e.target.value)}
            onInput={(e) => autoResize(e.target as HTMLTextAreaElement)}
            onKeyDown={async (e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    await handleSubmit(e);
                }
            }}
        />
                <button type="submit"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white text-white rounded-full p-3 max-[950px]:landscape:p-2 shadow focus:outline-none">
                    <ArrowUpIcon className={`h-6 w-6 max-[950px]:landscape:h-4 max-[950px]:landscape:w-4 ${
                        input.length > 0 ? "text-black dark:text-gray-700" : "text-gray-400"
                    }`}
                    />
                </button>
            </div>
            <ChatPreferences onLanguageChange={onLanguageChange} disclaimer={disclaimer}/>
            <Copyrights/>
        </form>
    );
}

