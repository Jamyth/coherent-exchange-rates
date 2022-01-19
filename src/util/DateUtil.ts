import { DateUtil as IamythDateUtil } from '@iamyth/util';

function translateDay(day: number): string {
    switch (day) {
        case 0:
            return 'Sun';
        case 1:
            return 'Mon';
        case 2:
            return 'Tue';
        case 3:
            return 'Wed';
        case 4:
            return 'Thu';
        case 5:
            return 'Fri';
        case 6:
            return 'Sat';
        default:
            throw new Error('[DateUtil.translateDay] index out of bounce');
    }
}

export const DateUtil = Object.freeze({
    ...IamythDateUtil,
    translateDay,
});
