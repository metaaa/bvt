import { describe, expect, test } from '@jest/globals';
import { sortDataByPos } from '../../helpers/dataHelper';

const mockData = [
  {
    id: 1,
    pos: 3,
  },
  {
    id: 2,
    pos: 6,
  },
  {
    id: 3,
    pos: 1,
  },
];

describe('sortDataByPos fn', () => {
  test('test sorting', () => {
    expect(sortDataByPos(mockData)[0].pos).toBe(1);
    expect(sortDataByPos(mockData)[1].pos).toBe(3);
    expect(sortDataByPos(mockData)[2].pos).toBe(6);
  })
});
