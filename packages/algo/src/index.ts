/**
 * @ds-algo.ts/algo
 * High-performance TypeScript algorithms library
 */

// Searching algorithms
export {
  binarySearch,
  binarySearchDetailed,
  binarySearchFirst,
  binarySearchLast,
  binarySearchRange,
  lowerBound,
  upperBound
} from './searching/binary-search'

export type { BinarySearchOptions, BinarySearchResult } from './searching/binary-search'

// Re-export common types from shared
export type { CompareFn, PredicateFn } from '@ds-algo.ts/shared'
