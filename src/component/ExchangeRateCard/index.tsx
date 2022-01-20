import React from 'react';
import { ReactUtil, usePrevious } from '@iamyth/util';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import { PriceUtil } from 'util/PriceUtil';
import { DataRow } from './DataRow';
import { Amount } from 'component/Amount';
import { PriceChangeLabel } from './PriceChangeLabel';
import type { CurrencyTypeViewV2 } from 'type/api';

interface Props {
    currency: CurrencyTypeViewV2;
    price: number;
    prevPrice?: number | null;
}

export const ExchangeRateCard = ReactUtil.memo('ExchangeRateCard', ({ currency, price, prevPrice }: Props) => {
    const [animationStart, setAnimationStart] = React.useState(false);
    const priceVariant = React.useMemo(() => PriceUtil.compare(price, prevPrice ?? undefined), [price, prevPrice]);
    const prevVariant = usePrevious(priceVariant);

    const getColor = React.useCallback(
        (opacity: number = 1): string | undefined => {
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
        },
        [priceVariant],
    );

    React.useEffect(() => {
        if (priceVariant !== prevVariant) {
            setAnimationStart(true);
        }
    }, [prevVariant, priceVariant]);

    return (
        <Grid key={currency} item xs={12} md={4}>
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
                        <Amount color={getColor()} value={price} />
                    </DataRow>
                    {prevPrice !== undefined && (
                        <DataRow label="Last Exchange Rate:">
                            <Amount value={prevPrice} />
                        </DataRow>
                    )}
                </CardContent>
            </Card>
        </Grid>
    );
});
