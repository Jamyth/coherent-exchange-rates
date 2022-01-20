import { PriceUtil } from '../../src/util/PriceUtil';
import type { Variant } from '../../src/util/PriceUtil';

describe('PriceUtil.compare', () => {
    type TestEachRowSchema = { current: number; previous: number | undefined; expected: Variant | null };
    test.each`
        current | previous     | expected
        ${0}    | ${undefined} | ${null}
        ${0}    | ${10}        | ${'loss'}
        ${0}    | ${-10}       | ${'growth'}
        ${10}   | ${-10}       | ${'growth'}
        ${100}  | ${100}       | ${'unchanged'}
    `(
        'Expect compare current $current and previous $previous , will result in $expected',
        ({ current, previous, expected }: TestEachRowSchema) => {
            expect(PriceUtil.compare(current, previous)).toBe(expected);
        },
    );
});

describe('PriceUtil.formatWithSuffix', () => {
    type TestEachRowSchema = { input: number | null; expected: string };
    test.each`
        input          | expected
        ${null}        | ${'-'}
        ${0}           | ${'0'}
        ${12}          | ${'12'}
        ${123}         | ${'123'}
        ${1234}        | ${'1.2K'}
        ${12345}       | ${'12.3K'}
        ${123456}      | ${'123.4K'}
        ${1234567}     | ${'1.2M'}
        ${12345678}    | ${'12.3M'}
        ${123456789}   | ${'123.4M'}
        ${1234567899}  | ${'1.2B'}
        ${12345678999} | ${'12.3B'}
    `('expect input $input to be $expected', ({ input, expected }: TestEachRowSchema) => {
        expect(PriceUtil.formatWithSuffix(input)).toBe(expected);
    });
});
