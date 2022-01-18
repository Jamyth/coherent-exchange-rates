import path from 'path';
import { build } from 'vite';
import fs from 'fs';

if (fs.existsSync(path.join(__dirname, '../build'))) {
    fs.rmSync(path.join(__dirname, '../build'), { recursive: true });
}

build({
    configFile: path.join(__dirname, '../config/vite.config.ts'),
});
