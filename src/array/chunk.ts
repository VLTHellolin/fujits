/**
 * Splits an array into chunks (smaller arrays) of a specified size.
 *
 * @param array The array to be chunked
 * @param size The size of each chunk
 * @returns A new array containing the chunked arrays
 *
 * @throws Will throw an error if the chunk size is not a positive integer.
 */
export const chunk = <T>(array: readonly T[], size: number): T[][] => {
  if (!Number.isInteger(size)) throw new Error('Chunk size must be an integer');
  if (size <= 0) throw new Error('Chunk size must be greater than 0');
  if (array.length === 0) return [];
  if (size >= array.length) return [array.slice()];

  const chunkCount = Math.ceil(array.length / size);
  return Array.from(
    { length: chunkCount },
    (_, index) => array.slice(index * size, index * size + size),
  );
};
