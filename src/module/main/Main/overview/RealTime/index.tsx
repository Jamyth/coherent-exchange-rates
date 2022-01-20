import React from 'react';
import { ObjectUtil, ReactUtil } from '@iamyth/util';
import { CircularProgress, Grid } from '@mui/material';
import { useMainState } from 'module/main/hooks';
import { CurrencyCard } from './CurrencyCard';

export const RealTime = ReactUtil.memo('RealTime', () => {
    const data = useMainState((state) => state.data);
    const prevData = useMainState((state) => state.prevData);

    return (
        <Grid container spacing={3} sx={{ my: 2 }}>
            {data ? (
                ObjectUtil.toArray(data, (currency, btcInfo) => (
                    <CurrencyCard key={currency} data={btcInfo} currency={currency} prevData={prevData?.[currency]} />
                ))
            ) : (
                <Grid item xs={12} sx={{ textAlign: 'center' }}>
                    <CircularProgress sx={{ my: 2 }} />
                </Grid>
            )}
        </Grid>
    );
});
