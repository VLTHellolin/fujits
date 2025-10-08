import { describe, expect, it } from 'vitest';
import { chunk } from './chunk';

describe('chunk', () => {
  it('should split array into chunks of specified size', () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
    expect(chunk(['a', 'b', 'c', 'd'], 3)).toEqual([['a', 'b', 'c'], ['d']]);
    expect(chunk([], 2)).toEqual([]);
    expect(chunk([1, 2, 3], 1)).toEqual([[1], [2], [3]]);
  });

  it('should throw if chunk size is not an integer', () => {
    expect(() => chunk([1, 2, 3], 0.5)).toThrow('Chunk size must be an integer');
    expect(() => chunk([1, 2, 3], NaN)).toThrow('Chunk size must be an integer');
  });

  it('should throw if chunk size is less than 1', () => {
    expect(() => chunk([1, 2, 3], 0)).toThrow('Chunk size must be greater than 0');
    expect(() => chunk([1, 2, 3], -1)).toThrow('Chunk size must be greater than 0');
  });

  it('should return the whole array as a single chunk if size is greater than or equal to array length', () => {
    expect(chunk([1, 2, 3], 3)).toEqual([[1, 2, 3]]);
    expect(chunk([1, 2, 3], 5)).toEqual([[1, 2, 3]]);
  });
});
