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

export const PriceUtil = Object.freeze({
    compare,
});
