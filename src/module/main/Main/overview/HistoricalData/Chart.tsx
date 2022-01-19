import React from 'react';
import { NumberUtil, ReactUtil } from '@iamyth/util';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useMainState } from 'module/main/hooks';
import { Box, CircularProgress, useTheme } from '@mui/material';
import type { SearchBTCExchangeRateHistoryAJAXResponse } from 'type/api';
import { PriceUtil } from 'util/PriceUtil';
import { DateUtil } from 'util/DateUtil';

export const Chart = ReactUtil.memo('Chart', () => {
    const { quote, scale } = useMainState((state) => state.filter);
    const data = useMainState((state) => state.historicalData);
    const theme = useTheme();

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
                data={transformData(data, scale)}
                margin={{
                    top: 16,
                    right: 16,
                    bottom: 0,
                    left: 0,
                }}
            >
                <XAxis
                    type="category"
                    dataKey="time"
                    stroke={theme.palette.text.secondary}
                    style={theme.typography.body2}
                    tickFormatter={(_) => (scale === 900 ? _ : _.split(' ')[0])}
                />
                <YAxis
                    type="number"
                    domain={['dataMin - 10000', 'dataMax']}
                    stroke={theme.palette.text.secondary}
                    style={theme.typography.body2}
                    tickCount={8}
                    tickSize={15}
                    tickFormatter={(_) => `${quote} ${PriceUtil.formatWithSuffix(_)}`}
                />
                <Tooltip
                    contentStyle={{
                        backgroundColor: theme.palette.grey[800],
                    }}
                    formatter={(value: number, name: string) => [`$${NumberUtil.formatWithComma(value)}`, 'Price']}
                />
                <Line
                    isAnimationActive={false}
                    type="monotone"
                    dataKey="price"
                    stroke={theme.palette.primary.main}
                    dot={false}
                />
            </LineChart>
        </ResponsiveContainer>
    );
});

function transformData(data: SearchBTCExchangeRateHistoryAJAXResponse, scale: number) {
    const getTime = (date: Date) => {
        const hours = date.getHours();

        if (scale === 900) {
            if (hours === 0) {
                return `${DateUtil.translateDay(date.getDay())} ${date.getDate()}`;
            }
            return `${(hours % 12 || 12).toString().padStart(2, '0')} ${hours > 11 ? 'PM' : 'AM'}`;
        }
        return DateUtil.format(date, 'with-time');
    };

    return data.map((_) => ({
        ..._,
        time: getTime(new Date(_.timestamp * 1000)),
    }));
}
