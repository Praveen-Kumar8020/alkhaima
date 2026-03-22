"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "./TranslationProvider";
import { useState, useEffect, useRef } from "react";
import {
    ArrowRight, Building2, Droplets, HardHat,
    MapPin, Phone, Mail, Clock, MessageCircle, Send,
    Instagram, Paperclip, Calendar, ChevronLeft, ChevronRight,
    Play, Pause, CheckCircle2, AlertCircle
} from "lucide-react";
import QuickChat from "./QuickChat";

const TikTokIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
);

export default function ContentSections() {
    const { t, locale } = useTranslation();
    const [currentSlide, setCurrentSlide] = useState(0);

    const [isVideoHovered, setIsVideoHovered] = useState(false);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [videoCursorPos, setVideoCursorPos] = useState({ x: 0, y: 0 });
    const videoRef = useRef<HTMLVideoElement>(null);

    // Contact Form States
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error" | "validation_error">("idle");
    const [fileName, setFileName] = useState("");

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Proper validation
        if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
            setSubmitStatus("validation_error");
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus("idle");

        try {
            const formDataToSend = new FormData();
            formDataToSend.append("name", formData.name);
            formDataToSend.append("email", formData.email);
            formDataToSend.append("message", formData.message);
            formDataToSend.append("_subject", "New Contact Inquiry from Al Khaima");
            formDataToSend.append("_captcha", "false"); 
            
            // Note: formsubmit.co requires actual file Blob if uploading,
            // bypassing file logic here for core simplicity unless attached

            const res = await fetch("https://formsubmit.co/ajax/povah92077@lxbeta.com", {
                method: "POST",
                body: formDataToSend
            });

            if (res.ok) {
                setSubmitStatus("success");
                setFormData({ name: "", email: "", message: "" });
                setFileName("");
                setTimeout(() => setSubmitStatus("idle"), 5000);
            } else {
                setSubmitStatus("error");
            }
        } catch (error) {
            setSubmitStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleVideoMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setVideoCursorPos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    const toggleVideoPlay = () => {
        if (videoRef.current) {
            if (isVideoPlaying) {
                videoRef.current.pause();
                setIsVideoPlaying(false);
            } else {
                videoRef.current.play();
                setIsVideoPlaying(true);
            }
        }
    };

    const services = [
        {
            id: "property",
            image: "/property.png",
            titleKey: "services.1.title",
            descKey: "services.1.desc",
        },
        {
            id: "buying",
            image: "/buying.png",
            titleKey: "services.2.title",
            descKey: "services.2.desc",
        },
        {
            id: "leasing",
            image: "/leasing.png",
            titleKey: "services.3.title",
            descKey: "services.3.desc",
        },
        {
            id: "marketing",
            image: "/realestate.png",
            titleKey: "services.4.title",
            descKey: "services.4.desc",
        },
    ];

    const whyChooseFeatures = [
        {
            id: "collaborate",
            image: "/collaborate.png",
            titleKey: "why.1.title",
            descKey: "why.1.desc",
        },
        {
            id: "fast",
            image: "/fast.png",
            titleKey: "why.2.title",
            descKey: "why.2.desc",
        },
        {
            id: "licensed",
            image: "/licensed.png",
            titleKey: "why.3.title",
            descKey: "why.3.desc",
        },
        {
            id: "local",
            image: "/local.png",
            titleKey: "why.4.title",
            descKey: "why.4.desc",
        },
    ];

    const projects = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2062&auto=format&fit=crop",
            titleKey: "project.1.title",
            locationKey: "project.1.location",
            dateKey: "project.1.date",
        },
        {
            id: 2,
            image: "/doha_plant.png",
            titleKey: "project.2.title",
            locationKey: "project.2.location",
            dateKey: "project.2.date",
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
            titleKey: "project.3.title",
            locationKey: "project.3.location",
            dateKey: "project.3.date",
        },
        {
            id: 4,
            image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=2070&auto=format&fit=crop",
            titleKey: "project.4.title",
            locationKey: "project.4.location",
            dateKey: "project.4.date",
        },
        {
            id: 5,
            image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
            titleKey: "project.5.title",
            locationKey: "project.5.location",
            dateKey: "project.5.date",
        },
    ];

    const maxSlide = projects.length - 1; // Or responsive logic if needed

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === maxSlide ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? maxSlide : prev - 1));
    };

    return (
        <div className="bg-stone-50 text-stone-900 pb-0">
            {/* About Section */}
            <section id="about" className="py-24 px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-stone-900 tracking-tight">{t("about.title")}</h2>
                        <p className="text-lg text-stone-600 leading-relaxed mb-8">
                            {t("about.description")}
                        </p>
                        <a href="#" className="inline-flex items-center gap-2 uppercase tracking-widest text-sm font-semibold text-stone-800 hover:text-stone-500 transition-colors group">
                            {t("about.readMore")}
                            <ArrowRight size={16} className={`transition-transform ${locale === 'ar' ? 'group-hover:-translate-x-2 rotate-180' : 'group-hover:translate-x-2'}`} />
                        </a>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="relative w-full flex items-center justify-center mt-12 md:mt-0"
                    >
                        {/* Architectural background layer */}
                        <img
                            src="/about_bg.png"
                            alt="Architectural lines"
                            className="absolute md:-right-24 top-1/2 -translate-y-1/2 w-[120%] md:w-[110%] max-w-none h-auto object-contain opacity-30 z-0 pointer-events-none"
                        />

                        {/* Main building image */}
                        <div className="relative z-10 w-[320px] md:w-[420px] h-[420px] md:h-[480px] shadow-2xl bg-white">
                            <img
                                src="/about.png"
                                alt="Construction site"
                                className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-700"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-24 bg-[#EAEAEA]">
                <div className="max-w-[1400px] mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold text-black tracking-tight">{t("services.title")}</h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8 cursor-pointer">
                        {services.map((service, index) => (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7, delay: index * 0.1 }}
                                className="group relative bg-white px-6 py-10 lg:px-8 lg:py-12 rounded-[2rem] shadow-[0_15px_40px_-15px_rgba(0,0,0,0.1)] border border-transparent hover:border-black/5 hover:bg-stone-50 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] hover:-translate-y-2 transition-all duration-500 overflow-hidden flex flex-col items-center"
                            >
                                <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-stone-400 to-black transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 rounded-t-[2rem]"></div>
                                <img
                                    src={service.image}
                                    alt={t(service.titleKey as any)}
                                    className="w-16 h-16 sm:w-20 sm:h-20 object-contain mb-8 group-hover:scale-110 group-hover:drop-shadow-[0_10px_10px_rgba(0,0,0,0.1)] transition-all duration-500 filter"
                                />
                                <h3 className="text-sm sm:text-base xl:text-lg font-bold mb-4 text-black text-center w-full transition-colors">{t(service.titleKey as any)}</h3>
                                <p className="text-[11px] sm:text-xs xl:text-sm text-stone-700 leading-relaxed text-justify w-full">
                                    {t(service.descKey as any)}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Section */}
            <section id="why-choose" className="py-24 px-6 max-w-8xl mx-auto bg-black text-white relative border-y border-stone-800">
                <div className="absolute inset-0 bg-stone-900/40 mix-blend-overlay"></div>
                <div className="max-w-[1400px] mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">{t("why.title" as any)}</h2>
                        <p className="text-stone-400 text-sm md:text-base max-w-2xl mx-auto font-light">
                            {t("why.subtitle" as any)}
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 mt-16 cursor-pointer">
                        {whyChooseFeatures.map((feature, index) => (
                            <motion.div
                                key={feature.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="group flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6 md:p-8 rounded-3xl border border-transparent hover:border-stone-800 hover:bg-stone-900/50 transition-all duration-500 overflow-hidden relative"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-stone-800/0 via-white/5 to-stone-800/0 -translate-x-[150%] skew-x-[-20deg] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out" />

                                {/* Icon container */}
                                <div className="shrink-0 transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-3">
                                    <img
                                        src={feature.image}
                                        alt={t(feature.titleKey as any)}
                                        className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                                    />
                                </div>

                                {/* Content */}
                                <div>
                                    <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-stone-100 group-hover:text-white transition-colors">{t(feature.titleKey as any)}</h3>
                                    <p className="text-xs sm:text-sm text-stone-400 leading-relaxed font-light group-hover:text-stone-300 transition-colors">
                                        {t(feature.descKey as any)}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Projects Section Slider */}
            <section id="projects" className="py-24 bg-stone-900 border-t border-stone-800 text-white relative overflow-hidden">
                <div className="max-w-[1400px] mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6"
                    >
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">{t("projects.title")}</h2>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="flex gap-2">
                                <button
                                    onClick={prevSlide}
                                    className="w-12 h-12 rounded-full border border-stone-700 flex items-center justify-center hover:bg-stone-800 hover:text-white transition-colors"
                                >
                                    <ChevronLeft size={20} className={locale === 'ar' ? 'rotate-180' : ''} />
                                </button>
                                <button
                                    onClick={nextSlide}
                                    className="w-12 h-12 rounded-full border border-stone-700 flex items-center justify-center hover:bg-stone-800 hover:text-white transition-colors"
                                >
                                    <ChevronRight size={20} className={locale === 'ar' ? 'rotate-180' : ''} />
                                </button>
                            </div>
                            <a href="#" className="hidden md:inline-flex items-center gap-2 uppercase tracking-widest text-sm text-stone-400 hover:text-white transition-colors group">
                                {t("project.viewMore")} <ArrowRight size={16} className={`transition-transform ${locale === 'ar' ? 'group-hover:-translate-x-2 rotate-180' : 'group-hover:translate-x-2'}`} />
                            </a>
                        </div>
                    </motion.div>

                    <div className="relative w-full">
                        <div className="overflow-hidden">
                            <motion.div
                                className="flex transition-all duration-700 ease-in-out gap-6"
                                style={{
                                    transform: `translateX(${locale === 'ar' ? currentSlide * (100 / (typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : 4)) : -currentSlide * (100 / (typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : 4))}%)`
                                }}
                            >
                                {projects.map((project, index) => (
                                    <div
                                        key={project.id}
                                        className="w-full min-w-[100%] sm:min-w-[50%] lg:min-w-[25%] flex-shrink-0 group cursor-pointer"
                                        style={{ width: 'calc(25% - 1.125rem)' }} // Accounts for gap-6 (1.5rem)
                                    >
                                        <div className="relative h-[26rem] overflow-hidden rounded-2xl mb-6 shadow-2xl border border-stone-800">
                                            <div className="absolute inset-0 bg-black/40 z-10 group-hover:opacity-0 transition-opacity duration-500"></div>
                                            <img
                                                src={project.image}
                                                alt={t(project.titleKey as any)}
                                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/80 to-transparent z-10 flex flex-col justify-end p-6">
                                                <h3 className="text-xl md:text-2xl font-bold text-white mb-4 line-clamp-2">
                                                    {t(project.titleKey as any)}
                                                </h3>
                                                
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-3 text-stone-300">
                                                        <MapPin size={16} className="text-stone-400" />
                                                        <span className="text-sm">{t(project.locationKey as any)}</span>
                                                    </div>
                                                    <div className="flex items-center gap-3 text-stone-300">
                                                        <Calendar size={16} className="text-stone-400" />
                                                        <span className="text-sm">{t(project.dateKey as any)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Showcase Video Section */}
            <section className="py-24 bg-black relative">
                <div className="max-w-[1400px] mx-auto px-6">
                    <motion.div
                        className="relative w-full aspect-video rounded-3xl overflow-hidden cursor-none group"
                        onMouseMove={handleVideoMouseMove}
                        onMouseEnter={() => setIsVideoHovered(true)}
                        onMouseLeave={() => setIsVideoHovered(false)}
                        onClick={toggleVideoPlay}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.5 }}
                        onViewportEnter={() => {
                            if (videoRef.current && !isVideoPlaying) {
                                videoRef.current.play().then(() => setIsVideoPlaying(true)).catch(() => {});
                            }
                        }}
                        transition={{ duration: 0.8 }}
                    >
                        <video
                            ref={videoRef}
                            src="/real_estate.mp4"
                            className="w-full h-full object-cover"
                            loop
                            muted
                            playsInline
                        />
                        <div className={`absolute inset-0 bg-black/40 transition-colors duration-500 pointer-events-none ${isVideoPlaying ? 'opacity-0' : 'opacity-100 group-hover:bg-black/20'}`}></div>
                        
                        <AnimatePresence>
                            {isVideoHovered && (
                                <motion.div
                                    className="absolute z-50 flex items-center justify-center gap-2 px-6 h-14 bg-white text-black rounded-full font-semibold text-sm pointer-events-none mix-blend-screen shadow-[0_0_30px_rgba(255,255,255,0.3)] whitespace-nowrap"
                                    style={{ 
                                        left: 0, 
                                        top: 0,
                                        x: videoCursorPos.x - 70, 
                                        y: videoCursorPos.y - 28 
                                    }}
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                >
                                    {isVideoPlaying ? (
                                        <>
                                            <Pause fill="currentColor" size={16} />
                                            <span>{t("video.pause" as any)}</span>
                                        </>
                                    ) : (
                                        <>
                                            <Play fill="currentColor" size={16} />
                                            <span>{t("video.play" as any)}</span>
                                        </>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>

            {/* Contact Us Section */}
            <section id="contact" className="py-24 bg-white relative">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-gradient inline-block mb-4">{t("contact.title" as any)}</h2>
                        <p className="text-stone-500 max-w-2xl mx-auto">{t("contact.subtitle" as any)}</p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: locale === 'ar' ? 50 : -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="bg-stone-50 p-10 rounded-2xl border border-stone-200 shadow-sm"
                        >
                            <div className="space-y-8">
                                <div className="flex items-start gap-4 flex-col sm:flex-row">
                                    <div className="flex gap-4">
                                        <div className="bg-stone-200 p-3 rounded-lg text-stone-700 shrink-0 h-12 w-12 flex items-center justify-center">
                                            <MapPin className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg mb-1">{t("contact.location" as any)}</h4>
                                            <p className="text-stone-600 mb-2">{t("contact.address" as any)}</p>
                                        </div>
                                    </div>
                                    <div className="w-full mt-2 sm:mt-0 rounded-xl overflow-hidden border border-stone-200 shadow-inner h-40">
                                        <iframe
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13904.764504104595!2d47.97116742510349!3d29.37856424368593!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3fcf84eba17f2231%3A0xdaac5c15eac22db5!2sThe%20H%20Towers!5e0!3m2!1sen!2skw!4v1709664539665!5m2!1sen!2skw"
                                            width="100%"
                                            height="100%"
                                            style={{ border: 0 }}
                                            allowFullScreen
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                        ></iframe>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-stone-200 p-3 rounded-lg text-stone-700">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-1">{t("contact.whatsapp" as any)}</h4>
                                        <p className="text-stone-600" dir="ltr">{t("contact.phone" as any)}</p>
                                        <a href="https://wa.me/96598703370" target="_blank" rel="noreferrer" className="text-sm text-stone-900 font-semibold underline mt-2 inline-block">
                                            WhatsApp
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-stone-200 p-3 rounded-lg text-stone-700">
                                        <Clock className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-1">{t("contact.workingHours" as any)}</h4>
                                        <ul className="text-stone-600 space-y-1">
                                            <li>{t("contact.mon_thu" as any)}</li>
                                            <li>{t("contact.fri" as any)}</li>
                                            <li>{t("contact.sat" as any)}</li>
                                            <li>{t("contact.sun" as any)}</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-stone-200">
                                    <h4 className="font-bold text-lg mb-4">{t("contact.followUs" as any)}</h4>
                                    <div className="flex gap-4">
                                        <a href="https://www.instagram.com/al_khaimakw?igsh=MWIxcmF1eGduMWM4OA%3D%3D" target="_blank" rel="noreferrer" className="bg-stone-200 p-3 rounded-xl text-stone-600 hover:bg-gradient-to-tr hover:from-amber-500 hover:via-pink-500 hover:to-purple-600 hover:text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                                            <Instagram className="w-5 h-5" />
                                        </a>
                                        <a href="https://www.tiktok.com/@al_khaima?_r=1&_t=ZS-93vEfssRH7N" target="_blank" rel="noreferrer" className="bg-stone-200 p-3 rounded-xl text-stone-600 hover:bg-black hover:text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                                            <TikTokIcon className="w-5 h-5" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: locale === 'ar' ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="bg-white p-10 rounded-2xl shadow-xl border border-stone-100"
                        >
                            <form className="space-y-6" onSubmit={handleFormSubmit}>
                                {submitStatus === "success" && (
                                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-lg">
                                        <CheckCircle2 size={24} className="shrink-0" />
                                        <p className="text-sm font-semibold">{t("contact.form.success" as any)}</p>
                                    </motion.div>
                                )}
                                {submitStatus === "validation_error" && (
                                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                                        <AlertCircle size={20} className="shrink-0" />
                                        <p className="text-sm font-semibold">{t("contact.form.error" as any)}</p>
                                    </motion.div>
                                )}
                                {submitStatus === "error" && (
                                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                                        <AlertCircle size={20} className="shrink-0" />
                                        <p className="text-sm font-semibold">An error occurred while sending. Please try again.</p>
                                    </motion.div>
                                )}

                                <div>
                                    <label className="block text-sm font-bold text-stone-700 mb-2">{t("contact.form.name" as any)}</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent transition-all"
                                        placeholder={t("contact.form.name" as any)}
                                        disabled={isSubmitting}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-stone-700 mb-2">{t("contact.form.email" as any)}</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent transition-all"
                                        placeholder={t("contact.form.email" as any)}
                                        disabled={isSubmitting}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-stone-700 mb-2">{t("contact.form.message" as any)}</label>
                                    <textarea
                                        rows={4}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent transition-all resize-none"
                                        placeholder={t("contact.form.message" as any)}
                                        disabled={isSubmitting}
                                    ></textarea>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-stone-700 mb-2">{t("contact.form.upload" as any)}</label>
                                    <div className="relative">
                                        <input
                                            type="file"
                                            className="hidden"
                                            id="file-upload"
                                            onChange={(e) => setFileName(e.target.files?.[0]?.name || "")}
                                            disabled={isSubmitting}
                                        />
                                        <label
                                            htmlFor="file-upload"
                                            className="w-full flex items-center justify-between px-4 py-3 bg-stone-50 border border-stone-200 border-dashed rounded-lg cursor-pointer hover:bg-stone-100 hover:border-stone-400 transition-all text-stone-500 hover:text-stone-700"
                                        >
                                            <div className="flex items-center gap-3">
                                                <Paperclip size={18} />
                                                <span className="text-sm line-clamp-1">{fileName || t("contact.form.upload" as any)}</span>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                                <button 
                                    type="submit" 
                                    disabled={isSubmitting}
                                    className="w-full bg-stone-900 overflow-hidden relative text-white py-4 rounded-lg font-bold tracking-wider hover:bg-black transition-all duration-300 flex justify-center items-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center gap-2">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Sending...
                                        </span>
                                    ) : (
                                        <>
                                            {t("contact.form.submit" as any)}
                                            <Send size={18} className={`transition-transform ${locale === 'ar' ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
                                        </>
                                    )}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Quick Chat Floating Button */}
            <QuickChat />

            {/* Sadu Pattern Divider */}
            <div 
                className="w-full h-10 md:h-14 lg:h-16 opacity-90"
                style={{ backgroundImage: "url('/sadu.png')", backgroundRepeat: 'repeat-x', backgroundSize: 'contain', backgroundPosition: 'center' }}
            ></div>

            {/* Simple Footer */}
            <footer className="bg-stone-950 text-stone-500 py-12 text-center text-sm border-t border-stone-800">
                <p>&copy; {new Date().getFullYear()} Al Khaima Real-Estate Company. {t("footer.rights" as any)}</p>
            </footer>
        </div>
    );
}
