import { serve } from "bun";

const PORT = 3000;

const server = serve({
    port: PORT,
    fetch(req) {
        const { method, url, headers } = req;
        console.log(`[${new Date().toISOString()}] ${method} ${url}`);
        console.log("Headers:", Object.fromEntries(headers.entries()));

        // Respond with a simple message
        return new Response("Logging server is running!", {
            status: 200,
            headers: { "Content-Type": "text/plain" },
        });
    },
});

console.log(`Logging server is running on http://localhost:${PORT}`);