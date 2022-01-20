import { Module, register, Interval, Loading } from 'react-shiba';
import { Main } from './Main';
import { ExchangeRateHostAJAXService } from 'util/service/ExchangeRateHostAJAXService';
import { DateUtil, ObjectUtil } from '@iamyth/util';
import { CurrencyTypeViewV2 } from 'type/api';
import type { Location } from 'react-shiba';
import type { Path, State, Tab } from './type';
import type { SearchExchangeRageHostTimeSeriesAJAXRequest } from 'type/api';

const getInitialFilter = (): SearchExchangeRageHostTimeSeriesAJAXRequest => ({
    start_date: DateUtil.format(DateUtil.daysBeforeToday(1, 'day-start')),
    end_date: DateUtil.format(DateUtil.today('day-end')),
});

const initialState: State = {
    tab: 'real-time',
    filter: getInitialFilter(),
    chartCurrencyFilter: [CurrencyTypeViewV2.USD, CurrencyTypeViewV2.HKD],
    historicalData: null,
    data: null,
    prevData: null,
};

class MainModule extends Module<Path, State, SearchExchangeRageHostTimeSeriesAJAXRequest> {
    override async onLocationMatched(
        routeParams: object,
        location: Location<SearchExchangeRageHostTimeSeriesAJAXRequest>,
    ) {
        const filter = location.state || getInitialFilter();

        this.updateFilter(filter);

        await this.fetchHistoryData();
    }

    @Interval(60) // This will fire every 60 seconds
    override async onTick() {
        await this.fetchRealTimeData();
    }

    updateFilter(filter: Partial<SearchExchangeRageHostTimeSeriesAJAXRequest>) {
        this.setState((state) => ObjectUtil.safeAssign(state.filter, filter));
    }

    pushFilterToHistory(filter: Partial<SearchExchangeRageHostTimeSeriesAJAXRequest> = {}) {
        this.pushHistory({
            ...this.state.filter,
            ...filter,
        });
    }

    changeTab(tab: Tab) {
        this.setState({ tab });
    }

    updateChartCurrency(currencies: CurrencyTypeViewV2[]) {
        this.setState({ chartCurrencyFilter: currencies });
    }

    @Loading('real-time')
    private async fetchRealTimeData() {
        const data = await ExchangeRateHostAJAXService.latest();

        this.setState((state) => {
            state.prevData = state.data;
            state.data = data;
        });
    }

    @Loading('chart')
    private async fetchHistoryData() {
        const data = await ExchangeRateHostAJAXService.timeSeries(this.state.filter);
        this.setState((state) => (state.historicalData = data));
    }
}

const mainModule = register(new MainModule('/', initialState));
export const useState = mainModule.getState();
export const actions = mainModule.getActions();
export const MainComponent = mainModule.attachLifecycle(Main);
