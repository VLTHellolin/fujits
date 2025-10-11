import type { MaybeArray } from './maybe-array';
import { assertType, describe, it } from 'vitest';

describe('MaybeArray', () => {
  it('should allow a single value of type T', () => {
    const singleValue: MaybeArray<number> = 42;
    assertType<MaybeArray<number>>(singleValue);
  });

  it('should allow an array of type T', () => {
    const arrayValue: MaybeArray<number> = [1, 2, 3];
    assertType<MaybeArray<number>>(arrayValue);
  });

  it('should not allow values that are neither T nor T[]', () => {
    // @ts-expect-error
    assertType<MaybeArray<number>>('string');
    // @ts-expect-error
    assertType<MaybeArray<number>>({ key: 'value' });
    // @ts-expect-error
    assertType<MaybeArray<number>>(null);
    // @ts-expect-error
    assertType<MaybeArray<number>>(undefined);
  });
});
