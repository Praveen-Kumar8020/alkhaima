"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "./TranslationProvider";
import { useEffect, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";
import Image from "next/image";

function Typewriter({ text, highlightText }: { text: string, highlightText?: string }) {
    const [displayedText, setDisplayedText] = useState("");
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        setDisplayedText("");
        setIsComplete(false);
        let i = 0;
        const interval = setInterval(() => {
            if (i < text.length) {
                setDisplayedText(text.slice(0, i + 1));
                i++;
            } else {
                clearInterval(interval);
                setIsComplete(true);
            }
        }, 100); // Slightly slower typing speed
        return () => clearInterval(interval);
    }, [text]);

    const renderText = () => {
        const gradientClass = "text-transparent bg-clip-text bg-gradient-to-r from-stone-200 via-stone-400 to-stone-500";

        if (!highlightText) return <span className={gradientClass}>{displayedText}</span>;

        const index = text.indexOf(highlightText);
        if (index === -1) return <span className={gradientClass}>{displayedText}</span>;

        const before = text.slice(0, index);
        const highlight = text.slice(index, index + highlightText.length);
        const after = text.slice(index + highlightText.length);

        const displayedBefore = displayedText.slice(0, before.length);
        const displayedHighlight = displayedText.slice(before.length, before.length + highlight.length);
        const displayedAfter = displayedText.slice(before.length + highlight.length);

        return (
            <>
                {displayedBefore && (
                    <span className={gradientClass}>
                        {displayedBefore}
                    </span>
                )}
                {displayedHighlight && (
                    <span className="text-white">
                        {displayedHighlight}
                    </span>
                )}
                {displayedAfter && (
                    <span className={gradientClass}>
                        {displayedAfter}
                    </span>
                )}
            </>
        );
    }

    return (
        <span className="inline-block relative">
            {renderText()}
            <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="inline-block w-[3px] h-[0.9em] bg-stone-300 ml-1 align-baseline rounded-full"
            />
        </span>
    );
}

export default function Hero() {
    const { t, locale } = useTranslation();
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    // 3D Parallax Effects
    const yText = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section
            ref={containerRef}
            id="home"
            className="relative h-screen flex items-center overflow-hidden bg-black"
        >
            {/* Split Backgrounds */}
            <div className={`absolute inset-0 flex flex-col lg:flex-row ${locale === 'ar' ? 'lg:flex-row-reverse' : ''}`}>
                <div className="w-full lg:w-[45%] xl:w-[50%] h-full bg-black z-10 transition-all duration-500"></div>
                <div className="w-full lg:w-[55%] xl:w-[50%] h-full relative z-0 transition-all duration-500 flex items-center justify-center lg:p-12 xl:p-24 overflow-hidden">
                    {/* The Image */}
                    <div 
                        className="absolute inset-0 lg:relative lg:w-[90%] lg:h-[80%] lg:rounded-3xl bg-cover bg-center transition-all duration-500 overflow-hidden"
                        style={{ backgroundImage: "url('/banner_home.gif')" }}
                    >
                        <div className="absolute inset-0 bg-black/40 lg:bg-black/20 z-10"></div>
                    </div>
                    {/* Fade effect between solid black and the image (desktop only) */}
                    <div className={`hidden lg:block absolute inset-y-0 ${locale === 'ar' ? 'right-0 bg-gradient-to-l' : 'left-0 bg-gradient-to-r'} w-48 from-black to-transparent z-10 transition-all duration-500`}></div>
                </div>
            </div>

            {/* Content */}
            <motion.div
                className={`relative z-20 w-full px-6 md:px-8 lg:px-12 xl:px-16 max-w-[1400px] mx-auto flex flex-col ${locale === 'ar' ? 'items-end text-right' : 'items-start text-left'}`}
                style={{ y: yText, opacity: opacityText }}
            >
                <div className="max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                        className="mb-8"
                    >
                        {/* Desktop Logo */}
                        <div className={`hidden md:block relative h-12 w-48 ${locale === 'ar' ? 'origin-right' : 'origin-left'}`}>
                            <Image
                                src="/logo.png"
                                alt="Logo"
                                fill
                                className={`object-contain ${locale === 'ar' ? 'object-right' : 'object-left'}`}
                                priority
                            />
                        </div>
                        {/* Mobile Logo */}
                        <div className={`block md:hidden relative h-10 w-32 ${locale === 'ar' ? 'origin-right' : 'origin-left'}`}>
                            <Image
                                src="/logo_mobile.png"
                                alt="Logo"
                                fill
                                className={`object-contain ${locale === 'ar' ? 'object-right' : 'object-left'}`}
                                priority
                            />
                        </div>
                    </motion.div>

                    <h1
                        className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]"
                    >
                        {t("hero.title2")}
                    </h1>

                    <motion.p
                        className="text-base md:text-lg text-stone-300 mb-10 font-medium leading-relaxed max-w-xl"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
                    >
                        {t("hero.subtitle2")}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                        className={`flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto ${locale === 'ar' ? 'sm:flex-row-reverse justify-end' : 'justify-start'}`}
                    >
                        <a
                            href="#projects"
                            className="w-full sm:w-auto flex items-center justify-center px-8 py-4 bg-white text-black text-sm font-bold tracking-widest uppercase transition-transform hover:scale-105 active:scale-95"
                        >
                            {t("hero.cta")}
                        </a>

                        <a
                            href="#about"
                            className="w-full sm:w-auto flex items-center justify-center px-8 py-4 bg-transparent border border-white text-white text-sm font-bold tracking-widest uppercase transition-all hover:bg-white hover:text-black"
                        >
                            {t("nav.about")}
                        </a>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
