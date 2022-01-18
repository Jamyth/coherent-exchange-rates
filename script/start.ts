import path from 'path';
import { createServer } from 'vite';

async function start() {
    const server = await createServer({
        configFile: path.join(__dirname, '../config/vite.config.ts'),
        server: {
            port: 8080,
            // https: true,
            host: '0.0.0.0',
        },
    });

    await server.listen();

    server.printUrls();
}

start();
