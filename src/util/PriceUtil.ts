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
    const parts = value.toString().split('.');
    const suffixes = ['', 'K', 'M', 'B', 'T'];
    const suffixNum = Math.floor(String(parts[0]).length / 3);
    const shortValue = parseFloat((suffixNum !== 0 ? value / 1000 ** suffixNum : value).toPrecision(2));
    if (shortValue < 1 && suffixNum > 0) {
        return shortValue * 1000 + suffixes[suffixNum - 1];
    }
    if (shortValue % 1 !== 0) {
        return shortValue.toFixed(1) + suffixes[suffixNum];
    }
    return shortValue + suffixes[suffixNum];
}

export const PriceUtil = Object.freeze({
    compare,
    formatWithSuffix,
});
