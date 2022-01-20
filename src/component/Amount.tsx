import React from 'react';
import { NumberUtil, ReactUtil } from '@iamyth/util';
import { Typography } from '@mui/material';

export type Color = 'red' | 'green' | 'yellow' | 'default';

export interface Props {
    value: number | null;
    color?: string;
    precision?: number;
}

export const Amount = ReactUtil.memo('Amount', ({ color, value, precision = 2 }: Props) => {
    const endingZero = (value: string, padding: number) => value.padEnd(padding, '0');

    if (!value) {
        return <span>-</span>;
    }

    const roundedValue = NumberUtil.roundingToString(value, 'round', precision);
    const parts = roundedValue.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return (
        <Typography sx={{ color }}>
            ${parts[0]}
            {parts[1] && (
                <React.Fragment>
                    .<small>{endingZero(parts[1], precision)}</small>
                </React.Fragment>
            )}
        </Typography>
    );
});
