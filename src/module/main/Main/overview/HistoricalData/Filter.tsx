import React from 'react';
import { DateUtil, EnumUtil, ReactUtil } from '@iamyth/util';
import { Box } from '@mui/material';
import { EnumSelect } from 'component/Select';
import { CurrencyTypeView } from 'type/api';
import { useMainState } from 'module/main/hooks';
import { actions } from 'module/main';

const scaleList = [900, 3600, 7200];
const translator = (value: number): string => {
    switch (value) {
        case 900:
            return '1 Day';
        case 3600:
            return '7 Day';
        case 7200:
            return '30 Day';
        default:
            throw new Error('Unsupported Time Range');
    }
};

export const Filter = ReactUtil.memo('Filter', () => {
    const { quote, scale } = useMainState((state) => state.filter);

    const onScaleChange = (scale: number) => {
        switch (scale) {
            case 900: {
                const start = DateUtil.daysBeforeToday(1, 'day-start').getTime() / 1000;
                return actions.pushFilterToHistory({ scale, start });
            }
            case 3600: {
                const start = DateUtil.daysBeforeToday(7, 'day-start').getTime() / 1000;
                return actions.pushFilterToHistory({ scale, start });
            }
            case 7200: {
                const start = DateUtil.daysBeforeToday(30, 'day-start').getTime() / 1000;
                return actions.pushFilterToHistory({ scale, start });
            }
        }
    };

    return (
        <Box sx={{ textAlign: 'center', mt: 1 }}>
            <EnumSelect
                list={EnumUtil.toArray(CurrencyTypeView)}
                value={quote}
                onChange={(quote) => actions.pushFilterToHistory({ quote })}
            />
            <EnumSelect translator={translator} list={scaleList} value={scale} onChange={onScaleChange} />
        </Box>
    );
});
