export type Variant = 'unchanged' | 'growth' | 'loss';

function compare(current: number, previous: number | undefined): Variant | null {
    if (previous === undefined) {
        return null;
    }
    if (current === previous) {
        return 'unchanged';
    }
    if (current > previous) {
        return 'growth';
    }
    return 'loss';
}

function formatWithSuffix(value: number | null): string {
    if (value === null) {
        return '-';
    }
    const _value = Math.floor(value);
    if (_value < 1000) {
        return _value.toString();
    }
    const suffixes = ['', 'K', 'M', 'B', 'T'];
    const stringifiedValue = _value.toString();
    const suffixIndex = Math.floor(stringifiedValue.length / 3);
    const shortenedValue = _value / 1000 ** suffixIndex;

    if (shortenedValue > 1) {
        const scaled = Math.floor(shortenedValue * 10) / 10;
        return scaled + suffixes[suffixIndex];
    } else {
        /**
         * 123456789 will result in 0.1B, but this is not good while displaying data
         * change it to 123.4M is better
         */
        const scaled = Math.floor(shortenedValue * 1000 * 10) / 10;
        return scaled + suffixes[suffixIndex - 1];
    }
}

export const PriceUtil = Object.freeze({
    compare,
    formatWithSuffix,
});
