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
    const parts = NumberUtil.formatWithComma(value).split('.');

    if (!value) {
        return <span>-</span>;
    }

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
