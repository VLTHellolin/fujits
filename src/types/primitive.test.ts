import type { Primitive } from './primitive';
import { assertType, describe, it } from 'vitest';

describe('Primitive', () => {
  it('should correctly identify primitive types', () => {
    assertType<Primitive>(true);
    assertType<Primitive>(42);
    assertType<Primitive>(9223372036854775807n);
    assertType<Primitive>('hello');
    assertType<Primitive>(Symbol('sym'));
    assertType<Primitive>(null);
    assertType<Primitive>(undefined);
  });

  it('should not allow non-primitive types', () => {
    // @ts-expect-error
    assertType<Primitive>({});
    // @ts-expect-error
    assertType<Primitive>([]);
    // @ts-expect-error
    assertType<Primitive>(() => {});
    // @ts-expect-error
    assertType<Primitive>(new Date());
    // @ts-expect-error
    assertType<Primitive>(/regex/);
  });
});
