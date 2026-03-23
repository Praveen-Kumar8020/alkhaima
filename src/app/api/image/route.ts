import { getStore } from "@netlify/blobs";

export const runtime = "edge";

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const id = url.searchParams.get('id');

        if (!id) {
            return new Response("Missing id", { status: 400 });
        }

        const store = getStore("images");
        const blob = await store.get(id, { type: "blob" });

        if (!blob) {
            return new Response("Not found", { status: 404 });
        }

        // Determine content type based on extension
        let contentType = "image/jpeg";
        if (id.toLowerCase().endsWith(".png")) contentType = "image/png";
        else if (id.toLowerCase().endsWith(".webp")) contentType = "image/webp";

        return new Response(blob, {
            headers: {
                "Content-Type": contentType,
                "Cache-Control": "public, max-age=31536000, immutable" // aggressively cache
            }
        });
    } catch (e) {
        return new Response("Internal Server Error", { status: 500 });
    }
}
