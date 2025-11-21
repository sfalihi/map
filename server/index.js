const port = Number(process.env.PORT) || 8080;
const host = process.env.HOST || "0.0.0.0";

// Basic function to determine the Content-Type based on file extension.
function getContentType(path) {
  if (path.endsWith(".html")) return "text/html";
  if (path.endsWith(".css")) return "text/css";
  if (path.endsWith(".js")) return "application/javascript";
  if (path.endsWith(".json")) return "application/json";
  if (path.endsWith(".png")) return "image/png";
  if (path.endsWith(".jpg") || path.endsWith(".jpeg")) return "image/jpeg";
  if (path.endsWith(".gif")) return "image/gif";
  if (path.endsWith(".svg")) return "image/svg+xml";
  return "text/plain";
}

Bun.serve({
  hostname: host,
  port,
  fetch(request) {
    const url = new URL(request.url);
    let pathname = url.pathname;

    // Default to index.html if the root is requested.
    if (pathname === "/") {
      pathname = "/index.html";
    }

    // Map the request path to the file in the public folder.
    const filePath = `./public${pathname}`;

    try {
      const file = Bun.file(filePath);
      return new Response(file, {
        headers: { "Content-Type": getContentType(filePath) },
      });
    } catch (error) {
      return new Response("Not Found", { status: 404 });
    }
  },
});

console.log(`Server ready at http://${host}:${port}`);
