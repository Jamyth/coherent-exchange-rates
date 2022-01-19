import React from 'react';
import { ReactUtil } from '@iamyth/util';
import { Box, Container, Toolbar } from '@mui/material';
import { AppBar } from './AppBar';
import type { SafeReactChildren } from '@iamyth/util';

export interface Props {
    children: SafeReactChildren;
}

export const Layout = ReactUtil.memo('Layout', ({ children }: Props) => {
    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar />
            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) => theme.palette.grey[theme.palette.mode === 'light' ? 100 : 900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                <Toolbar />
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    {children}
                </Container>
            </Box>
        </Box>
    );
});
