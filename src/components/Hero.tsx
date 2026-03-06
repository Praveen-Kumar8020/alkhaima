"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "./TranslationProvider";
import { useEffect, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";

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
    const { t } = useTranslation();
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    // 3D Parallax Effects
    const yText = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scaleImage = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
    const filterImage = useTransform(scrollYProgress, [0, 1], ["brightness(1)", "brightness(0.5)"]);

    return (
        <section
            ref={containerRef}
            id="home"
            className="relative h-screen flex items-center justify-center overflow-hidden bg-stone-900"
        >
            {/* Premium Greyscale Background Image with Parallax */}
            <motion.div
                className="absolute inset-0 w-full h-full z-0"
                style={{
                    scale: scaleImage,
                    filter: filterImage,
                    backgroundImage: "url('https://images.unsplash.com/photo-1541888081622-297eb0fc7988?q=80&w=2070&auto=format&fit=crop')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                {/* Silver/Greyscale Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-stone-900/80 via-stone-800/60 to-stone-900/90 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-black/40"></div>
            </motion.div>

            {/* Content */}
            <motion.div
                className="relative z-10 text-center px-6 max-w-5xl mx-auto"
                style={{ y: yText, opacity: opacityText }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-stone-300 text-sm font-medium tracking-widest mb-6 uppercase">
                        Al Khaima Real-Estate Company
                    </span>
                </motion.div>

                <h1
                    className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white mb-6 leading-tight drop-shadow-2xl"
                    style={{ textShadow: "0 10px 30px rgba(0,0,0,0.5)" }}
                >
                    <Typewriter text={t("hero.title")} highlightText={t("hero.highlight")} />
                </h1>

                <motion.p
                    className="text-lg md:text-2xl text-stone-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
                >
                    {t("hero.subtitle")}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <a
                        href="#projects"
                        className="group relative px-8 py-4 bg-white text-stone-900 font-semibold tracking-wide uppercase overflow-hidden rounded-sm transition-transform hover:scale-105 active:scale-95"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            {t("hero.cta")}
                            <ArrowDown size={18} className="transition-transform group-hover:translate-y-1" />
                        </span>
                        <div className="absolute inset-0 bg-stone-200 transform scale-y-0 origin-bottom transition-transform duration-300 group-hover:scale-y-100"></div>
                    </a>

                    <a
                        href="#about"
                        className="px-8 py-4 bg-transparent border border-stone-500 text-white font-semibold tracking-wide uppercase rounded-sm transition-all hover:bg-stone-800 hover:border-stone-400"
                    >
                        {t("nav.about")}
                    </a>
                </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="w-6 h-10 border-2 border-stone-400 rounded-full flex justify-center p-1"
                >
                    <motion.div className="w-1 h-2 bg-stone-300 rounded-full" />
                </motion.div>
            </motion.div>
        </section>
    );
}
