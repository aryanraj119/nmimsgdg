import http.server
import socketserver
import os

PORT = 8000

class SPAHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Determine filesystem path for requested URL
        path = self.translate_path(self.path)
        # If requested path does not exist and is not a direct file with an extension, fallback to /index.html
        if not os.path.exists(path) and "." not in os.path.basename(self.path):
            self.path = "/index.html"
        return super().do_GET()

if __name__ == "__main__":
    # Allow address reuse
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), SPAHandler) as httpd:
        print(f"Serving SPA HTTP server on port {PORT}...")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            pass
