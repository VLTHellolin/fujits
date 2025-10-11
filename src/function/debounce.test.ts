import { describe, expect, it, vi } from 'vitest';
import { debounce } from './debounce';

describe('debounce', () => {
  it('should debounce a function with trailing invocation', async () => {
    const spy = vi.fn();
    const func = debounce(spy, 100);

    func();
    func();
    func();

    expect(spy).toBeCalledTimes(0);
    await new Promise(r => setTimeout(r, 150));
    expect(spy).toBeCalledTimes(1);
  });

  it('should debounce a function with leading invocation', async () => {
    const spy = vi.fn();
    const func = debounce(
      spy,
      100,
      { invokeAt: 'leading' },
    );

    func();
    func();
    func();

    expect(spy).toBeCalledTimes(1);
    await new Promise(r => setTimeout(r, 150));
    expect(spy).toBeCalledTimes(1);
  });

  it('should debounce a function with both leading and trailing invocation', async () => {
    const spy = vi.fn();
    const func = debounce(
      spy,
      100,
      { invokeAt: 'both' },
    );

    func();
    func();
    func();

    expect(spy).toBeCalledTimes(1);
    await new Promise(r => setTimeout(r, 150));
    expect(spy).toBeCalledTimes(2);
  });

  it('should not invoke the function if aborted before delay', async () => {
    const spy = vi.fn();
    const controller = new AbortController();
    const func = debounce(
      spy,
      100,
      { signal: controller.signal },
    );

    func();
    func();
    controller.abort();
    func();

    expect(spy).toBeCalledTimes(0);
    await new Promise(r => setTimeout(r, 150));
    expect(spy).toBeCalledTimes(0);
  });
});
