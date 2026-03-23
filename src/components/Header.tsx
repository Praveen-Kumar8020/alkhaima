"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "./TranslationProvider";
import { motion } from "framer-motion";
import Image from "next/image";

import { usePathname } from "next/navigation";

export default function Header() {
    const pathname = usePathname();
    const { locale, setLocale, t } = useTranslation();
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("home");



    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            // Determine active section based on scroll position
            const sections = ["home", "about", "services", "projects", "contact"];
            const currentSection = sections.find((section) => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return rect.top >= -100 && rect.top <= window.innerHeight / 2;
                }
                return false;
            });

            if (currentSection) {
                setActiveSection(currentSection);
            }
        };

        window.addEventListener("scroll", handleScroll);
        // Trigger once to set initial state
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleNavClick = (section: string) => {
        setActiveSection(section);
    };

    if (pathname?.startsWith('/admin')) {
        return null;
    }

    return (
        <motion.header
            dir={locale === "ar" ? "rtl" : "ltr"}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? "bg-black/95 backdrop-blur-md shadow-md py-3 border-b border-stone-800"
                : "bg-transparent py-5"
                }`}
        >
            <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center">
                <a href="#home" className="flex items-center" onClick={() => handleNavClick("home")}>
                    {/* Desktop Logo */}
                    <div className="hidden md:block relative h-12 w-48 transition-transform duration-300 hover:scale-105">
                        <Image
                            src="/logo.png"
                            alt="Logo"
                            fill
                            className={`object-contain ${locale === 'ar' ? 'object-right' : 'object-left'}`}
                            priority
                        />
                    </div>
                    {/* Mobile Logo */}
                    <div className="block md:hidden relative h-10 w-32 transition-transform duration-300 hover:scale-105">
                        <Image
                            src="/logo_mobile.png"
                            alt="Logo"
                            fill
                            className={`object-contain ${locale === 'ar' ? 'object-right' : 'object-left'}`}
                            priority
                        />
                    </div>
                </a>

                {/* Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    {["home", "about", "services", "projects", "contact"].map((item) => (
                        <a
                            key={item}
                            href={`#${item}`}
                            onClick={() => handleNavClick(item)}
                            className={`text-sm font-bold uppercase tracking-widest transition-colors relative group
                                ${activeSection === item
                                    ? (scrolled ? "text-stone-100" : "text-white")
                                    : (scrolled ? "text-stone-400 hover:text-stone-100" : "text-stone-300 hover:text-white")
                                }
                            `}
                        >
                            {t(`nav.${item}` as any)}
                            <span className={`absolute -bottom-1.5 left-0 h-[2px] transition-all duration-300 
                                ${activeSection === item ? "w-full" : "w-0 group-hover:w-full"}
                                ${scrolled ? "bg-stone-300" : "bg-white"}
                            `}></span>
                        </a>
                    ))}
                </nav>

                {/* Language Toggle */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setLocale("ar")}
                        className={`text-sm font-bold uppercase transition-colors px-2 py-1 rounded
                            ${locale === "ar"
                                ? (scrolled ? "bg-stone-800 text-stone-100" : "bg-white text-stone-900")
                                : (scrolled ? "text-stone-400 hover:text-stone-100" : "text-stone-300 hover:text-white")
                            }
                        `}
                    >
                        AR
                    </button>
                    <span className={`h-4 w-[1px] ${scrolled ? "bg-stone-300" : "bg-stone-400/50"}`}></span>
                    <button
                        onClick={() => setLocale("en")}
                        className={`text-sm font-bold uppercase transition-colors px-2 py-1 rounded
                            ${locale === "en"
                                ? (scrolled ? "bg-stone-800 text-stone-100" : "bg-white text-stone-900")
                                : (scrolled ? "text-stone-400 hover:text-stone-100" : "text-stone-300 hover:text-white")
                            }
                        `}
                    >
                        EN
                    </button>
                </div>
            </div>
        </motion.header>
    );
}
