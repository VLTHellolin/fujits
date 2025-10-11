export interface ThrottleOptions {
  /**
   * An `AbortSignal` that can be used to cancel the throttle.
   */
  signal?: AbortSignal;
  /**
   * Determines when the throttled function is invoked.
   *
   * @default 'leading'
   */
  invokeAt?: 'leading' | 'trailing' | 'both';
}

/**
 * Creates a throttled version of the given function.
 *
 * @param func The function to throttle
 * @param interval The throttle interval in milliseconds (ms)
 * @param options Options for the throttle behavior
 * @returns A throttled version of the original function
 */
export const throttle = <F extends (...args: any[]) => void>(
  func: F,
  interval: number,
  { signal, invokeAt = 'leading' }: ThrottleOptions = {},
): (...args: Parameters<F>) => void => {
  const leading = invokeAt !== 'trailing';
  const trailing = invokeAt !== 'leading';

  let funcThis: any = null;
  let funcArgs: Parameters<F> | null = null;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let lastInvokeTime = 0;

  const cleanTimer = () => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };
  const invoke = () => {
    if (funcArgs !== null) {
      func.apply(funcThis, funcArgs);
      funcThis = funcArgs = null;
      lastInvokeTime = Date.now();
    }
  };
  const clean = () => {
    cleanTimer();
    funcThis = funcArgs = null;
    lastInvokeTime = 0;
  };

  const startTimer = (delay: number) => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      timeoutId = null;
      if (trailing) {
        invoke();
      } else {
        clean();
      }
    }, delay);
  };

  const throttled = function (this: any, ...args: Parameters<F>) {
    const now = Date.now();
    if (lastInvokeTime === 0 && !leading) {
      lastInvokeTime = now;
    }
    const remaining = interval - (now - lastInvokeTime);

    if (signal?.aborted) {
      clean();
      return;
    }

    // eslint-disable-next-line ts/no-this-alias
    funcThis = this;
    funcArgs = args;

    if (remaining <= 0) {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      invoke();
    } else if (timeoutId === null && trailing) {
      startTimer(remaining);
    }
  };

  signal?.addEventListener('abort', clean, { once: true });

  return throttled;
};
