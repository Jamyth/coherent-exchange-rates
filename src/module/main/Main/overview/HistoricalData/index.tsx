import React from 'react';
import { ReactUtil } from '@iamyth/util';
import { Chart } from './Chart';
import { Filter } from './Filter';
import { AverageData } from './AverageData';
import { useMainState } from 'module/main/hooks';

export const HistoricalData = ReactUtil.memo('HistoricalData', () => {
    const data = useMainState((state) => state.historicalData);

    return (
        <React.Fragment>
            <Filter />
            <Chart />
            {data && <AverageData />}
        </React.Fragment>
    );
});
