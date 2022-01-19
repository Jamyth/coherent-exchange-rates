import React from 'react';
import { ReactUtil } from '@iamyth/util';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import { PriceUtil } from 'util/PriceUtil';
import { DataRow } from './DataRow';
import { Amount } from 'component/Amount';
import { PriceChangeLabel } from './PriceChangeLabel';
import { useLoading } from 'react-shiba';
import type { BTCCurrencyAJAXView, CurrencyTypeView } from 'type/api';

interface Props {
    currency: CurrencyTypeView;
    data: BTCCurrencyAJAXView;
    prevData: BTCCurrencyAJAXView | undefined;
}

export const CurrencyCard = ReactUtil.memo('CurrencyCard', ({ currency, data, prevData }: Props) => {
    const priceVariant = PriceUtil.compare(data.last, prevData?.last);
    const loading = useLoading('real-time');

    const getColor = (): string | undefined => {
        switch (priceVariant) {
            case 'growth':
                return '#1ea075';
            case 'loss':
                return '#ff5243';
            case 'unchanged':
                return '#fbc02d';
            case null:
                return undefined;
        }
    };

    return (
        <Grid key={currency} item xs={6} md={4}>
            <Card
                variant="outlined"
                sx={{
                    backgroundColor: loading ? 'rgba(255,255,255,0.2)' : '#121212',
                    transition: 'background-color 0.3s ease',
                }}
            >
                <CardContent>
                    <DataRow
                        label={
                            <Typography component="h1" variant="h4" color={getColor()}>
                                {currency}
                            </Typography>
                        }
                    >
                        <PriceChangeLabel variant={priceVariant} color={getColor()} />
                    </DataRow>
                    <DataRow label="Exchange Rate:">
                        <Amount color={getColor()} value={data.last} />
                    </DataRow>
                    <DataRow label="Buy:">
                        <Amount color={getColor()} value={data.buy} />
                    </DataRow>
                    <DataRow label="Sell:">
                        <Amount color={getColor()} value={data.sell} />
                    </DataRow>
                </CardContent>
            </Card>
        </Grid>
    );
});
