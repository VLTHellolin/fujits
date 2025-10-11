import { describe, expect, it, vi } from 'vitest';
import { throttle } from './throttle';

describe('throttle', () => {
  it('should throttle a function with leading invocation', async () => {
    const spy = vi.fn();
    const func = throttle(spy, 100);

    func();
    func();
    func();

    expect(spy).toBeCalledTimes(1);
    await new Promise(r => setTimeout(r, 150));
    expect(spy).toBeCalledTimes(1);
  });

  it('should throttle a function with trailing invocation', async () => {
    const spy = vi.fn();
    const func = throttle(
      spy,
      100,
      { invokeAt: 'trailing' },
    );

    func();
    func();
    func();

    expect(spy).toBeCalledTimes(0);
    await new Promise(r => setTimeout(r, 150));
    expect(spy).toBeCalledTimes(1);
  });

  it('should throttle a function with both leading and trailing invocation', async () => {
    const spy = vi.fn();
    const func = throttle(
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

  it('should not invoke the function if aborted before calling', async () => {
    const spy = vi.fn();
    const controller = new AbortController();
    const func = throttle(
      spy,
      100,
      { signal: controller.signal },
    );

    controller.abort();
    func();
    func();
    func();

    expect(spy).toBeCalledTimes(0);
    await new Promise(r => setTimeout(r, 150));
    expect(spy).toBeCalledTimes(0);
  });

  it('should not invoke the function if aborted during waiting', async () => {
    const spy = vi.fn();
    const controller = new AbortController();
    const func = throttle(
      spy,
      100,
      { signal: controller.signal, invokeAt: 'trailing' },
    );

    func();
    func();
    func();
    controller.abort();

    expect(spy).toBeCalledTimes(0);
    await new Promise(r => setTimeout(r, 150));
    expect(spy).toBeCalledTimes(0);
  });
});
