/**
 * Deque (Double-Ended Queue) Data Structure
 * A collection that supports insertion and deletion at both ends with O(1) operations at rear
 */

import {
  EmptyStructureError,
  CapacityError,
  type Collection,
  type PredicateFn,
  type MapperFn
} from '@ds-algo.ts/shared'

/**
 * Configuration options for Deque initialization
 * @template T - The type of elements stored in the deque
 */
export interface DequeOptions<T> {
  /**
   * Initial capacity for the deque
   * @default undefined (dynamic sizing)
   */
  initialCapacity?: number

  /**
   * Maximum capacity for the deque
   * @default undefined (no limit)
   */
  maxCapacity?: number

  /**
   * Initial elements to populate the deque
   */
  initialElements?: Iterable<T>
}

/**
 * Generic Deque (Double-Ended Queue) implementation with configurable capacity
 * @template T - The type of elements stored in the deque
 *
 * @example
 * ```typescript
 * // Basic usage with primitives
 * const deque = new Deque<number>();
 * deque.addRear(1);
 * deque.addFront(0);
 * deque.addRear(2);
 * console.log(deque.peekFront()); // 0
 * console.log(deque.peekRear());  // 2
 * console.log(deque.removeFront()); // 0
 * console.log(deque.removeRear());  // 2
 *
 * // With custom objects
 * interface Task {
 *   id: number;
 *   priority: number;
 * }
 *
 * const taskDeque = new Deque<Task>({
 *   maxCapacity: 100,
 *   initialElements: [{ id: 1, priority: 1 }]
 * });
 *
 * // Add high priority to front
 * taskDeque.addFront({ id: 2, priority: 10 });
 * // Add low priority to rear
 * taskDeque.addRear({ id: 3, priority: 1 });
 * ```
 */
export class Deque<T> implements Collection<T>, Iterable<T> {
  private items: T[]
  private readonly maxCapacity: number | undefined

  /**
   * Creates a new Deque instance
   * @param options - Configuration options
   */
  constructor(options: DequeOptions<T> = {}) {
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
        this.addRear(element)
      }
    }
  }

  /**
   * Adds an element to the front of the deque
   * Time Complexity: O(n) - requires shifting elements
   * @param element - The element to add
   * @throws {CapacityError} If the deque is at maximum capacity
   * @returns The deque instance for method chaining
   */
  addFront(element: T): this {
    if (this.isFull()) {
      throw new CapacityError(`Deque has reached maximum capacity of ${this.maxCapacity}`)
    }

    this.items.unshift(element)
    return this
  }

  /**
   * Adds an element to the rear of the deque
   * Time Complexity: O(1) amortized
   * @param element - The element to add
   * @throws {CapacityError} If the deque is at maximum capacity
   * @returns The deque instance for method chaining
   */
  addRear(element: T): this {
    if (this.isFull()) {
      throw new CapacityError(`Deque has reached maximum capacity of ${this.maxCapacity}`)
    }

    this.items.push(element)
    return this
  }

  /**
   * Removes and returns the front element from the deque
   * Time Complexity: O(n) - requires shifting elements
   * @throws {EmptyStructureError} If the deque is empty
   * @returns The removed front element
   */
  removeFront(): T {
    if (this.isEmpty()) {
      throw new EmptyStructureError('Deque')
    }

    // Non-null assertion is safe because we checked isEmpty()
    return this.items.shift()!
  }

  /**
   * Removes and returns the rear element from the deque
   * Time Complexity: O(1)
   * @throws {EmptyStructureError} If the deque is empty
   * @returns The removed rear element
   */
  removeRear(): T {
    if (this.isEmpty()) {
      throw new EmptyStructureError('Deque')
    }

    // Non-null assertion is safe because we checked isEmpty()
    return this.items.pop()!
  }

  /**
   * Returns the front element without removing it
   * Time Complexity: O(1)
   * @throws {EmptyStructureError} If the deque is empty
   * @returns The front element
   */
  peekFront(): T {
    if (this.isEmpty()) {
      throw new EmptyStructureError('Deque')
    }

    return this.items[0]
  }

  /**
   * Returns the rear element without removing it
   * Time Complexity: O(1)
   * @throws {EmptyStructureError} If the deque is empty
   * @returns The rear element
   */
  peekRear(): T {
    if (this.isEmpty()) {
      throw new EmptyStructureError('Deque')
    }

    return this.items[this.items.length - 1]
  }

  /**
   * Safely returns the front element without throwing
   * Time Complexity: O(1)
   * @returns The front element or undefined if empty
   */
  peekFrontSafe(): T | undefined {
    return this.items[0]
  }

  /**
   * Safely returns the rear element without throwing
   * Time Complexity: O(1)
   * @returns The rear element or undefined if empty
   */
  peekRearSafe(): T | undefined {
    return this.items[this.items.length - 1]
  }

  /**
   * Removes and returns the front element safely
   * Time Complexity: O(n)
   * @returns The removed element or undefined if empty
   */
  removeFrontSafe(): T | undefined {
    return this.items.shift()
  }

  /**
   * Removes and returns the rear element safely
   * Time Complexity: O(1)
   * @returns The removed element or undefined if empty
   */
  removeRearSafe(): T | undefined {
    return this.items.pop()
  }

  /**
   * Returns the number of elements in the deque
   * Time Complexity: O(1)
   * @returns The size of the deque
   */
  size(): number {
    return this.items.length
  }

  /**
   * Checks if the deque is empty
   * Time Complexity: O(1)
   * @returns true if empty, false otherwise
   */
  isEmpty(): boolean {
    return this.items.length === 0
  }

  /**
   * Checks if the deque is at maximum capacity
   * Time Complexity: O(1)
   * @returns true if at max capacity, false otherwise
   */
  isFull(): boolean {
    return this.maxCapacity !== undefined && this.items.length >= this.maxCapacity
  }

  /**
   * Removes all elements from the deque
   * Time Complexity: O(1)
   */
  clear(): void {
    this.items.length = 0
  }

  /**
   * Returns an array containing all elements (front to rear)
   * Time Complexity: O(n)
   * @returns Array of elements in deque order (front first)
   */
  toArray(): T[] {
    return [...this.items]
  }

  /**
   * Searches for an element in the deque
   * Time Complexity: O(n)
   * @param predicate - Function to test each element
   * @returns true if element is found, false otherwise
   */
  contains(predicate: PredicateFn<T>): boolean {
    return this.items.some(predicate)
  }

  /**
   * Finds an element in the deque
   * Time Complexity: O(n)
   * @param predicate - Function to test each element
   * @returns The found element or undefined
   */
  find(predicate: PredicateFn<T>): T | undefined {
    return this.items.find(predicate)
  }

  /**
   * Creates a new deque with elements that pass the test
   * Time Complexity: O(n)
   * @param predicate - Function to test each element
   * @returns A new filtered deque
   */
  filter(predicate: PredicateFn<T>): Deque<T> {
    const filtered = this.items.filter(predicate)
    return new Deque<T>({
      initialElements: filtered,
      maxCapacity: this.maxCapacity
    })
  }

  /**
   * Creates a new deque with transformed elements
   * Time Complexity: O(n)
   * @template U - The type of the transformed elements
   * @param mapper - Function to transform each element
   * @returns A new deque with mapped elements
   */
  map<U>(mapper: MapperFn<T, U>): Deque<U> {
    const mapped = this.items.map(mapper)
    return new Deque<U>({
      initialElements: mapped,
      maxCapacity: this.maxCapacity
    })
  }

  /**
   * Executes a function for each element (front to rear)
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
   * Creates a shallow clone of the deque
   * Time Complexity: O(n)
   * @returns A new deque with the same elements
   */
  clone(): Deque<T> {
    return new Deque<T>({
      initialElements: this.items,
      maxCapacity: this.maxCapacity
    })
  }

  /**
   * Reverses the deque in place
   * Time Complexity: O(n)
   * @returns The deque instance for method chaining
   */
  reverse(): this {
    this.items.reverse()
    return this
  }

  /**
   * Returns a new reversed deque
   * Time Complexity: O(n)
   * @returns A new deque with elements in reverse order
   */
  reversed(): Deque<T> {
    return new Deque<T>({
      initialElements: [...this.items].reverse(),
      maxCapacity: this.maxCapacity
    })
  }

  /**
   * Returns an iterator for the deque (front to rear)
   * Time Complexity: O(1) to create, O(n) to iterate
   * @returns An iterator
   */
  *[Symbol.iterator](): Iterator<T> {
    for (const item of this.items) {
      yield item
    }
  }

  /**
   * Returns an iterator for rear-to-front traversal
   * Time Complexity: O(1) to create, O(n) to iterate
   * @returns An iterable iterator
   */
  *rearToFront(): IterableIterator<T> {
    for (let i = this.items.length - 1; i >= 0; i--) {
      yield this.items[i]
    }
  }

  /**
   * Returns a string representation of the deque
   * @returns String representation
   */
  toString(): string {
    return `Deque(${this.items.length}) [${this.items.join(', ')}]`
  }

  /**
   * Returns a JSON representation of the deque
   * @returns JSON object
   */
  toJSON(): { type: string; size: number; maxCapacity?: number; items: T[] } {
    return {
      type: 'Deque',
      size: this.items.length,
      maxCapacity: this.maxCapacity,
      items: this.toArray()
    }
  }

  /**
   * Creates a Deque from an iterable
   * Time Complexity: O(n)
   * @template T - Element type
   * @param iterable - Source iterable
   * @param options - Deque options
   * @returns A new deque
   */
  static from<T>(iterable: Iterable<T>, options: Omit<DequeOptions<T>, 'initialElements'> = {}): Deque<T> {
    return new Deque<T>({
      ...options,
      initialElements: iterable
    })
  }

  /**
   * Creates a Deque with specific elements
   * Time Complexity: O(n)
   * @template T - Element type
   * @param elements - Elements to add
   * @returns A new deque
   */
  static of<T>(...elements: T[]): Deque<T> {
    return new Deque<T>({
      initialElements: elements
    })
  }
}
