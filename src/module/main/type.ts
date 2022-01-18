import type {
    SearchBTCExchangeRateAJAXResponse,
    SearchBTCExchangeRateHistoryAJAXRequest,
    SearchBTCExchangeRateHistoryAJAXResponse,
} from 'type/api';

export type Path = '/';

export interface State {
    filter: SearchBTCExchangeRateHistoryAJAXRequest;
    historicalData: SearchBTCExchangeRateHistoryAJAXResponse | null;
    data: SearchBTCExchangeRateAJAXResponse | null;
}
