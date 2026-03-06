"use client";

import { motion } from "framer-motion";
import { useTranslation } from "./TranslationProvider";
import {
    ArrowRight, Building2, Droplets, HardHat,
    MapPin, Phone, Mail, Clock, MessageCircle, Send,
    Instagram, Paperclip
} from "lucide-react";
import QuickChat from "./QuickChat";

const TikTokIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
);

export default function ContentSections() {
    const { t, locale } = useTranslation();

    const services = [
        {
            id: "civil",
            icon: <Building2 className="w-10 h-10 text-stone-600 mb-6" />,
            titleKey: "services.civil",
            descKey: "services.civil.desc",
        },
        {
            id: "piling",
            icon: <HardHat className="w-10 h-10 text-stone-600 mb-6" />,
            titleKey: "services.piling",
            descKey: "services.piling.desc",
        },
        {
            id: "water",
            icon: <Droplets className="w-10 h-10 text-stone-600 mb-6" />,
            titleKey: "services.water",
            descKey: "services.water.desc",
        },
    ];

    const projects = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2062&auto=format&fit=crop",
            titleKey: "project.1.title",
        },
        {
            id: 2,
            image: "/doha_plant.png",
            titleKey: "project.2.title",
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
            titleKey: "project.3.title",
        },
    ];

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
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">{t("about.title")}</h2>
                        <p className="text-lg text-stone-600 leading-relaxed mb-8">
                            {t("about.description")}
                        </p>
                        <a href="#" className="inline-flex items-center gap-2 uppercase tracking-widest text-sm font-semibold text-stone-800 hover:text-stone-500 transition-colors group">
                            {t("about.readMore")}
                            <ArrowRight size={16} className={`transition-transform ${locale === 'ar' ? 'group-hover:-translate-x-2 rotate-180' : 'group-hover:translate-x-2'}`} />
                        </a>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotateY: -20, rotateX: 10 }}
                        whileInView={{ opacity: 1, scale: 1, rotateY: 0, rotateX: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, type: "spring", bounce: 0.4, delay: 0.2 }}
                        style={{ perspective: 1000 }}
                        className="relative h-[500px] silver-panel overflow-hidden group rounded-2xl shadow-2xl"
                    >
                        <div className="absolute inset-0 bg-stone-200/50 backdrop-blur-sm z-10 transition-opacity duration-500 group-hover:opacity-0"></div>
                        <img
                            src="https://images.unsplash.com/photo-1565514020179-026b92b84bb6?q=80&w=2070&auto=format&fit=crop"
                            alt="Construction site"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale"
                        />
                    </motion.div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-24 bg-gradient-to-b from-stone-100 to-stone-200 border-y border-stone-300">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-gradient inline-block">{t("services.title")}</h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 100, rotateX: 20 }}
                                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: index * 0.15, type: "spring", bounce: 0.3 }}
                                style={{ perspective: 1000 }}
                                whileHover={{ y: -10, rotateX: -5 }}
                                className="bg-white p-10 rounded-xl shadow-[0_10px_40px_-5px_rgba(0,0,0,0.05)] border border-stone-200 hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
                            >
                                <div className="absolute top-0 left-0 w-full h-1 bg-stone-300 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                                {service.icon}
                                <h3 className="text-xl font-bold mb-4 text-stone-800">{t(service.titleKey as any)}</h3>
                                <p className="text-stone-500 leading-relaxed mb-6">{t(service.descKey as any)}</p>
                                <a href="#" className="inline-flex items-center gap-2 uppercase tracking-widest text-xs font-bold text-stone-400 group-hover:text-stone-800 transition-colors">
                                    {t("about.readMore")} <ArrowRight size={14} className={`opacity-0 transition-all ${locale === 'ar' ? 'translate-x-2 group-hover:-translate-x-0 rotate-180' : '-translate-x-2 group-hover:translate-x-0 group-hover:opacity-100'}`} />
                                </a>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="py-24 bg-stone-900 border-t border-stone-800 text-white relative">
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex justify-between items-end mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">{t("projects.title")}</h2>
                        <a href="#" className="hidden md:inline-flex items-center gap-2 uppercase tracking-widest text-sm text-stone-400 hover:text-white transition-colors group">
                            {t("project.viewMore")} <ArrowRight size={16} className={`transition-transform ${locale === 'ar' ? 'group-hover:-translate-x-2 rotate-180' : 'group-hover:translate-x-2'}`} />
                        </a>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
                                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: index * 0.15, type: "spring", bounce: 0.4 }}
                                style={{ perspective: 1000 }}
                                whileHover={{ z: 20 }}
                                className="group cursor-pointer"
                            >
                                <div className="relative h-80 overflow-hidden rounded-lg mb-6 shadow-2xl">
                                    <div className="absolute inset-0 bg-black/60 z-10 opacity-60 group-hover:opacity-20 transition-opacity duration-500"></div>
                                    <img
                                        src={project.image}
                                        alt={t(project.titleKey as any)}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                    />
                                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent z-10"></div>
                                </div>
                                <h3 className="text-xl font-medium text-stone-200 group-hover:text-white transition-colors mb-2">
                                    {t(project.titleKey as any)}
                                </h3>
                                <div className="w-12 h-0.5 bg-stone-600 transition-all duration-300 group-hover:w-full group-hover:bg-stone-300"></div>
                            </motion.div>
                        ))}
                    </div>
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
                            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                                <div>
                                    <label className="block text-sm font-bold text-stone-700 mb-2">{t("contact.form.name" as any)}</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent transition-all"
                                        placeholder={t("contact.form.name" as any)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-stone-700 mb-2">{t("contact.form.email" as any)}</label>
                                    <input
                                        type="email"
                                        className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent transition-all"
                                        placeholder={t("contact.form.email" as any)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-stone-700 mb-2">{t("contact.form.message" as any)}</label>
                                    <textarea
                                        rows={4}
                                        className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent transition-all resize-none"
                                        placeholder={t("contact.form.message" as any)}
                                    ></textarea>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-stone-700 mb-2">{t("contact.form.upload" as any)}</label>
                                    <div className="relative">
                                        <input
                                            type="file"
                                            className="hidden"
                                            id="file-upload"
                                        />
                                        <label
                                            htmlFor="file-upload"
                                            className="w-full flex items-center gap-3 px-4 py-3 bg-stone-50 border border-stone-200 border-dashed rounded-lg cursor-pointer hover:bg-stone-100 hover:border-stone-400 transition-all text-stone-500 hover:text-stone-700"
                                        >
                                            <Paperclip size={18} />
                                            <span className="text-sm">{t("contact.form.upload" as any)}</span>
                                        </label>
                                    </div>
                                </div>
                                <button className="w-full bg-stone-900 text-white py-4 rounded-lg font-bold tracking-wider hover:bg-black transition-all duration-300 flex justify-center items-center gap-2 group">
                                    {t("contact.form.submit" as any)}
                                    <Send size={18} className={`transition-transform ${locale === 'ar' ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
                                </button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Quick Chat Floating Button */}
            <QuickChat />

            {/* Simple Footer */}
            <footer className="bg-stone-950 text-stone-500 py-12 text-center text-sm border-t border-stone-800">
                <p>&copy; {new Date().getFullYear()} Al Khaima Real-Estate Company. {t("footer.rights" as any)}</p>
            </footer>
        </div>
    );
}
