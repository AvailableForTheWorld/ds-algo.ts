/**
 * Default comparator implementations
 */

import type { CompareFn, EqualsFn } from '../types/common'
import { ComparisonResult } from '../enums/index'

/**
 * Default comparator for primitive types (numbers, strings)
 * @template T - Must be a type that supports < and > operators
 */
export function defaultComparator<T>(a: T, b: T): number {
  if (a < b) return ComparisonResult.LESS_THAN
  if (a > b) return ComparisonResult.GREATER_THAN
  return ComparisonResult.EQUAL
}

/**
 * Reverse comparator - inverts the comparison result
 * @template T - The type being compared
 */
export function reverseComparator<T>(compareFn: CompareFn<T>): CompareFn<T> {
  return (a: T, b: T) => -compareFn(a, b)
}

/**
 * Default equality checker using strict equality
 * @template T - The type being compared
 */
export function defaultEquals<T>(a: T, b: T): boolean {
  return a === b
}

/**
 * Create a comparator from a key extraction function
 * @template T - The object type
 * @template K - The key type (must be comparable)
 */
export function compareByKey<T, K extends string | number>(
  keyFn: (item: T) => K,
  compareFn: CompareFn<K> = defaultComparator
): CompareFn<T> {
  return (a: T, b: T) => compareFn(keyFn(a), keyFn(b))
}

/**
 * Create an equality checker from a key extraction function
 * @template T - The object type
 * @template K - The key type
 */
export function equalsByKey<T, K>(keyFn: (item: T) => K, equalsFn: EqualsFn<K> = defaultEquals): EqualsFn<T> {
  return (a: T, b: T) => equalsFn(keyFn(a), keyFn(b))
}
