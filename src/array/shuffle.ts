/**
 * Shuffles an array in place using the Fisher-Yates algorithm.
 *
 * @param array The array to be shuffled
 * @param rand Optional random number generator function (default is Math.random)
 * @returns A new array with the elements shuffled
 */
export const shuffle = <T>(array: readonly T[], rand = Math.random): T[] => {
  const result = array.slice();

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
};
