import type {
    CurrencyTypeViewV2,
    SearchExchangeRageHostLatestAJAXResponse,
    SearchExchangeRageHostTimeSeriesAJAXRequest,
    SearchExchangeRageHostTimeSeriesAJAXResponse,
} from 'type/api';

export type Path = '/';

export interface State {
    tab: Tab;
    filter: SearchExchangeRageHostTimeSeriesAJAXRequest;
    chartCurrencyFilter: CurrencyTypeViewV2[];
    historicalData: SearchExchangeRageHostTimeSeriesAJAXResponse | null;
    data: SearchExchangeRageHostLatestAJAXResponse | null;
    prevData: SearchExchangeRageHostLatestAJAXResponse | null;
}

export type Tab = 'real-time' | 'historical';
