import React from 'react';
import { DateUtil, EnumUtil, ReactUtil } from '@iamyth/util';
import { Box } from '@mui/material';
import { EnumSelect } from 'component/Select';
import { CurrencyTypeViewV2 } from 'type/api';
import { useMainState } from 'module/main/hooks';
import { actions } from 'module/main';

const dayList = ['1 Day', '7 Day', '30 Day'] as const;

export const Filter = ReactUtil.memo('Filter', () => {
    const { start_date, end_date } = useMainState((state) => state.filter);
    const chartCurrencyFilter = useMainState((state) => state.chartCurrencyFilter);

    const getDayValue = (): typeof dayList[number] => {
        switch (DateUtil.dayDiff(end_date, start_date)) {
            case 1:
                return '1 Day';
            case 7:
                return '7 Day';
            case 30:
                return '30 Day';
            default:
                throw new Error('not supported value');
        }
    };

    const onDayChange = (value: typeof dayList[number]) => {
        const end_date = DateUtil.format(DateUtil.today('day-end'));
        switch (value) {
            case '1 Day': {
                const start_date = DateUtil.format(DateUtil.daysBeforeToday(1, 'day-start'));
                return actions.pushFilterToHistory({ start_date, end_date });
            }
            case '7 Day': {
                const start_date = DateUtil.format(DateUtil.daysBeforeToday(7, 'day-start'));
                return actions.pushFilterToHistory({ start_date, end_date });
            }
            case '30 Day': {
                const start_date = DateUtil.format(DateUtil.daysBeforeToday(30, 'day-start'));
                return actions.pushFilterToHistory({ start_date, end_date });
            }
        }
    };

    return (
        <Box sx={{ textAlign: 'center', mt: 1 }}>
            <EnumSelect
                multiple
                placeholder="Currencies"
                list={EnumUtil.toArray(CurrencyTypeViewV2)}
                value={chartCurrencyFilter}
                onChange={actions.updateChartCurrency}
            />
            <EnumSelect multiple={false} list={dayList as any} value={getDayValue()} onChange={onDayChange} />
        </Box>
    );
});
