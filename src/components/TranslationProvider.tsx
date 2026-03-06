"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Locale = "en" | "ar";

interface TranslationContextType {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: (key: keyof typeof translations["en"]) => string;
}

const translations = {
    en: {
        "nav.home": "Home",
        "nav.about": "About Us",
        "nav.services": "Services",
        "nav.projects": "Projects",
        "nav.contact": "Contact Us",
        "hero.title": "Building the Future of Kuwait",
        "hero.highlight": "Future of Kuwait",
        "hero.subtitle": "Pioneering Geotechnical & Civil Construction with Excellence since 1996",
        "hero.cta": "Explore Our Work",
        "about.title": "About Our Company",
        "about.description": "We aspire to be one of the recognized leaders in the construction sector across the MENA region. Established in 1996, we offer a one-stop service for specialist foundation, civil, and tunnel works.",
        "about.readMore": "Read More",
        "services.title": "Our Services",
        "services.civil": "Civil Engineering",
        "services.civil.desc": "Complete building and civil engineering service incorporating project and construction...",
        "services.piling": "Bored Pile Foundation",
        "services.piling.desc": "Specialist foundation solutions for diverse geotechnical environments...",
        "services.water": "Water Facilities",
        "services.water.desc": "Construction, installation, and maintenance of major water facilities...",
        "projects.title": "Featured Projects",
        "project.1.title": "Dasman, Abdullah Al Ahmad Street",
        "project.2.title": "Doha Swro Desalination Plant",
        "project.3.title": "Car Parking MOH Hospitals",
        "project.viewMore": "View Project Details",
        "footer.rights": "All Rights Reserved.",
        "contact.title": "Contact Us",
        "contact.subtitle": "We welcome you to visit us and get to know us better",
        "contact.whatsapp": "Contact us via WhatsApp",
        "contact.location": "Location",
        "contact.address": "The H Towers, 2nd Floor, Jassim Boodai St, Kuwait City",
        "contact.phone": "98703370",
        "contact.workingHours": "Working Hours",
        "contact.mon_thu": "Mon-Thu: 09:00 am – 09:00 pm",
        "contact.fri": "Fri: Closed",
        "contact.sat": "Sat: By Appointment",
        "contact.sun": "Sun: 09:00 am – 09:00 pm",
        "contact.form.name": "Name",
        "contact.form.email": "Email",
        "contact.form.message": "Message",
        "contact.form.submit": "Submit",
        "contact.quickChat": "Quick Chat",
        "contact.followUs": "Follow Us",
        "contact.map": "Map Directions",
        "chat.welcome": "How can we help you today?",
        "chat.placeholder": "Type a message...",
        "chat.autoReply": "Thanks! Your message has been submitted. You will receive a response here or via email. You may leave more messages below.\n\nWe'll respond as soon as we can.",
        "contact.form.upload": "Upload Document"
    },
    ar: {
        "nav.home": "الرئيسية",
        "nav.about": "معلومات عنا",
        "nav.services": "خدماتنا",
        "nav.projects": "المشاريع",
        "nav.contact": "اتصل بنا",
        "hero.title": "نبني مستقبل الكويت",
        "hero.highlight": "مستقبل الكويت",
        "hero.subtitle": "ريادة في الهندسة الجيوتقنية والمدنية بامتياز منذ عام 1996",
        "hero.cta": "استكشف أعمالنا",
        "about.title": "عن الشركة",
        "about.description": "نطمح لأن نكون أحد أبرز قادة قطاع البناء في منطقة الشرق الأوسط وشمال أفريقيا. تأسسنا في عام 1996، لنقدم خدمات شاملة لأساسات البناء المتخصصة والأعمال المدنية والأنفاق.",
        "about.readMore": "اقرأ المزيد",
        "services.title": "خدماتنا",
        "services.civil": "الهندسة المدنية",
        "services.civil.desc": "خدمة هندسة مدنية وبناء متكاملة تشمل تخطيط وتنفيذ المشاريع...",
        "services.piling": "أساسات الخوازيق المحفورة",
        "services.piling.desc": "حلول أساسات متخصصة لمختلف البيئات الجيوتقنية...",
        "services.water": "مرافق المياه",
        "services.water.desc": "بناء وتركيب وصيانة مرافق المياه الكبرى...",
        "projects.title": "المشاريع المميزة",
        "project.1.title": "دسمان، شارع عبدالله الأحمد",
        "project.2.title": "محطة الدوحة لتحلية المياه",
        "project.3.title": "مواقف سيارات مستشفيات وزارة الصحة",
        "project.viewMore": "عرض تفاصيل المشروع",
        "footer.rights": "جميع الحقوق محفوظة.",
        "contact.title": "تواصل معنا",
        "contact.subtitle": "نرحب بكم لزيارتنا والتعرف علينا عن قرب",
        "contact.whatsapp": "تواصل معنا عن طريق الواتساب",
        "contact.location": "الموقع",
        "contact.address": "أبراج H، الطابق الثاني، شارع جاسم بودي، مدينة الكويت، الكويت",
        "contact.phone": "98703370",
        "contact.workingHours": "ساعات العمل",
        "contact.mon_thu": "الاثنين - الخميس: 09:00 ص – 09:00 م",
        "contact.fri": "الجمعة: مغلق",
        "contact.sat": "السبت: بموعد مسبق",
        "contact.sun": "الأحد: 09:00 ص – 09:00 م",
        "contact.form.name": "الاسم",
        "contact.form.email": "البريد الإلكتروني",
        "contact.form.message": "الرسالة",
        "contact.form.submit": "إرسال",
        "contact.quickChat": "محادثة سريعة",
        "contact.followUs": "تابعنا",
        "contact.map": "اتجاهات الخريطة",
        "chat.welcome": "كيف يمكننا مساعدتك اليوم؟",
        "chat.placeholder": "اكتب رسالة...",
        "chat.autoReply": "شكراً! تم استلام رسالتك. ستتلقى رداً هنا أو عبر البريد الإلكتروني. يمكنك ترك المزيد من الرسائل أدناه.\n\nسنرد في أقرب وقت ممكن.",
        "contact.form.upload": "تحميل مستند"
    }
};

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const TranslationProvider = ({ children }: { children: ReactNode }) => {
    const [locale, setLocale] = useState<Locale>("en");

    // Load saved locale from localStorage or default to "en"
    useEffect(() => {
        const savedLocale = localStorage.getItem("app_locale") as Locale;
        if (savedLocale === "en" || savedLocale === "ar") {
            setLocale(savedLocale);
        }
    }, []);

    // Update HTML dir attribute whenever locale changes and save to localStorage
    useEffect(() => {
        document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
        document.documentElement.lang = locale;
        localStorage.setItem("app_locale", locale);
    }, [locale]);

    const t = (key: keyof typeof translations["en"]) => {
        return translations[locale][key] || translations["en"][key] || key;
    };

    return (
        <TranslationContext.Provider value={{ locale, setLocale, t }}>
            {children}
        </TranslationContext.Provider>
    );
};

export const useTranslation = () => {
    const context = useContext(TranslationContext);
    if (context === undefined) {
        throw new Error("useTranslation must be used within a TranslationProvider");
    }
    return context;
};
