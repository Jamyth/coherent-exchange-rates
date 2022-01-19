import React from 'react';
import { ReactUtil } from '@iamyth/util';
import { AppBar as MuiAppBar, Toolbar, Typography } from '@mui/material';

export const AppBar = ReactUtil.memo('AppBar', () => {
    return (
        <MuiAppBar position="absolute">
            <Toolbar>
                <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                    Crypto-Exchange-Rate
                </Typography>
            </Toolbar>
        </MuiAppBar>
    );
});
