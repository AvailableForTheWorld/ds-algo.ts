/**
 * Queue Data Structure
 * A First-In-First-Out (FIFO) collection with O(1) enqueue, dequeue, and peek operations
 */

import {
  EmptyStructureError,
  CapacityError,
  type Collection,
  type PredicateFn,
  type MapperFn
} from '@ds-algo.ts/shared'

/**
 * Configuration options for Queue initialization
 * @template T - The type of elements stored in the queue
 */
export interface QueueOptions<T> {
  /**
   * Initial capacity for the queue
   * @default undefined (dynamic sizing)
   */
  initialCapacity?: number

  /**
   * Maximum capacity for the queue
   * @default undefined (no limit)
   */
  maxCapacity?: number

  /**
   * Initial elements to populate the queue
   */
  initialElements?: Iterable<T>
}

/**
 * Generic Queue implementation with configurable capacity
 * @template T - The type of elements stored in the queue
 *
 * @example
 * ```typescript
 * // Basic usage with primitives
 * const queue = new Queue<number>();
 * queue.enqueue(1);
 * queue.enqueue(2);
 * console.log(queue.peekFront()); // 1
 * console.log(queue.dequeue());   // 1
 *
 * // With custom objects
 * interface Task {
 *   id: number;
 *   priority: number;
 * }
 *
 * const taskQueue = new Queue<Task>({
 *   maxCapacity: 100,
 *   initialElements: [{ id: 1, priority: 1 }]
 * });
 *
 * // With strict types
 * type Status = 'pending' | 'active' | 'completed';
 * const statusQueue = new Queue<Status>();
 * statusQueue.enqueue('pending'); // OK
 * // statusQueue.enqueue('invalid'); // Type error
 * ```
 */
export class Queue<T> implements Collection<T>, Iterable<T> {
  private items: T[]
  private readonly maxCapacity: number | undefined

  /**
   * Creates a new Queue instance
   * @param options - Configuration options
   */
  constructor(options: QueueOptions<T> = {}) {
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
        this.enqueue(element)
      }
    }
  }

  /**
   * Adds an element to the rear of the queue
   * Time Complexity: O(1) amortized
   * @param element - The element to enqueue
   * @throws {CapacityError} If the queue is at maximum capacity
   * @returns The queue instance for method chaining
   */
  enqueue(element: T): this {
    if (this.isFull()) {
      throw new CapacityError(`Queue has reached maximum capacity of ${this.maxCapacity}`)
    }

    this.items.push(element)
    return this
  }

  /**
   * Removes and returns the front element from the queue
   * Time Complexity: O(n) - requires shifting elements
   * @throws {EmptyStructureError} If the queue is empty
   * @returns The removed front element
   */
  dequeue(): T {
    if (this.isEmpty()) {
      throw new EmptyStructureError('Queue')
    }

    // Non-null assertion is safe because we checked isEmpty()
    return this.items.shift()!
  }

  /**
   * Returns the front element without removing it
   * Time Complexity: O(1)
   * @throws {EmptyStructureError} If the queue is empty
   * @returns The front element
   */
  peekFront(): T {
    if (this.isEmpty()) {
      throw new EmptyStructureError('Queue')
    }

    return this.items[0]
  }

  /**
   * Returns the rear element without removing it
   * Time Complexity: O(1)
   * @throws {EmptyStructureError} If the queue is empty
   * @returns The rear element
   */
  peekRear(): T {
    if (this.isEmpty()) {
      throw new EmptyStructureError('Queue')
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
  dequeueSafe(): T | undefined {
    return this.items.shift()
  }

  /**
   * Returns the number of elements in the queue
   * Time Complexity: O(1)
   * @returns The size of the queue
   */
  size(): number {
    return this.items.length
  }

  /**
   * Checks if the queue is empty
   * Time Complexity: O(1)
   * @returns true if empty, false otherwise
   */
  isEmpty(): boolean {
    return this.items.length === 0
  }

  /**
   * Checks if the queue is at maximum capacity
   * Time Complexity: O(1)
   * @returns true if at max capacity, false otherwise
   */
  isFull(): boolean {
    return this.maxCapacity !== undefined && this.items.length >= this.maxCapacity
  }

  /**
   * Removes all elements from the queue
   * Time Complexity: O(1)
   */
  clear(): void {
    this.items.length = 0
  }

  /**
   * Returns an array containing all elements (front to rear)
   * Time Complexity: O(n)
   * @returns Array of elements in queue order (front first)
   */
  toArray(): T[] {
    return [...this.items]
  }

  /**
   * Searches for an element in the queue
   * Time Complexity: O(n)
   * @param predicate - Function to test each element
   * @returns true if element is found, false otherwise
   */
  contains(predicate: PredicateFn<T>): boolean {
    return this.items.some(predicate)
  }

  /**
   * Finds an element in the queue
   * Time Complexity: O(n)
   * @param predicate - Function to test each element
   * @returns The found element or undefined
   */
  find(predicate: PredicateFn<T>): T | undefined {
    return this.items.find(predicate)
  }

  /**
   * Creates a new queue with elements that pass the test
   * Time Complexity: O(n)
   * @param predicate - Function to test each element
   * @returns A new filtered queue
   */
  filter(predicate: PredicateFn<T>): Queue<T> {
    const filtered = this.items.filter(predicate)
    return new Queue<T>({
      initialElements: filtered,
      maxCapacity: this.maxCapacity
    })
  }

  /**
   * Creates a new queue with transformed elements
   * Time Complexity: O(n)
   * @template U - The type of the transformed elements
   * @param mapper - Function to transform each element
   * @returns A new queue with mapped elements
   */
  map<U>(mapper: MapperFn<T, U>): Queue<U> {
    const mapped = this.items.map(mapper)
    return new Queue<U>({
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
   * Creates a shallow clone of the queue
   * Time Complexity: O(n)
   * @returns A new queue with the same elements
   */
  clone(): Queue<T> {
    return new Queue<T>({
      initialElements: this.items,
      maxCapacity: this.maxCapacity
    })
  }

  /**
   * Returns an iterator for the queue (front to rear)
   * Time Complexity: O(1) to create, O(n) to iterate
   * @returns An iterator
   */
  *[Symbol.iterator](): Iterator<T> {
    for (const item of this.items) {
      yield item
    }
  }

  /**
   * Returns a string representation of the queue
   * @returns String representation
   */
  toString(): string {
    return `Queue(${this.items.length}) [${this.items.join(', ')}]`
  }

  /**
   * Returns a JSON representation of the queue
   * @returns JSON object
   */
  toJSON(): { type: string; size: number; maxCapacity?: number; items: T[] } {
    return {
      type: 'Queue',
      size: this.items.length,
      maxCapacity: this.maxCapacity,
      items: this.toArray()
    }
  }

  /**
   * Creates a Queue from an iterable
   * Time Complexity: O(n)
   * @template T - Element type
   * @param iterable - Source iterable
   * @param options - Queue options
   * @returns A new queue
   */
  static from<T>(iterable: Iterable<T>, options: Omit<QueueOptions<T>, 'initialElements'> = {}): Queue<T> {
    return new Queue<T>({
      ...options,
      initialElements: iterable
    })
  }

  /**
   * Creates a Queue with specific elements
   * Time Complexity: O(n)
   * @template T - Element type
   * @param elements - Elements to add
   * @returns A new queue
   */
  static of<T>(...elements: T[]): Queue<T> {
    return new Queue<T>({
      initialElements: elements
    })
  }
}
