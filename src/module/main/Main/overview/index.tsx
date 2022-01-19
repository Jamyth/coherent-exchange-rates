import React from 'react';
import { ReactUtil } from '@iamyth/util';
import { Page } from 'component/Page';
import { TypedTabs } from 'component/TypedTabs';
import { useMainState } from '../../hooks';
import { actions } from 'module/main';
import { RealTime } from './RealTime';
import { HistoricalData } from './HistoricalData';
import type { TypedTabMap } from 'component/TypedTabs';
import type { Tab } from 'module/main/type';

export const Overview = ReactUtil.memo('Overview', () => {
    const activeKey = useMainState((state) => state.tab);

    const tabMap: TypedTabMap<Tab> = {
        'real-time': {
            title: 'Real-Time Rate',
            content: <RealTime />,
        },
        historical: {
            title: 'Historical Data',
            content: <HistoricalData />,
        },
    };

    return (
        <Page>
            <TypedTabs activeKey={activeKey} onChange={actions.changeTab} tabMap={tabMap} />
        </Page>
    );
});
