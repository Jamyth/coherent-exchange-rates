import { ajax } from 'react-shiba';
import type {
    SearchBTCExchangeRateAJAXResponse,
    SearchBTCExchangeRateHistoryAJAXRequest,
    SearchBTCExchangeRateHistoryAJAXResponse,
} from 'type/api';

export class BTCExchangeRateAJAXService {
    static search(): Promise<SearchBTCExchangeRateAJAXResponse> {
        return ajax('GET', '/ticker', {}, null, { baseURL: 'https://blockchain.info' });
    }

    static history(
        request: SearchBTCExchangeRateHistoryAJAXRequest,
    ): Promise<SearchBTCExchangeRateHistoryAJAXResponse> {
        return ajax('GET', '/price/index-series', {}, request, { baseURL: 'https://api.blockchain.info' });
    }
}
