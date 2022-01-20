import { DateUtil } from '../../src/util/DateUtil';

describe('DateUtil.translateDay', () => {
    type TestEachRowSchema = { input: number; expected: string };
    test.each`
        input | expected
        ${0}  | ${'Sun'}
        ${1}  | ${'Mon'}
        ${2}  | ${'Tue'}
        ${3}  | ${'Wed'}
        ${4}  | ${'Thu'}
        ${5}  | ${'Fri'}
        ${6}  | ${'Sat'}
    `('Expect $expected when input is $input', ({ input, expected }: TestEachRowSchema) => {
        expect(DateUtil.translateDay(input)).toBe(expected);
    });

    test('throws when input > 6 or < 0', () => {
        expect(() => DateUtil.translateDay(-1)).toThrow();
        expect(() => DateUtil.translateDay(7)).toThrow();
    });
});
