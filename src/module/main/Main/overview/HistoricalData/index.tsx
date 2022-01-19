import React from 'react';
import { ReactUtil } from '@iamyth/util';
import { Chart } from './Chart';
import { Filter } from './Filter';

export const HistoricalData = ReactUtil.memo('HistoricalData', () => {
    return (
        <React.Fragment>
            <Filter />
            <Chart />
        </React.Fragment>
    );
});
