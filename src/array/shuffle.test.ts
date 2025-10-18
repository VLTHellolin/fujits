import { describe, expect, it, vi } from 'vitest';
import { shuffle } from './shuffle';

describe('shuffle', () => {
  it('should shuffle the array', () => {
    const array = [1, 2, 3, 4, 5];
    const shuffled = shuffle(array);

    expect(shuffled.sort()).toEqual(array);
  });

  it('should return an empty array when input is empty', () => {
    expect(shuffle([])).toEqual([]);
  });

  it('should handle single-element arrays', () => {
    expect(shuffle([1])).toEqual([1]);
  });

  it('should not modify the original array', () => {
    const array = [1, 2, 3];
    const copy = [...array];
    shuffle(array);

    expect(array).toEqual(copy);
  });

  it('should work with different types of elements', () => {
    const array = [1, 'two', { three: 3 }, [4], null];
    const shuffled = shuffle(array);

    expect(shuffled).toHaveLength(array.length);
    expect(shuffled).toEqual(expect.arrayContaining(array));
  });

  it('should use the provided random function', () => {
    const array = [1, 2, 3, 4, 5];
    const fakeRand = vi.fn(() => 0);
    const shuffled = shuffle(array, fakeRand);

    expect(fakeRand).toHaveBeenCalledTimes(4);
    expect(shuffled).toEqual([2, 3, 4, 5, 1]);
  });
});
