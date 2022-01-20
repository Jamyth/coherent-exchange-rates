import React from 'react';
import { ReactUtil } from '@iamyth/util';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { Layout } from 'component/Layout';
import { async } from 'react-shiba';

const Overview = async(() => import('./overview'), 'Overview');

const theme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export const Main = ReactUtil.memo('Main', () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Layout>
                <Overview />
            </Layout>
        </ThemeProvider>
    );
});
