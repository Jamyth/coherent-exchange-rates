import type {
    SearchBTCExchangeRateAJAXResponse,
    SearchBTCExchangeRateHistoryAJAXRequest,
    SearchBTCExchangeRateHistoryAJAXResponse,
} from 'type/api';

export type Path = '/';

export interface State {
    tab: Tab;
    filter: SearchBTCExchangeRateHistoryAJAXRequest;
    historicalData: SearchBTCExchangeRateHistoryAJAXResponse | null;
    data: SearchBTCExchangeRateAJAXResponse | null;
    prevData: SearchBTCExchangeRateAJAXResponse | null;
}

export type Tab = 'real-time' | 'historical';
