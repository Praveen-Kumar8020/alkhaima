"use server";

import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';
import { getStore } from '@netlify/blobs';

const fileLocation = path.join(process.cwd(), 'src', 'data', 'projects.json');

// Check if we are running in a Netlify/AWS serverless environment runtime
// Standard `NETLIFY` env vars are sometimes not exposed properly in the Lambda runtime itself, so we check cwd.
const isNetlify = process.env.NODE_ENV === "production" &&
    (process.cwd().includes('/var/task') || !!process.env.AWS_LAMBDA_FUNCTION_NAME || !!process.env.NETLIFY_SITE_ID);

export async function getProjects() {
    try {
        if (isNetlify) {
            const store = getStore("data");
            const data = await store.get("projects.json", { type: "json" });
            if (data && Array.isArray(data) && data.length > 0) {
                return data;
            }
        }

        // Fallback or local dev read
        const localData = await fs.readFile(fileLocation, 'utf-8');
        return JSON.parse(localData);
    } catch (error) {
        // If everything fails and no file exists
        return [];
    }
}

async function saveProjectsFile(projects: any[]) {
    if (isNetlify) {
        const store = getStore("data");
        await store.setJSON("projects.json", projects);
    } else {
        await fs.writeFile(fileLocation, JSON.stringify(projects, null, 2));
    }
}

async function saveImageFile(imageFile: File, fileName: string): Promise<string> {
    const arrayBuffer = await imageFile.arrayBuffer();

    if (isNetlify) {
        const store = getStore("images");
        await store.set(fileName, arrayBuffer);
        // Serve image from api route
        return `/api/image?id=${fileName}`;
    } else {
        const ongoingDir = path.join(process.cwd(), 'public', 'ongoing');
        try { await fs.mkdir(ongoingDir, { recursive: true }); } catch (e) { }

        const filePath = path.join(ongoingDir, fileName);
        const buffer = Buffer.from(arrayBuffer);
        await fs.writeFile(filePath, buffer);

        return `/ongoing/${fileName}`;
    }
}

async function deleteImageFile(imageUrl: string) {
    if (isNetlify) {
        if (imageUrl.includes('/api/image?id=')) {
            const fileName = imageUrl.split('id=')[1];
            if (fileName) {
                const store = getStore("images");
                await store.delete(fileName);
            }
        }
    } else {
        if (imageUrl.startsWith('/ongoing/')) {
            const fileName = path.basename(imageUrl);
            const imagePath = path.join(process.cwd(), 'public', 'ongoing', fileName);
            try {
                await fs.unlink(imagePath);
            } catch (err) { }
        }
    }
}

export async function addProject(formData: FormData) {
    try {
        const titleEn = formData.get('titleEn') as string;
        const titleAr = formData.get('titleAr') as string;
        const locationEn = formData.get('locationEn') as string;
        const locationAr = formData.get('locationAr') as string;
        const dateEn = formData.get('dateEn') as string;
        const dateAr = formData.get('dateAr') as string;
        const imageFile = formData.get('image') as File;

        if (!imageFile || imageFile.size === 0) {
            return { error: 'Image is required' };
        }

        const ext = path.extname(imageFile.name).toLowerCase();
        const allowedExts = ['.jpg', '.jpeg', '.png'];

        if (!allowedExts.includes(ext)) {
            return { error: 'Invalid file format. Only JPG, JPEG, and PNG are allowed.' };
        }

        const fileName = `${Date.now()}${ext}`;
        const finalImagePath = await saveImageFile(imageFile, fileName);

        const projects = await getProjects();
        const newId = projects.length > 0 ? Math.max(...projects.map((p: any) => p.id)) + 1 : 1;

        const newProject = {
            id: newId,
            image: finalImagePath,
            title: { en: titleEn, ar: titleAr },
            location: { en: locationEn, ar: locationAr },
            date: { en: dateEn, ar: dateAr }
        };

        projects.push(newProject);
        await saveProjectsFile(projects);

        revalidatePath('/');
        return { success: true };
    } catch (error: any) {
        console.error("Failed to add project:", error);
        return { error: error.message };
    }
}

export async function deleteProject(id: number) {
    try {
        const projects = await getProjects();
        const projectIndex = projects.findIndex((p: any) => p.id === id);

        if (projectIndex === -1) {
            return { error: 'Project not found' };
        }

        const project = projects[projectIndex];

        if (project.image) {
            await deleteImageFile(project.image);
        }

        projects.splice(projectIndex, 1);
        await saveProjectsFile(projects);

        revalidatePath('/');
        return { success: true };
    } catch (error: any) {
        return { error: error.message };
    }
}

export async function translateToArabic(text: string) {
    if (!text || text.trim() === '') return { text: '' };
    try {
        const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|ar`);
        const data = await response.json();

        if (data && data.responseData && data.responseData.translatedText) {
            return { text: data.responseData.translatedText };
        }
        return { text: text };
    } catch (err) {
        return { error: 'Failed to translate' };
    }
}
