import React from 'react';
import { NumberUtil, ObjectUtil, ReactUtil } from '@iamyth/util';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useMainState } from 'module/main/hooks';
import { Box, CircularProgress, useTheme } from '@mui/material';
import type { SearchExchangeRageHostTimeSeriesAJAXResponse } from 'type/api';
import { PriceUtil } from 'util/PriceUtil';

export const Chart = ReactUtil.memo('Chart', () => {
    const chartCurrencyFilter = useMainState((state) => state.chartCurrencyFilter);
    const data = useMainState((state) => state.historicalData);
    const theme = useTheme();

    const tooltipFormatter = (value: number, name: string) => [
        `$${NumberUtil.formatWithComma(NumberUtil.rounding(value, 'round', 2))}`,
        name,
    ];

    if (!data) {
        return (
            <Box sx={{ textAlign: 'center' }}>
                <CircularProgress sx={{ my: 2 }} />
            </Box>
        );
    }

    return (
        <ResponsiveContainer height={400}>
            <LineChart
                data={transformData(data)}
                margin={{
                    top: 16,
                    right: 16,
                    bottom: 0,
                    left: 24,
                }}
            >
                <XAxis
                    type="category"
                    dataKey="date"
                    stroke={theme.palette.text.secondary}
                    style={theme.typography.body2}
                />
                <YAxis
                    type="number"
                    domain={['dataMin - 10000', 'dataMax']}
                    stroke={theme.palette.text.secondary}
                    style={theme.typography.body2}
                    tickCount={8}
                    tickSize={15}
                    tickFormatter={PriceUtil.formatWithSuffix}
                />
                <Tooltip
                    contentStyle={{
                        backgroundColor: theme.palette.grey[800],
                    }}
                    formatter={tooltipFormatter}
                />
                {chartCurrencyFilter.map((currency) => (
                    <Line
                        key={currency}
                        isAnimationActive={false}
                        type="monotone"
                        dataKey={currency}
                        stroke={theme.palette.primary.main}
                        dot={false}
                    />
                ))}
            </LineChart>
        </ResponsiveContainer>
    );
});

function transformData(data: SearchExchangeRageHostTimeSeriesAJAXResponse) {
    return ObjectUtil.toArray(data.rates, (date, rateOfCurrencies) => ({
        ...rateOfCurrencies,
        date,
    }));
}
