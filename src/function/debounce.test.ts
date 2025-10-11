import { describe, expect, it } from 'vitest';
import { debounce } from './debounce';

describe('debounce', () => {
  it('should debounce a function with trailing invocation', async () => {
    let callCount = 0;
    const debouncedFunc = debounce(() => {
      callCount++;
    }, 100);

    debouncedFunc();
    debouncedFunc();
    debouncedFunc();

    expect(callCount).toBe(0);

    await new Promise(r => setTimeout(r, 150));
    expect(callCount).toBe(1);
  });

  it('should debounce a function with leading invocation', async () => {
    let callCount = 0;
    const debouncedFunc = debounce(
      () => {
        callCount++;
      },
      100,
      { invokeAt: 'leading' },
    );

    debouncedFunc();
    debouncedFunc();
    debouncedFunc();

    expect(callCount).toBe(1);

    await new Promise(r => setTimeout(r, 150));
    expect(callCount).toBe(1);
  });

  it('should debounce a function with both leading and trailing invocation', async () => {
    let callCount = 0;
    const debouncedFunc = debounce(
      () => {
        callCount++;
      },
      100,
      { invokeAt: 'both' },
    );

    debouncedFunc();
    debouncedFunc();
    debouncedFunc();

    expect(callCount).toBe(1);

    await new Promise(r => setTimeout(r, 150));
    expect(callCount).toBe(2);
  });

  it('should not invoke the function if aborted before delay', async () => {
    let callCount = 0;
    const controller = new AbortController();
    const debouncedFunc = debounce(
      () => {
        callCount++;
      },
      100,
      { signal: controller.signal },
    );

    debouncedFunc();
    debouncedFunc();
    controller.abort();
    debouncedFunc();

    expect(callCount).toBe(0);

    await new Promise(r => setTimeout(r, 150));
    expect(callCount).toBe(0);
  });
});
