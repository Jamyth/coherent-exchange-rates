import React from 'react';
import { ReactUtil } from '@iamyth/util';
import { Typography } from '@mui/material';
import { ArrowDownward, ArrowUpward, HorizontalRule } from '@mui/icons-material';
import type { Variant } from 'util/PriceUtil';

interface Props {
    variant: Variant | null;
    color?: string;
}

export const PriceChangeLabel = ReactUtil.memo('PriceChangeLabel', ({ color, variant }: Props) => {
    if (!variant) {
        return null;
    }

    return (
        <Typography sx={{ color }}>
            {variant === 'growth' && <ArrowUpward />}
            {variant === 'loss' && <ArrowDownward />}
            {variant === 'unchanged' && <HorizontalRule />}
        </Typography>
    );
});
