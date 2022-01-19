import { Module, register, Interval, Loading } from 'react-shiba';
import { Main } from './Main';
import { BTCExchangeRateAJAXService } from 'util/service/BTCExchangeRateAJAXService';
import { DateUtil, ObjectUtil } from '@iamyth/util';
import { CurrencyTypeView } from 'type/api';
import type { Location } from 'react-shiba';
import type { Path, State, Tab } from './type';
import type { SearchBTCExchangeRateHistoryAJAXRequest } from 'type/api';

const getInitialFilter = (): SearchBTCExchangeRateHistoryAJAXRequest => ({
    base: 'BTC',
    quote: CurrencyTypeView.HKD,
    start: DateUtil.daysBeforeToday(1, 'day-start').getTime() / 1000,
    scale: 900,
    cors: true,
});

const initialState: State = {
    tab: 'real-time',
    filter: getInitialFilter(),
    historicalData: [],
    data: null,
};

class MainModule extends Module<Path, State, SearchBTCExchangeRateHistoryAJAXRequest> {
    override async onLocationMatched(routeParams: object, location: Location<SearchBTCExchangeRateHistoryAJAXRequest>) {
        const filter = location.state || getInitialFilter();

        this.updateFilter(filter);

        await this.fetchHistoryData();
    }

    @Interval(60) // This will fire every 60 seconds
    override async onTick() {
        await this.fetchRealTimeData();
    }

    updateFilter(filter: Partial<SearchBTCExchangeRateHistoryAJAXRequest>) {
        this.setState((state) => ObjectUtil.safeAssign(state.filter, filter));
    }

    pushFilterToHistory(filter: Partial<SearchBTCExchangeRateHistoryAJAXRequest> = {}) {
        this.pushHistory({
            ...this.state.filter,
            ...filter,
        });
    }

    changeTab(tab: Tab) {
        this.setState({ tab });
    }

    @Loading('real-time')
    private async fetchRealTimeData() {
        const data = await BTCExchangeRateAJAXService.search();
        this.setState({ data });
    }

    @Loading('chart')
    private async fetchHistoryData() {
        const data = await BTCExchangeRateAJAXService.history(this.state.filter);
        this.setState((state) => (state.historicalData = data));
    }
}

const mainModule = register(new MainModule('/', initialState));
export const useState = mainModule.getState();
export const actions = mainModule.getActions();
export const MainComponent = mainModule.attachLifecycle(Main);
