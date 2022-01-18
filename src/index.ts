import { createApp, async } from 'react-shiba';
import { GeneralErrorHandler } from 'util/GeneralErrorHandler';

createApp({
    entryElement: document.getElementById('app'),
    Component: async(() => import('module/main'), 'MainComponent'),
    errorHandler: new GeneralErrorHandler(),
});
