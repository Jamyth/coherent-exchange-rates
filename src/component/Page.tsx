import React from 'react';
import { ReactUtil } from '@iamyth/util';
import type { SafeReactChildren } from '@iamyth/util';
import { Paper } from '@mui/material';

export interface Props {
    children: SafeReactChildren;
}

export const Page = ReactUtil.memo('Page', ({ children }: Props) => {
    return (
        <Paper elevation={6} sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
            {children}
        </Paper>
    );
});
