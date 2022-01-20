import { ajax } from 'react-shiba';
import type {
    SearchExchangeRageHostLatestAJAXResponse,
    SearchExchangeRageHostTimeSeriesAJAXRequest,
    SearchExchangeRageHostTimeSeriesAJAXResponse,
} from 'type/api';

export class ExchangeRateHostAJAXService {
    private static config = { baseURL: 'https://api.exchangerate.host/' };

    static latest(): Promise<SearchExchangeRageHostLatestAJAXResponse> {
        return ajax('GET', '/latest', {}, { base: 'BTC' }, this.config);
    }

    static timeSeries(
        request: SearchExchangeRageHostTimeSeriesAJAXRequest,
    ): Promise<SearchExchangeRageHostTimeSeriesAJAXResponse> {
        return ajax('GET', '/timeseries', {}, request, this.config);
    }
}
