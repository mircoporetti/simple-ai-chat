import {useState} from "react";
import {Message} from "../../types/message";
import {useTranslations} from "next-intl";

export function useChat() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const t = useTranslations('Chat');


    function setErrorWithTimeout(message: string) {
        setError(message);
        setTimeout(() => {
            setError('');
        }, 10000);
        setMessages([]);
    }

    const fetchChatResponse = async (question: string) => {
        const userMessage = { role: "You", content: question };
        const chatHistory = [...messages, userMessage];

        setMessages(chatHistory);
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`/api/chat`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ question }),
            });

            if (response.status === 404) {
                const err = (await response.json())["detail"];
                setErrorWithTimeout(err);
                setIsLoading(false);
                return;
            }

            if (response.status === 429) {
                setErrorWithTimeout(t("too-many-requests-error"));
                setIsLoading(false);
                return;
            }

            if (!response.ok || !response.body) {
                setErrorWithTimeout(t("generic-error"));
                setIsLoading(false);
                return;
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            let done = false;
            let botMessageContent = "";

            const botMessage = { role: "AI", content: "" };
            let firstChunkReceived = false;

            setMessages([...chatHistory, botMessage]);

            while (!done) {
                const { value, done: doneReading } = await reader.read();
                done = doneReading;
                if (value) {
                    const chunk = decoder.decode(value, { stream: true });
                    botMessageContent += chunk;

                    if (!firstChunkReceived) {
                        setIsLoading(false);
                        firstChunkReceived = true;
                    }

                    setMessages((prevMessages) => {
                        return [...prevMessages.slice(0, -1), { role: "AI", content: botMessageContent }];
                    });
                }
            }
        } catch (error) {
            setErrorWithTimeout((error as Error).message);
        } finally {
            setIsLoading(false);
        }
    };

    return {messages, isLoading, error, setError, fetchChatResponse};
}
