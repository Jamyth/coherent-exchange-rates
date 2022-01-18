import { ErrorHandler } from 'react-shiba';
import type { Exception } from 'react-shiba';

export class GeneralErrorHandler extends ErrorHandler {
    override onError(exception: Exception): void {
        alert(exception);
    }
}
