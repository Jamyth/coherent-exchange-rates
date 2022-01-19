import React from 'react';
import { ReactUtil, usePrevious } from '@iamyth/util';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import { PriceUtil } from 'util/PriceUtil';
import { DataRow } from './DataRow';
import { Amount } from 'component/Amount';
import { PriceChangeLabel } from './PriceChangeLabel';
import type { BTCCurrencyAJAXView, CurrencyTypeView } from 'type/api';

interface Props {
    currency: CurrencyTypeView;
    data: BTCCurrencyAJAXView;
    prevData: BTCCurrencyAJAXView | undefined;
}

export const CurrencyCard = ReactUtil.memo('CurrencyCard', ({ currency, data, prevData }: Props) => {
    const [animationStart, setAnimationStart] = React.useState(false);
    const priceVariant = PriceUtil.compare(data.last, prevData?.last);
    const prevVariant = usePrevious(priceVariant);

    const getColor = (opacity: number = 1): string | undefined => {
        switch (priceVariant) {
            case 'growth':
                return `rgba(30, 160, 117, ${opacity})`;
            case 'loss':
                return `rgba(255, 82, 67, ${opacity})`;
            case 'unchanged':
                return `rgba(251, 192, 45, ${opacity})`;
            case null:
                return undefined;
        }
    };

    React.useEffect(() => {
        if (priceVariant !== prevVariant) {
            setAnimationStart(true);
        }
    }, [prevVariant, priceVariant]);

    return (
        <Grid key={currency} item xs={6} md={4}>
            <Card
                variant="outlined"
                sx={{
                    backgroundColor: animationStart ? getColor(0.2) : '#121212',
                    transition: 'background-color 0.3s ease',
                }}
                onTransitionEnd={() => setAnimationStart(false)}
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
