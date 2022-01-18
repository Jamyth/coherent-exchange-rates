import { ajax } from 'react-shiba';
import type {
    SearchBTCExchangeRateAJAXResponse,
    SearchBTCExchangeRateHistoryAJAXRequest,
    SearchBTCExchangeRateHistoryAJAXResponse,
} from 'type/api';

const REAL_TIME_ENDPOINT: string = 'https://blockchain.info/ticker';
const HISTORICAL_ENDPOINT: string = 'https://api.blockchain.info/price/index-series';

export class BTCExchangeRateAJAXService {
    static search(): Promise<SearchBTCExchangeRateAJAXResponse> {
        return ajax('GET', REAL_TIME_ENDPOINT, {}, null);
    }

    static history(
        request: SearchBTCExchangeRateHistoryAJAXRequest,
    ): Promise<SearchBTCExchangeRateHistoryAJAXResponse> {
        return ajax('GET', HISTORICAL_ENDPOINT, {}, request);
    }
}
