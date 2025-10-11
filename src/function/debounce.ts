export interface DebounceOptions {
  /**
   * An `AbortSignal` that can be used to cancel the debounce.
   */
  signal?: AbortSignal;
  /**
   * Determines when the debounced function is invoked.
   *
   * @default 'trailing'
   */
  invokeAt?: 'leading' | 'trailing' | 'both';
}

/**
 * Creates a debounced version of the given function.
 *
 * @param func The function to debounce
 * @param delay The debounce delay in milliseconds (ms)
 * @param options Options for the debounce behavior
 * @returns A debounced version of the original function
 */
export const debounce = <F extends (...args: any[]) => void>(
  func: F,
  delay: number,
  { signal, invokeAt = 'trailing' }: DebounceOptions = {},
): (...args: Parameters<F>) => void => {
  const leading = invokeAt !== 'trailing';
  const trailing = invokeAt !== 'leading';

  let funcThis: any = null;
  let funcArgs: Parameters<F> | null = null;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

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
    }
  };
  const clean = () => {
    cleanTimer();
    funcThis = funcArgs = null;
  };

  const startTimer = () => {
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

  const debounced = function (this: any, ...args: Parameters<F>) {
    if (signal?.aborted) {
      clean();
      return;
    }

    // eslint-disable-next-line ts/no-this-alias
    funcThis = this;
    funcArgs = args;

    const noTimersBefore = timeoutId === null;

    startTimer();
    if (leading && noTimersBefore) {
      invoke();
    }
  };

  signal?.addEventListener('abort', clean, { once: true });

  return debounced;
};
