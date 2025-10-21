/**
 * Common type definitions for data structures and algorithms
 */

/**
 * Comparator function type for comparing two values
 * @template T - The type of values being compared
 * @returns A negative number if a < b, zero if a === b, positive if a > b
 */
export type CompareFn<T> = (a: T, b: T) => number

/**
 * Equality check function type
 * @template T - The type of values being compared
 * @returns true if values are equal, false otherwise
 */
export type EqualsFn<T> = (a: T, b: T) => boolean

/**
 * Predicate function type for filtering or searching
 * @template T - The type of value being tested
 * @returns true if the value satisfies the condition, false otherwise
 */
export type PredicateFn<T> = (value: T, index?: number) => boolean

/**
 * Mapper function type for transforming values
 * @template T - The input type
 * @template U - The output type
 */
export type MapperFn<T, U> = (value: T, index?: number) => U

/**
 * Reducer function type for folding values
 * @template T - The type of values being reduced
 * @template U - The type of the accumulator
 */
export type ReducerFn<T, U> = (accumulator: U, value: T, index?: number) => U

/**
 * Iterator result type
 * @template T - The type of value being iterated
 */
export interface IteratorResult<T> {
  value: T
  done: boolean
}

/**
 * Basic collection operations interface
 * @template T - The type of elements in the collection
 */
export interface Collection<T> {
  /**
   * Returns the number of elements in the collection
   */
  size(): number

  /**
   * Checks if the collection is empty
   */
  isEmpty(): boolean

  /**
   * Removes all elements from the collection
   */
  clear(): void

  /**
   * Converts the collection to an array
   */
  toArray(): T[]
}
