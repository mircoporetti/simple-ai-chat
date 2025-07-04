'use client';

import React, {useEffect, useRef, useState} from 'react';
import Intro from "../../components/Intro";
import MessagesSection from "../../components/Messaging";
import {useTranslations} from 'next-intl';
import {useChat} from "./useChat";
import ErrorAlert from "../../components/ErrorAlert";
import ChatInputForm from "../../components/ChatInputForm";

export default function Chat() {

    const t = useTranslations('Chat');

    const {messages, isLoading, error, setError, fetchChatResponse} = useChat();
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current?.focus();
        }
        if (messages.length > 0) {
            scrollToBottom();
        }
    }, [messages]);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
        await fetchChatResponse(input);
        setInput("");
    };

    return (
        <div className="h-[100dvh] flex flex-col bg-white dark:bg-gray-700">
            {error && (
                <ErrorAlert error={error} setError={setError}/>
            )}
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300">
                <div
                    className="max-w-4xl mx-auto px-4 max-[380px]:py-4 py-6 space-y-4 pb-2 pl-5 pr-5 md:pl-28 md:pr-28">
                    <div className="max-[380px]:mb-4 mb-6 sm:mb-7 md:mb-10 xl:mb-14">
                        <Intro/>
                    </div>

                    <MessagesSection messages={messages} isLoading={isLoading}/>
                    <div ref={messagesEndRef}></div>
                </div>
            </div>
            <div className="bg-white dark:bg-gray-700">
                {!messages.length && (
                    <div className="text-center text-black dark:text-white max-[380px]:pb-2 pb-2 sm:pb-4">
                        <h2 className="font-bold max-[380px]:text-sm text-lg md:text-xl">{t('ask-away')}</h2>
                    </div>
                )}
                <ChatInputForm
                    input={input}
                    setInput={setInput}
                    handleSubmit={handleSubmit}
                    onLanguageChange={() => setInput('')}
                    disclaimer={t('disclaimer')}
                    inputRef={inputRef}
                />
            </div>
        </div>
    );
}
