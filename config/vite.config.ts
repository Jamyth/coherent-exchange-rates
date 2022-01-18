import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// eslint-disable-next-line import/no-default-export -- vite convention
export default defineConfig({
    root: path.join(__dirname, '../src'),
    build: {
        outDir: path.join(__dirname, '../build'),
    },
    publicDir: path.join(__dirname, '../static'),
    plugins: [
        react({
            babel: {
                plugins: [
                    ['@babel/plugin-proposal-decorators', { legacy: true }],
                    ['@babel/plugin-proposal-class-properties', { loose: true }],
                ],
            },
        }),
        tsconfigPaths({
            projects: [path.join(__dirname, '../config/tsconfig.src.json')],
        }),
    ],
    resolve: {
        alias: [
            {
                find: 'css/',
                replacement: path.join(__dirname, '../src/css/'),
            },
        ],
    },
});
