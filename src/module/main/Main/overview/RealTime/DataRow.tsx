import React from 'react';
import { ReactUtil } from '@iamyth/util';
import type { SafeReactChild, SafeReactChildren } from '@iamyth/util';
import { Box } from '@mui/material';

interface Props {
    label: SafeReactChild;
    children: SafeReactChildren;
}

export const DataRow = ReactUtil.memo('DataRow', ({ label, children }: Props) => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                pb: 1,
            }}
        >
            {label}
            <Box>{children}</Box>
        </Box>
    );
});
