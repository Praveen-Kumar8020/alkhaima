"use client";

import { useState, useEffect } from "react";
import { addProject, getProjects, deleteProject, translateToArabic } from "@/app/actions/projectActions";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loginUser, setLoginUser] = useState("");
    const [loginPass, setLoginPass] = useState("");
    const [loginError, setLoginError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (sessionStorage.getItem("adminAuth") === "true") {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Secure frontend simple check
        if (loginUser.trim().toLowerCase() === "admin" && loginPass === "Khaimah2000") {
            setIsAuthenticated(true);
            sessionStorage.setItem("adminAuth", "true");
        } else {
            setLoginError(true);
        }
    };

    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");

    // Ongoing projects table state
    const [projects, setProjects] = useState<any[]>([]);
    const [isFetching, setIsFetching] = useState(true);

    // Forms states    // Form states
    const [titleAr, setTitleAr] = useState("");
    const [locationAr, setLocationAr] = useState("");
    const [dateAr, setDateAr] = useState("");

    // File upload preview
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const loadProjects = async () => {
        setIsFetching(true);
        try {
            const data = await getProjects();
            setProjects(data);
        } catch (e) { console.error(e); }
        setIsFetching(false);
    };

    useEffect(() => {
        loadProjects();
    }, []);

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to completely delete this project and its image?")) return;

        try {
            const result = await deleteProject(id);
            if (result.success) {
                await loadProjects();
            } else {
                alert("Failed to delete project: " + result.error);
            }
        } catch (err: any) {
            alert("Error deleting project.");
        }
    };

    const handleTitleEnglishBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
        const text = e.target.value;
        if (!text) return;
        const result = await translateToArabic(text);
        if (result.text) setTitleAr(result.text);
    };

    const handleLocationEnglishBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
        const text = e.target.value;
        if (!text) return;
        const result = await translateToArabic(text);
        if (result.text) setLocationAr(result.text);
    };

    const handleDateChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const dateVal = e.target.value; // YYYY-MM
        if (!dateVal) return;

        const dateObj = new Date(dateVal + "-01");
        const monthEn = dateObj.toLocaleString("en-US", { month: "long" });
        const year = dateObj.getFullYear();

        // Setup arabic months directly for perfect formatting instead of auto-translate
        const monthArObj = new Intl.DateTimeFormat('ar', { month: 'long' }).format(dateObj);
        setDateAr(`${monthArObj} ${year}`);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        } else {
            setImagePreview(null);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        setStatus("loading");

        try {
            const formData = new FormData(form);

            // Format the date for the English field strictly using the selected date value since type="month" uses raw native value
            const dateVal = formData.get("dateRaw") as string;
            if (dateVal) {
                const dateObj = new Date(dateVal + "-01");
                const monthEn = dateObj.toLocaleString("en-US", { month: "long" });
                const year = dateObj.getFullYear();
                formData.append("dateEn", `${monthEn} ${year}`);
            }

            const result = await addProject(formData);

            if (result.success) {
                setStatus("success");
                form.reset();
                setImagePreview(null);
                setTitleAr("");
                setLocationAr("");
                setDateAr("");
                await loadProjects(); // instant refresh
                setTimeout(() => setStatus("idle"), 3000);
            } else {
                setStatus("error");
                setErrorMsg(result.error || "Failed to submit");
            }
        } catch (error: any) {
            setStatus("error");
            setErrorMsg(error.message);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-stone-50 flex items-center justify-center p-6 font-sans relative">
                <div className="absolute top-6 left-6 md:top-10 md:left-10">
                    <Link href="/" className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors font-bold text-sm tracking-widest uppercase">
                        <ArrowLeft size={18} /> Live Site
                    </Link>
                </div>
                <form onSubmit={handleLogin} className="bg-white p-10 rounded-3xl shadow-2xl border border-stone-100 w-full max-w-sm">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-stone-900 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-white text-xl font-bold tracking-widest">AK</span>
                        </div>
                        <h1 className="text-2xl font-bold text-stone-900">Admin Login</h1>
                        <p className="text-stone-500 text-sm mt-1">Enter credentials to continue</p>
                    </div>

                    {loginError && (
                        <div className="mb-6 p-3 bg-red-50 text-red-600 text-sm font-bold rounded-xl text-center border border-red-100">
                            Invalid username or password.
                        </div>
                    )}

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-stone-700 mb-2">Username</label>
                            <input type="text" value={loginUser} onChange={(e) => setLoginUser(e.target.value)} className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-stone-400 focus:outline-none" placeholder="admin" required />
                        </div>
                        <div className="relative">
                            <label className="block text-sm font-bold text-stone-700 mb-2">Password</label>
                            <input type={showPassword ? "text" : "password"} value={loginPass} onChange={(e) => setLoginPass(e.target.value)} className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-stone-400 focus:outline-none" placeholder="••••••••" required />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-10 text-stone-400 hover:text-stone-600 transition-colors">
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        <button type="submit" className="w-full py-4 mt-2 bg-stone-900 text-white font-bold rounded-xl tracking-widest hover:bg-black transition-colors">
                            LOGIN
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-stone-50 py-12 px-6 font-sans">
            <div className="max-w-6xl mx-auto space-y-12">
                {/* Form Wrapper */}
                <div className="bg-white rounded-3xl shadow-xl border border-stone-100 overflow-hidden">
                    <div className="bg-stone-950 p-8 text-white relative z-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
                            <p className="text-stone-400 mt-2">Add a new Ongoing Project</p>
                        </div>
                        <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors font-bold text-sm tracking-widest uppercase">
                            <ArrowLeft size={16} /> Live Site
                        </Link>
                    </div>

                    <div className="p-8 md:p-12 relative z-50">
                        {status === "success" && (
                            <div className="mb-8 p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl font-bold flex items-center justify-between">
                                Project added successfully! It is now live.
                            </div>
                        )}
                        {status === "error" && (
                            <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl font-bold">
                                Error: {errorMsg}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Title */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-stone-700 mb-2">Project Title (English)</label>
                                    <input required name="titleEn" type="text" onBlur={handleTitleEnglishBlur} className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-400" placeholder="e.g. Dasman Complex" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-stone-700 mb-2" dir="rtl">Project Title (Arabic)</label>
                                    <input required name="titleAr" value={titleAr} onChange={e => setTitleAr(e.target.value)} type="text" dir="rtl" className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-400" placeholder="مثال: مجمع دسمان" />
                                </div>
                            </div>

                            {/* Location */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-stone-700 mb-2">Location (English)</label>
                                    <input required name="locationEn" type="text" onBlur={handleLocationEnglishBlur} className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-400" placeholder="e.g. Kuwait City" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-stone-700 mb-2" dir="rtl">Location (Arabic)</label>
                                    <input required name="locationAr" value={locationAr} onChange={e => setLocationAr(e.target.value)} type="text" dir="rtl" className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-400" placeholder="مثال: مدينة الكويت" />
                                </div>
                            </div>

                            {/* Date */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-stone-700 mb-2">Select Month & Year</label>
                                    <input required name="dateRaw" type="month" onChange={handleDateChange} className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-400" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-stone-700 mb-2" dir="rtl">Date (Arabic Generated)</label>
                                    <input required name="dateAr" value={dateAr} onChange={e => setDateAr(e.target.value)} type="text" dir="rtl" className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-400" placeholder="مثال: ديسمبر ٢٠٢٤" />
                                </div>
                            </div>

                            {/* File Upload */}
                            <div>
                                <label className="block text-sm font-bold text-stone-700 mb-2">Project Image (JPG, JPEG, PNG)</label>
                                <div className="flex gap-6 items-start">
                                    <input required name="image" type="file" onChange={handleImageChange} accept=".jpg,.jpeg,.png" className="w-full md:w-2/3 px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-400" />
                                    {imagePreview && (
                                        <div className="w-32 h-32 rounded-xl border border-stone-300 overflow-hidden shadow-sm relative">
                                            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                </div>
                            </div>

                            <button disabled={status === "loading"} type="submit" className="w-full py-4 bg-stone-900 text-white rounded-xl font-bold uppercase tracking-widest hover:bg-black transition-colors disabled:opacity-70">
                                {status === "loading" ? "Publishing..." : "Add Project"}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Table wrapper */}
                <div className="bg-white rounded-3xl shadow-xl border border-stone-100 overflow-hidden relative z-50">
                    <div className="bg-stone-100 p-6 border-b border-stone-200">
                        <h2 className="text-xl font-bold text-stone-800">Manage Ongoing Projects</h2>
                    </div>

                    <div className="p-0 overflow-x-auto">
                        <table className="w-full text-left text-sm text-stone-600">
                            <thead className="bg-stone-50 text-stone-700 uppercase font-bold text-xs">
                                <tr>
                                    <th className="px-6 py-4">Image</th>
                                    <th className="px-6 py-4">Title</th>
                                    <th className="px-6 py-4">Location</th>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isFetching && (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-8 text-center text-stone-400">Loading projects...</td>
                                    </tr>
                                )}
                                {!isFetching && projects.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-8 text-center text-stone-400">No ongoing projects found.</td>
                                    </tr>
                                )}
                                {!isFetching && projects.map((project) => (
                                    <tr key={project.id} className="border-b border-stone-100 hover:bg-stone-50">
                                        <td className="px-6 py-4">
                                            <div className="w-16 h-12 rounded overflow-hidden relative border border-stone-200 bg-stone-100">
                                                {project.image && <img src={project.image} alt={project.title?.en} className="w-full h-full object-cover" />}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-bold text-stone-900">
                                            {project.title?.en || project.titleKey}
                                            <div className="text-xs font-normal text-stone-400 mt-1" dir="rtl">{project.title?.ar || project.titleKey}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {project.location?.en || project.locationKey}
                                        </td>
                                        <td className="px-6 py-4">
                                            {project.date?.en || project.dateKey}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => handleDelete(project.id)}
                                                className="px-4 py-2 bg-red-100 text-red-700 font-bold rounded hover:bg-red-200 transition-colors"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
