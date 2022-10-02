import { describe, expect, test } from '@jest/globals';
import { isNumeric } from '../../helpers/dataHelper';

describe('isNumeric fn', () => {
  test('is valid return value', () => {
    expect(isNumeric('abcd')).toBe(false);
    expect(isNumeric('123a')).toBe(false);
    expect(isNumeric('')).toBe(false);
    expect(isNumeric(null)).toBe(false);
    expect(isNumeric(undefined)).toBe(false);
    expect(isNumeric('123.4')).toBe(true);
    expect(isNumeric(1)).toBe(true);
    expect(isNumeric(-1)).toBe(true);
    expect(isNumeric('1')).toBe(true);
    expect(isNumeric('-1')).toBe(true);
  })
});
