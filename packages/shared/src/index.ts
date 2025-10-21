/**
 * @ds-algo.ts/shared
 * Shared types, enums, and utilities for data structures and algorithms
 */

// Types
export type { CompareFn, EqualsFn, PredicateFn, MapperFn, ReducerFn, IteratorResult, Collection } from './types/common'

// Errors
export {
  DSAlgoError,
  EmptyStructureError,
  IndexOutOfBoundsError,
  CapacityError,
  InvalidOperationError
} from './types/errors'

// Enums
export { TraversalOrder, SortOrder, ComparisonResult, CapacityMode } from './enums/index'

// Utilities
export { defaultComparator, reverseComparator, defaultEquals, compareByKey, equalsByKey } from './utils/comparators'
