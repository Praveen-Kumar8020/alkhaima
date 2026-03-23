"use server";

import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';

const fileLocation = path.join(process.cwd(), 'src', 'data', 'projects.json');

export async function getProjects() {
    try {
        const data = await fs.readFile(fileLocation, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return [];
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

        const ongoingDir = path.join(process.cwd(), 'public', 'ongoing');
        
        try {
            await fs.mkdir(ongoingDir, { recursive: true });
        } catch (e) {}

        const fileName = `${Date.now()}${ext}`;
        const filePath = path.join(ongoingDir, fileName);

        const arrayBuffer = await imageFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        await fs.writeFile(filePath, buffer);

        const publicImagePath = `/ongoing/${fileName}`;

        const projects = await getProjects();
        const newId = projects.length > 0 ? Math.max(...projects.map((p: any) => p.id)) + 1 : 1;

        const newProject = {
            id: newId,
            image: publicImagePath,
            title: { en: titleEn, ar: titleAr },
            location: { en: locationEn, ar: locationAr },
            date: { en: dateEn, ar: dateAr }
        };

        projects.push(newProject);
        
        await fs.writeFile(fileLocation, JSON.stringify(projects, null, 2));

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
        
        // Remove image if it is inside 
        if (project.image && project.image.startsWith('/ongoing/')) {
            const fileName = path.basename(project.image);
            const imagePath = path.join(process.cwd(), 'public', 'ongoing', fileName);
            try {
                await fs.unlink(imagePath);
            } catch (err) {
                console.error("Failed to delete image file:", err);
            }
        }

        projects.splice(projectIndex, 1);
        await fs.writeFile(fileLocation, JSON.stringify(projects, null, 2));

        revalidatePath('/');
        return { success: true };
    } catch (error: any) {
        return { error: error.message };
    }
}

export async function translateToArabic(text: string) {
    if (!text || text.trim() === '') return { text: '' };
    try {
        // Safe, free Translation API
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
