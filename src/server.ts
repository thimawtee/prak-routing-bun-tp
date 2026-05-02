const PORT = 3001;

// Data statis
const users = [
    { id: 1, name: "Timothy", email: "timothy@mail.com" },
    { id: 2, name: "Alicia", email: "alicia@mail.com" },
    { id: 3, name: "Rafael", email: "rafael@mail.com" },
];

const products = [
    { id: 1, name: "Laptop" },
    { id: 2, name: "Mouse" },
];

// Middleware sederhana: logging + hitung durasi request
function logRequest(method: string, path: string, startTime: number): void {
    const duration = Date.now() - startTime;

    console.log(
        `[${new Date().toLocaleTimeString()}] ${method} ${path} - ${duration}ms`
    );
}

const server = Bun.serve({
    port: PORT,

    fetch(request) {
        const startTime = Date.now();

        const url = new URL(request.url);
        const path = url.pathname;
        const method = request.method;

        let response: Response;

        // GET /
        if (path === '/' && method === 'GET') {
            response = new Response(
                JSON.stringify({
                    message: "Selamat datang di halaman Home Bun"
                }),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

        // GET /about
        } else if (path === '/about' && method === 'GET') {
            response = new Response(
                JSON.stringify({
                    message: "Halaman About Bun"
                }),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

        // GET /products
        } else if (path === '/products' && method === 'GET') {
            response = new Response(
                JSON.stringify(products),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

        // POST /products
        } else if (path === '/products' && method === 'POST') {
            response = new Response(
                JSON.stringify({
                    message: "Produk berhasil ditambahkan (simulasi Bun)"
                }),
                {
                    status: 201,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

        // GET /users
        } else if (path === '/users' && method === 'GET') {
            response = new Response(
                JSON.stringify(users),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

        // GET /users/:id
        } else if (path.startsWith('/users/') && method === 'GET') {
            const id = parseInt(path.split('/')[2] ?? '0');

            const user = users.find((u) => u.id === id);

            if (user) {
                response = new Response(
                    JSON.stringify(user),
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                );

            } else {
                response = new Response(
                    JSON.stringify({
                        message: `User dengan ID ${id} tidak ditemukan`
                    }),
                    {
                        status: 404,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                );
            }

        // Route tidak ditemukan
        } else {
            response = new Response(
                JSON.stringify({
                    message: "Route tidak ditemukan"
                }),
                {
                    status: 404,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
        }

        // Middleware logging
        logRequest(method, path, startTime);

        return response;
    }
});

console.log(`🚀 Server Bun berjalan di http://localhost:${server.port}`);