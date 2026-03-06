"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Paperclip } from "lucide-react";
import { useTranslation } from "./TranslationProvider";
import { motion, AnimatePresence } from "framer-motion";

export default function QuickChat() {
    const { t, locale } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ id: number; text: string; sender: "user" | "bot" }[]>([]);
    const [inputText, setInputText] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = () => {
        if (!inputText.trim()) return;

        const newMsg = { id: Date.now(), text: inputText, sender: "user" as const };
        setMessages((prev) => [...prev, newMsg]);
        setInputText("");

        // Auto reply simulation
        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now(),
                    text: t("chat.autoReply" as any),
                    sender: "bot",
                },
            ]);
        }, 1000);
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const newMsg = { id: Date.now(), text: `[File Uploaded: ${file.name}]`, sender: "user" as const };
            setMessages((prev) => [...prev, newMsg]);

            setTimeout(() => {
                setMessages((prev) => [
                    ...prev,
                    {
                        id: Date.now(),
                        text: t("chat.autoReply" as any),
                        sender: "bot",
                    },
                ]);
            }, 1000);
        }
    };

    return (
        <div className="fixed bottom-6 end-6 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className={`absolute bottom-20 ${locale === "ar" ? "left-0" : "right-0"} w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col`}
                        style={{ height: "450px" }}
                    >
                        {/* Header */}
                        <div className="bg-stone-900 text-white p-4 flex justify-between items-center">
                            <h3 className="font-bold">{t("contact.quickChat" as any)}</h3>
                            <button onClick={() => setIsOpen(false)} className="text-stone-300 hover:text-white transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 p-4 overflow-y-auto bg-stone-50 flex flex-col gap-3">
                            {messages.length === 0 && (
                                <p className="text-center text-sm text-stone-500 my-auto p-4 rounded-xl border border-dashed border-stone-300">
                                    {t("chat.welcome" as any)}
                                </p>
                            )}
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`max-w-[85%] p-3 rounded-xl text-sm ${msg.sender === "user"
                                            ? "bg-stone-900 text-white self-end rounded-br-sm"
                                            : "bg-white border border-stone-200 text-stone-800 self-start rounded-bl-sm whitespace-pre-wrap shadow-sm"
                                        }`}
                                >
                                    {msg.text}
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-3 bg-white border-t border-stone-200">
                            <div className="flex items-center gap-2">
                                <label className="cursor-pointer text-stone-400 hover:text-stone-700 transition-colors p-2">
                                    <Paperclip size={20} />
                                    <input type="file" className="hidden" onChange={handleFileUpload} />
                                </label>
                                <input
                                    type="text"
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                    placeholder={t("chat.placeholder" as any)}
                                    className="flex-1 bg-stone-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!inputText.trim()}
                                    className="p-2 bg-stone-900 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-stone-800 transition-colors shrink-0"
                                >
                                    <Send size={16} className={locale === "ar" ? "-translate-x-0.5 rotate-180" : "translate-x-0.5"} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center justify-center w-14 h-14 text-white rounded-full shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300 group ${isOpen ? "rotate-90 bg-stone-700 shadow-inner" : "bg-stone-900"}`}
                title={t("contact.quickChat" as any)}
            >
                {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-7 h-7" />}
                {!isOpen && (
                    <span className={`absolute ${locale === 'ar' ? 'right-full mr-4' : 'left-full ml-4'} top-1/2 -translate-y-1/2 px-3 py-1 bg-stone-900 text-white text-xs font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none`}>
                        {t("contact.quickChat" as any)}
                    </span>
                )}
            </button>
        </div>
    );
}
