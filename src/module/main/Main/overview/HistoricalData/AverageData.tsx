import React from 'react';
import { ArrayUtil, ReactUtil } from '@iamyth/util';
import { useMainState } from 'module/main/hooks';
import { Grid, Typography } from '@mui/material';
import { ExchangeRateCard } from 'component/ExchangeRateCard';
import { DateUtil } from 'util/DateUtil';

export const AverageData = ReactUtil.memo('AverageData', () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- parent Checked
    const data = useMainState((state) => state.historicalData!);
    const currencies = useMainState((state) => state.chartCurrencyFilter);
    const rateList = Object.values(data.rates);
    const { start_date, end_date } = useMainState((state) => state.filter);
    const dayDiff = DateUtil.dayDiff(end_date, start_date);

    return (
        <Grid container spacing={3} sx={{ my: 2 }}>
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
                <Typography component="h3" variant="h5">
                    Average Price of past {dayDiff} days
                </Typography>
            </Grid>
            {currencies.map((currency) => {
                const rates = ArrayUtil.sumByKey(rateList, currency) / rateList.length;

                return <ExchangeRateCard key={currency} price={rates} currency={currency} />;
            })}
        </Grid>
    );
});
