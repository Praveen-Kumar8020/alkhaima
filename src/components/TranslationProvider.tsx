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
        "hero.title2": "Your Trusted Partner for Buying & Selling Properties in KUWAIT",
        "hero.subtitle2": "Buy, sell, or invest in properties with trusted guidance from Al Khaima.",
        "hero.cta": "Explore Our Work",
        "about.title": "About Our Company",
        "about.description": "We aspire to be one of the recognized leaders in the construction sector across the MENA region. Established in 1996, we offer a one-stop service for specialist foundation, civil, and tunnel works.",
        "about.readMore": "Read More",
        "services.title": "Our Services",
        "services.1.title": "Property Management",
        "services.1.desc": "Property management involves the administration, operation, and maintenance of real estate properties on behalf of the owner. It includes tasks such as tenant management, rent collection, property maintenance, financial reporting, and ensuring the property remains profitable and well maintained.",
        "services.2.title": "Buying & Selling Properties",
        "services.2.desc": "Buying and selling properties refers to the process of helping clients purchase or sell residential, commercial, or investment real estate. This service typically includes property evaluation, market analysis, negotiations, legal documentation, and closing transactions to ensure a smooth and secure deal.",
        "services.3.title": "Leasing & Renting Services",
        "services.3.desc": "Leasing and renting services assist property owners and tenants in finding suitable rental opportunities. This includes property listing, tenant screening, lease agreement preparation, rent negotiations, and ensuring both parties meet the terms of the rental contract.",
        "services.4.title": "Real Estate Marketing",
        "services.4.desc": "Real estate marketing focuses on promoting properties to attract potential buyers or tenants. It uses strategies such as digital marketing, social media promotion, professional photography, property listings, and advertising campaigns to maximize property visibility and generate leads.",
        "why.title": "Why Choose Al Khaima?",
        "why.subtitle": "Reliable real estate services backed by local expertise and professional partnerships.",
        "why.1.title": "Expert Collaborations",
        "why.1.desc": "We collaborate with experienced real estate professionals and industry experts to deliver the best property solutions.",
        "why.2.title": "Fast & Reliable Service",
        "why.2.desc": "We respond quickly and provide trusted service to ensure a smooth and efficient experience for every client.",
        "why.3.title": "Licensed & Trusted",
        "why.3.desc": "Licensed by the Ministry of Commerce in Kuwait, ensuring transparency, professionalism, and legal compliance in all real estate transactions.",
        "why.4.title": "Local Kuwaiti Team",
        "why.4.desc": "A young and energetic Kuwaiti team that understands the local market trends, neighborhoods, and investment opportunities.",
        "projects.title": "Ongoing Projects",
        "project.1.title": "Dasman, Abdullah Al Ahmad Street",
        "project.1.location": "Kuwait City",
        "project.1.date": "December 2024",
        "project.2.title": "Doha Swro Desalination Plant",
        "project.2.location": "Doha",
        "project.2.date": "August 2023",
        "project.3.title": "Car Parking MOH Hospitals",
        "project.3.location": "Hawalli",
        "project.3.date": "February 2025",
        "project.4.title": "Ahmadi Residential Complex",
        "project.4.location": "Ahmadi",
        "project.4.date": "January 2026",
        "project.5.title": "Jahra Commercial Hub",
        "project.5.location": "Al Jahra",
        "project.5.date": "March 2026",
        "project.6.title": "Sabah Al Ahmad City",
        "project.6.location": "Al Asimah",
        "project.6.date": "May 2026",
        "project.7.title": "Mubarakiya Market Renovation",
        "project.7.location": "Kuwait City",
        "project.7.date": "July 2026",
        "project.8.title": "Boubyan Island Development",
        "project.8.location": "Boubyan",
        "project.8.date": "October 2026",
        "project.viewMore": "View All Projects",
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
        "contact.form.upload": "Upload Document",
        "video.play": "Play Video",
        "video.pause": "Pause Video"
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
        "hero.title2": "شريكك الموثوق لبيع وشراء العقارات في الكويت",
        "hero.subtitle2": "اشترِ، بع، أو استثمر في العقارات بتوجيه موثوق من مؤسسة الخيمة.",
        "hero.cta": "استكشف أعمالنا",
        "about.title": "عن الشركة",
        "about.description": "نطمح لأن نكون أحد أبرز قادة قطاع البناء في منطقة الشرق الأوسط وشمال أفريقيا. تأسسنا في عام 1996، لنقدم خدمات شاملة لأساسات البناء المتخصصة والأعمال المدنية والأنفاق.",
        "about.readMore": "اقرأ المزيد",
        "services.title": "خدماتنا",
        "services.1.title": "إدارة الأملاك",
        "services.1.desc": "تتضمن إدارة الأملاك إدارة وتشغيل وصيانة العقارات نيابة عن المالك. وتشمل مهام مثل إدارة المستأجرين، تحصيل الإيجارات، صيانة العقار، إعداد التقارير المالية، وضمان بقاء العقار مربحاً ومصاناً بشكل جيد.",
        "services.2.title": "بيع وشراء العقارات",
        "services.2.desc": "يشير بيع وشراء العقارات إلى عملية مساعدة العملاء في شراء أو بيع العقارات السكنية أو التجارية أو الاستثمارية. تشمل هذه الخدمة عادةً تقييم العقار، تحليل السوق، المفاوضات، الوثائق القانونية، وإتمام المعاملات لضمان صفقة سلسة وآمنة.",
        "services.3.title": "خدمات التأجير",
        "services.3.desc": "تساعد خدمات التأجير أصحاب العقارات والمستأجرين في العثور على فرص إيجار مناسبة. يشمل ذلك عرض العقار، فحص المستأجرين، إعداد اتفاقية الإيجار، مفاوضات الإيجار، والتأكد من وفاء كلا الطرفين بشروط عقد الإيجار.",
        "services.4.title": "التسويق العقاري",
        "services.4.desc": "يركز التسويق العقاري على الترويج للعقارات لجذب المشترين أو المستأجرين المحتملين. ويستخدم استراتيجيات مثل التسويق الرقمي، الترويج عبر وسائل التواصل الاجتماعي، التصوير الاحترافي، قوائم العقارات، والحملات الإعلانية لزيادة ظهور العقار وتوليد فرص البيع.",
        "why.title": "لماذا تختار الخيمة؟",
        "why.subtitle": "خدمات عقارية موثوقة مدعومة بخبرة محلية وشراكات مهنية.",
        "why.1.title": "شراكات مهنية",
        "why.1.desc": "نتعاون مع محترفين وخبراء في مجال العقارات لتقديم أفضل الحلول العقارية.",
        "why.2.title": "خدمة سريعة وموثوقة",
        "why.2.desc": "نستجيب بسرعة ونقدم خدمة موثوقة لضمان تجربة سلسة وفعالة لكل عميل.",
        "why.3.title": "مرخص وموثوق",
        "why.3.desc": "مرخص من وزارة التجارة في الكويت، مما يضمن الشفافية والاحترافية والامتثال القانوني في جميع المعاملات العقارية.",
        "why.4.title": "فريق كويتي محلي",
        "why.4.desc": "فريق كويتي شاب وحيوي يفهم اتجاهات السوق المحلي، والأحياء، وفرص الاستثمار.",
        "projects.title": "المشاريع الجارية",
        "project.1.title": "دسمان، شارع عبدالله الأحمد",
        "project.1.location": "مدينة الكويت",
        "project.1.date": "ديسمبر 2024",
        "project.2.title": "محطة الدوحة لتحلية المياه",
        "project.2.location": "الدوحة",
        "project.2.date": "أغسطس 2023",
        "project.3.title": "مواقف سيارات مستشفيات وزارة الصحة",
        "project.3.location": "حولي",
        "project.3.date": "فبراير 2025",
        "project.4.title": "مجمع الأحمدي السكني",
        "project.4.location": "الأحمدي",
        "project.4.date": "يناير 2026",
        "project.5.title": "مركز الجهراء التجاري",
        "project.5.location": "الجهراء",
        "project.5.date": "مارس 2026",
        "project.6.title": "مدينة صباح الأحمد",
        "project.6.location": "العاصمة",
        "project.6.date": "مايو 2026",
        "project.7.title": "تجديد سوق المباركية",
        "project.7.location": "مدينة الكويت",
        "project.7.date": "يوليو 2026",
        "project.8.title": "تطوير جزيرة بوبيان",
        "project.8.location": "بوبيان",
        "project.8.date": "أكتوبر 2026",
        "project.viewMore": "عرض جميع المشاريع",
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
        "contact.form.upload": "تحميل مستند",
        "video.play": "تشغيل الفيديو",
        "video.pause": "إيقاف الفيديو"
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
