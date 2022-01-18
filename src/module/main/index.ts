import { Module, register } from 'react-shiba';
import { Main } from './Main';
import type { Path, State } from './type';

const initialState: State = {};

class MainModule extends Module<Path, State> {
    override onEnter(): void {
        // TODO
    }
}

const mainModule = register(new MainModule(null, initialState));
export const useState = mainModule.getState();
export const actions = mainModule.getActions();
export const MainComponent = mainModule.attachLifecycle(Main);
