import React from 'react';
import { ObjectUtil, ReactUtil } from '@iamyth/util';
import { CircularProgress, Grid } from '@mui/material';
import { useMainState } from 'module/main/hooks';
import { ExchangeRateCard } from 'component/ExchangeRateCard';

export const RealTime = ReactUtil.memo('RealTime', () => {
    const data = useMainState((state) => state.data);
    const prevData = useMainState((state) => state.prevData);

    return (
        <Grid container spacing={3} sx={{ my: 2 }}>
            {data ? (
                ObjectUtil.toArray(data.rates, (currency, btcInfo) => (
                    <ExchangeRateCard
                        key={currency}
                        price={btcInfo}
                        currency={currency}
                        prevPrice={prevData?.rates[currency] ?? null}
                    />
                ))
            ) : (
                <Grid item xs={12} sx={{ textAlign: 'center' }}>
                    <CircularProgress sx={{ my: 2 }} />
                </Grid>
            )}
        </Grid>
    );
});
