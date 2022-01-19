export enum CurrencyTypeView {
    AUD = 'AUD',
    BRL = 'BRL',
    CAD = 'CAD',
    CHF = 'CHF',
    CLP = 'CLP',
    CNY = 'CNY',
    CZK = 'CZK',
    DKK = 'DKK',
    EUR = 'EUR',
    GBP = 'GBP',
    HKD = 'HKD',
    HRK = 'HRK',
    HUF = 'HUF',
    INR = 'INR',
    ISK = 'ISK',
    JPY = 'JPY',
    KRW = 'KRW',
    NZD = 'NZD',
    PLN = 'PLN',
    RON = 'RON',
    RUB = 'RUB',
    SEK = 'SEK',
    SGD = 'SGD',
    THB = 'THB',
    TRY = 'TRY',
    TWD = 'TWD',
    USD = 'USD',
}

export interface BTCCurrencyAJAXView {
    '15m': number;
    last: number;
    buy: number;
    sell: number;
    symbol: string;
}

export type SearchBTCExchangeRateAJAXResponse = Record<CurrencyTypeView, BTCCurrencyAJAXView>;

export interface SearchBTCExchangeRateHistoryAJAXRequest {
    base: 'BTC';
    quote: CurrencyTypeView;
    start: number;
    scale: number;
    cors: boolean;
}

export type SearchBTCExchangeRateHistoryAJAXResponse = {
    timestamp: number;
    price: number;
    volume24h: number;
}[];
