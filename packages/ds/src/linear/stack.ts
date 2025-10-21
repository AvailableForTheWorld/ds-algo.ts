/**
 * Stack Data Structure
 * A Last-In-First-Out (LIFO) collection with O(1) push, pop, and peek operations
 */

import {
  EmptyStructureError,
  CapacityError,
  type Collection,
  type PredicateFn,
  type MapperFn
} from '@ds-algo.ts/shared'

/**
 * Configuration options for Stack initialization
 * @template T - The type of elements stored in the stack
 */
export interface StackOptions<T> {
  /**
   * Initial capacity for the stack
   * @default undefined (dynamic sizing)
   */
  initialCapacity?: number

  /**
   * Maximum capacity for the stack
   * @default undefined (no limit)
   */
  maxCapacity?: number

  /**
   * Initial elements to populate the stack
   */
  initialElements?: Iterable<T>
}

/**
 * Generic Stack implementation with configurable capacity
 * @template T - The type of elements stored in the stack
 *
 * @example
 * ```typescript
 * // Basic usage with primitives
 * const stack = new Stack<number>();
 * stack.push(1);
 * stack.push(2);
 * console.log(stack.peek()); // 2
 * console.log(stack.pop());  // 2
 *
 * // With custom objects
 * interface Task {
 *   id: number;
 *   priority: number;
 * }
 *
 * const taskStack = new Stack<Task>({
 *   maxCapacity: 100,
 *   initialElements: [{ id: 1, priority: 1 }]
 * });
 *
 * // With strict types
 * type Status = 'pending' | 'active' | 'completed';
 * const statusStack = new Stack<Status>();
 * statusStack.push('pending'); // OK
 * // statusStack.push('invalid'); // Type error
 * ```
 */
export class Stack<T> implements Collection<T>, Iterable<T> {
  private items: T[]
  private readonly maxCapacity: number | undefined

  /**
   * Creates a new Stack instance
   * @param options - Configuration options
   */
  constructor(options: StackOptions<T> = {}) {
    const { initialCapacity, maxCapacity, initialElements } = options

    this.maxCapacity = maxCapacity

    // Initialize with capacity or default
    if (initialCapacity !== undefined && initialCapacity > 0) {
      this.items = new Array<T>(initialCapacity)
      this.items.length = 0 // Set actual length to 0
    } else {
      this.items = []
    }

    // Add initial elements if provided
    if (initialElements) {
      for (const element of initialElements) {
        this.push(element)
      }
    }
  }

  /**
   * Pushes an element onto the top of the stack
   * Time Complexity: O(1) amortized
   * @param element - The element to push
   * @throws {CapacityError} If the stack is at maximum capacity
   * @returns The stack instance for method chaining
   */
  push(element: T): this {
    if (this.isFull()) {
      throw new CapacityError(`Stack has reached maximum capacity of ${this.maxCapacity}`)
    }

    this.items.push(element)
    return this
  }

  /**
   * Removes and returns the top element from the stack
   * Time Complexity: O(1)
   * @throws {EmptyStructureError} If the stack is empty
   * @returns The removed top element
   */
  pop(): T {
    if (this.isEmpty()) {
      throw new EmptyStructureError('Stack')
    }

    // Non-null assertion is safe because we checked isEmpty()
    return this.items.pop()!
  }

  /**
   * Returns the top element without removing it
   * Time Complexity: O(1)
   * @throws {EmptyStructureError} If the stack is empty
   * @returns The top element
   */
  peek(): T {
    if (this.isEmpty()) {
      throw new EmptyStructureError('Stack')
    }

    return this.items[this.items.length - 1]
  }

  /**
   * Safely returns the top element without throwing
   * Time Complexity: O(1)
   * @returns The top element or undefined if empty
   */
  peekSafe(): T | undefined {
    return this.items[this.items.length - 1]
  }

  /**
   * Removes and returns the top element safely
   * Time Complexity: O(1)
   * @returns The removed element or undefined if empty
   */
  popSafe(): T | undefined {
    return this.items.pop()
  }

  /**
   * Returns the number of elements in the stack
   * Time Complexity: O(1)
   * @returns The size of the stack
   */
  size(): number {
    return this.items.length
  }

  /**
   * Checks if the stack is empty
   * Time Complexity: O(1)
   * @returns true if empty, false otherwise
   */
  isEmpty(): boolean {
    return this.items.length === 0
  }

  /**
   * Checks if the stack is at maximum capacity
   * Time Complexity: O(1)
   * @returns true if at max capacity, false otherwise
   */
  isFull(): boolean {
    return this.maxCapacity !== undefined && this.items.length >= this.maxCapacity
  }

  /**
   * Removes all elements from the stack
   * Time Complexity: O(1)
   */
  clear(): void {
    this.items.length = 0
  }

  /**
   * Returns an array containing all elements (top to bottom)
   * Time Complexity: O(n)
   * @returns Array of elements in stack order (top first)
   */
  toArray(): T[] {
    return [...this.items].reverse()
  }

  /**
   * Returns an array in bottom-to-top order
   * Time Complexity: O(n)
   * @returns Array of elements in insertion order
   */
  toArrayBottomUp(): T[] {
    return [...this.items]
  }

  /**
   * Searches for an element in the stack
   * Time Complexity: O(n)
   * @param predicate - Function to test each element
   * @returns true if element is found, false otherwise
   */
  contains(predicate: PredicateFn<T>): boolean {
    return this.items.some(predicate)
  }

  /**
   * Finds an element in the stack
   * Time Complexity: O(n)
   * @param predicate - Function to test each element
   * @returns The found element or undefined
   */
  find(predicate: PredicateFn<T>): T | undefined {
    return this.items.find(predicate)
  }

  /**
   * Creates a new stack with elements that pass the test
   * Time Complexity: O(n)
   * @param predicate - Function to test each element
   * @returns A new filtered stack
   */
  filter(predicate: PredicateFn<T>): Stack<T> {
    const filtered = this.items.filter(predicate)
    return new Stack<T>({
      initialElements: filtered,
      maxCapacity: this.maxCapacity
    })
  }

  /**
   * Creates a new stack with transformed elements
   * Time Complexity: O(n)
   * @template U - The type of the transformed elements
   * @param mapper - Function to transform each element
   * @returns A new stack with mapped elements
   */
  map<U>(mapper: MapperFn<T, U>): Stack<U> {
    const mapped = this.items.map(mapper)
    return new Stack<U>({
      initialElements: mapped,
      maxCapacity: this.maxCapacity
    })
  }

  /**
   * Executes a function for each element (bottom to top)
   * Time Complexity: O(n)
   * @param callback - Function to execute for each element
   */
  forEach(callback: (value: T, index: number) => void): void {
    this.items.forEach(callback)
  }

  /**
   * Returns the remaining capacity
   * Time Complexity: O(1)
   * @returns Remaining capacity or Infinity if unlimited
   */
  remainingCapacity(): number {
    if (this.maxCapacity === undefined) {
      return Infinity
    }
    return this.maxCapacity - this.items.length
  }

  /**
   * Creates a shallow clone of the stack
   * Time Complexity: O(n)
   * @returns A new stack with the same elements
   */
  clone(): Stack<T> {
    return new Stack<T>({
      initialElements: this.items,
      maxCapacity: this.maxCapacity
    })
  }

  /**
   * Returns an iterator for the stack (top to bottom)
   * Time Complexity: O(1) to create, O(n) to iterate
   * @returns An iterator
   */
  *[Symbol.iterator](): Iterator<T> {
    for (let i = this.items.length - 1; i >= 0; i--) {
      yield this.items[i]
    }
  }

  /**
   * Returns an iterator for bottom-to-top traversal
   * Time Complexity: O(1) to create, O(n) to iterate
   * @returns An iterable iterator
   */
  *bottomToTop(): IterableIterator<T> {
    for (const item of this.items) {
      yield item
    }
  }

  /**
   * Returns a string representation of the stack
   * @returns String representation
   */
  toString(): string {
    return `Stack(${this.items.length}) [${this.toArray().join(', ')}]`
  }

  /**
   * Returns a JSON representation of the stack
   * @returns JSON object
   */
  toJSON(): { type: string; size: number; maxCapacity?: number; items: T[] } {
    return {
      type: 'Stack',
      size: this.items.length,
      maxCapacity: this.maxCapacity,
      items: this.toArray()
    }
  }

  /**
   * Creates a Stack from an iterable
   * Time Complexity: O(n)
   * @template T - Element type
   * @param iterable - Source iterable
   * @param options - Stack options
   * @returns A new stack
   */
  static from<T>(iterable: Iterable<T>, options: Omit<StackOptions<T>, 'initialElements'> = {}): Stack<T> {
    return new Stack<T>({
      ...options,
      initialElements: iterable
    })
  }

  /**
   * Creates a Stack with specific elements
   * Time Complexity: O(n)
   * @template T - Element type
   * @param elements - Elements to add
   * @returns A new stack
   */
  static of<T>(...elements: T[]): Stack<T> {
    return new Stack<T>({
      initialElements: elements
    })
  }
}
