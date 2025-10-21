/**
 * Binary Search Algorithm
 * Searches for a target value in a sorted array
 */

import { defaultComparator, type CompareFn } from '@ds-algo.ts/shared'

/**
 * Options for binary search
 * @template T - The type of elements in the array
 */
export interface BinarySearchOptions<T> {
  /**
   * Custom comparator function
   * @default defaultComparator
   */
  compareFn?: CompareFn<T>

  /**
   * Starting index for search
   * @default 0
   */
  fromIndex?: number

  /**
   * Ending index for search (exclusive)
   * @default array.length
   */
  toIndex?: number
}

/**
 * Result of a binary search operation
 */
export interface BinarySearchResult {
  /**
   * Index where the element was found, or -1 if not found
   */
  index: number

  /**
   * Whether the element was found
   */
  found: boolean

  /**
   * Number of comparisons made during the search
   */
  comparisons: number

  /**
   * If not found, the index where the element would be inserted to maintain sorted order
   */
  insertionPoint: number
}

/**
 * Performs binary search on a sorted array
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 *
 * @template T - The type of elements being searched
 * @param array - Sorted array to search in
 * @param target - Element to search for
 * @param options - Search options
 * @returns The index of the target element, or -1 if not found
 *
 * @example
 * ```typescript
 * // Search in number array
 * const numbers = [1, 3, 5, 7, 9, 11, 13];
 * const index = binarySearch(numbers, 7); // 3
 *
 * // Search with custom comparator
 * interface Person {
 *   id: number;
 *   name: string;
 * }
 *
 * const people: Person[] = [
 *   { id: 1, name: 'Alice' },
 *   { id: 2, name: 'Bob' },
 *   { id: 3, name: 'Charlie' }
 * ];
 *
 * const result = binarySearch(
 *   people,
 *   { id: 2, name: 'Bob' },
 *   { compareFn: (a, b) => a.id - b.id }
 * );
 * ```
 */
export function binarySearch<T>(array: readonly T[], target: T, options: BinarySearchOptions<T> = {}): number {
  const result = binarySearchDetailed(array, target, options)
  return result.found ? result.index : -1
}

/**
 * Performs binary search with detailed results
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 *
 * @template T - The type of elements being searched
 * @param array - Sorted array to search in
 * @param target - Element to search for
 * @param options - Search options
 * @returns Detailed search result
 *
 * @example
 * ```typescript
 * const numbers = [1, 3, 5, 7, 9];
 * const result = binarySearchDetailed(numbers, 6);
 * console.log(result);
 * // {
 * //   index: -1,
 * //   found: false,
 * //   comparisons: 3,
 * //   insertionPoint: 3
 * // }
 * ```
 */
export function binarySearchDetailed<T>(
  array: readonly T[],
  target: T,
  options: BinarySearchOptions<T> = {}
): BinarySearchResult {
  const { compareFn = defaultComparator, fromIndex = 0, toIndex = array.length } = options

  let left = fromIndex
  let right = toIndex - 1
  let comparisons = 0

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2)
    const comparison = compareFn(array[mid], target)
    comparisons++

    if (comparison === 0) {
      return {
        index: mid,
        found: true,
        comparisons,
        insertionPoint: mid
      }
    } else if (comparison < 0) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }

  return {
    index: -1,
    found: false,
    comparisons,
    insertionPoint: left
  }
}

/**
 * Finds the leftmost (first) occurrence of target in a sorted array with duplicates
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 *
 * @template T - The type of elements being searched
 * @param array - Sorted array to search in (may contain duplicates)
 * @param target - Element to search for
 * @param options - Search options
 * @returns Index of first occurrence, or -1 if not found
 *
 * @example
 * ```typescript
 * const numbers = [1, 2, 2, 2, 3, 4, 5];
 * const first = binarySearchFirst(numbers, 2); // 1
 * const last = binarySearchLast(numbers, 2);   // 3
 * ```
 */
export function binarySearchFirst<T>(array: readonly T[], target: T, options: BinarySearchOptions<T> = {}): number {
  const { compareFn = defaultComparator, fromIndex = 0, toIndex = array.length } = options

  let left = fromIndex
  let right = toIndex - 1
  let result = -1

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2)
    const comparison = compareFn(array[mid], target)

    if (comparison === 0) {
      result = mid
      right = mid - 1 // Continue searching in the left half
    } else if (comparison < 0) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }

  return result
}

/**
 * Finds the rightmost (last) occurrence of target in a sorted array with duplicates
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 *
 * @template T - The type of elements being searched
 * @param array - Sorted array to search in (may contain duplicates)
 * @param target - Element to search for
 * @param options - Search options
 * @returns Index of last occurrence, or -1 if not found
 */
export function binarySearchLast<T>(array: readonly T[], target: T, options: BinarySearchOptions<T> = {}): number {
  const { compareFn = defaultComparator, fromIndex = 0, toIndex = array.length } = options

  let left = fromIndex
  let right = toIndex - 1
  let result = -1

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2)
    const comparison = compareFn(array[mid], target)

    if (comparison === 0) {
      result = mid
      left = mid + 1 // Continue searching in the right half
    } else if (comparison < 0) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }

  return result
}

/**
 * Finds the range of indices where target appears in a sorted array
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 *
 * @template T - The type of elements being searched
 * @param array - Sorted array to search in
 * @param target - Element to search for
 * @param options - Search options
 * @returns [firstIndex, lastIndex] or [-1, -1] if not found
 */
export function binarySearchRange<T>(
  array: readonly T[],
  target: T,
  options: BinarySearchOptions<T> = {}
): [number, number] {
  const first = binarySearchFirst(array, target, options)
  if (first === -1) {
    return [-1, -1]
  }
  const last = binarySearchLast(array, target, options)
  return [first, last]
}

/**
 * Finds the index of the smallest element >= target (lower bound)
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 *
 * @template T - The type of elements being searched
 * @param array - Sorted array
 * @param target - Target element
 * @param options - Search options
 * @returns Index of lower bound, or array.length if all elements < target
 */
export function lowerBound<T>(array: readonly T[], target: T, options: BinarySearchOptions<T> = {}): number {
  const { compareFn = defaultComparator, fromIndex = 0, toIndex = array.length } = options

  let left = fromIndex
  let right = toIndex

  while (left < right) {
    const mid = left + Math.floor((right - left) / 2)
    if (compareFn(array[mid], target) < 0) {
      left = mid + 1
    } else {
      right = mid
    }
  }

  return left
}

/**
 * Finds the index of the smallest element > target (upper bound)
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 *
 * @template T - The type of elements being searched
 * @param array - Sorted array
 * @param target - Target element
 * @param options - Search options
 * @returns Index of upper bound, or array.length if all elements <= target
 */
export function upperBound<T>(array: readonly T[], target: T, options: BinarySearchOptions<T> = {}): number {
  const { compareFn = defaultComparator, fromIndex = 0, toIndex = array.length } = options

  let left = fromIndex
  let right = toIndex

  while (left < right) {
    const mid = left + Math.floor((right - left) / 2)
    if (compareFn(array[mid], target) <= 0) {
      left = mid + 1
    } else {
      right = mid
    }
  }

  return left
}
