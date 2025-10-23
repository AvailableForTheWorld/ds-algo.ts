# @ds-algo.ts/ds

High-performance TypeScript data structures library with comprehensive type safety.

## Installation

```bash
npm install @ds-algo.ts/ds
# or
pnpm add @ds-algo.ts/ds
# or
yarn add @ds-algo.ts/ds
```

## Features

- 🎯 **Type-Safe**: Fully typed with TypeScript generics
- 🚀 **High Performance**: Optimized implementations
- 📦 **Tree-Shakeable**: Import only what you need
- 🧪 **Well Tested**: Comprehensive test coverage
- 📖 **Well Documented**: Detailed JSDoc comments

## Data Structures

### Linear Structures

#### Stack

A Last-In-First-Out (LIFO) data structure.

```typescript
import { Stack } from '@ds-algo.ts/ds'

// Basic usage
const stack = new Stack<number>()
stack.push(1)
stack.push(2)
stack.push(3)

console.log(stack.peek()) // 3
console.log(stack.pop()) // 3
console.log(stack.size()) // 2

// With options
const limitedStack = new Stack<string>({
  maxCapacity: 100,
  initialElements: ['first', 'second']
})

// Type-safe operations
interface Task {
  id: number
  priority: number
  description: string
}

const taskStack = new Stack<Task>()
taskStack.push({ id: 1, priority: 1, description: 'Low priority task' })
taskStack.push({ id: 2, priority: 5, description: 'High priority task' })

// Functional operations
const highPriority = taskStack.filter((task) => task.priority > 3)
const taskIds = taskStack.map((task) => task.id)

// Safe operations (no exceptions)
const maybeTask = taskStack.popSafe() // Task | undefined
const maybeTop = taskStack.peekSafe() // Task | undefined

// Iteration
for (const task of taskStack) {
  console.log(task.description)
}

// Static factory methods
const numbers = Stack.of(1, 2, 3, 4, 5)
const fromArray = Stack.from([1, 2, 3])
```

#### Queue

A First-In-First-Out (FIFO) data structure.

```typescript
import { Queue } from '@ds-algo.ts/ds'

// Basic usage
const queue = new Queue<number>()
queue.enqueue(1)
queue.enqueue(2)
queue.enqueue(3)

console.log(queue.peekFront()) // 1
console.log(queue.dequeue()) // 1
console.log(queue.size()) // 2

// With options
const limitedQueue = new Queue<string>({
  maxCapacity: 100,
  initialElements: ['first', 'second']
})

// Type-safe operations
interface Task {
  id: number
  priority: number
  description: string
}

const taskQueue = new Queue<Task>()
taskQueue.enqueue({ id: 1, priority: 1, description: 'First task' })
taskQueue.enqueue({ id: 2, priority: 5, description: 'Second task' })

// Functional operations
const highPriority = taskQueue.filter((task) => task.priority > 3)
const taskIds = taskQueue.map((task) => task.id)

// Safe operations (no exceptions)
const maybeTask = taskQueue.dequeueSafe() // Task | undefined
const maybeFront = taskQueue.peekFrontSafe() // Task | undefined
const maybeRear = taskQueue.peekRearSafe() // Task | undefined

// Iteration
for (const task of taskQueue) {
  console.log(task.description)
}

// Static factory methods
const numbers = Queue.of(1, 2, 3, 4, 5)
const fromArray = Queue.from([1, 2, 3])
```

### API Reference

#### Stack Methods

##### Core Operations

- `push(element: T): this` - Add element to top (O(1))
- `pop(): T` - Remove and return top element (O(1))
- `peek(): T` - View top element without removing (O(1))
- `popSafe(): T | undefined` - Safe pop without exceptions
- `peekSafe(): T | undefined` - Safe peek without exceptions

##### Inspection

- `size(): number` - Get number of elements
- `isEmpty(): boolean` - Check if stack is empty
- `isFull(): boolean` - Check if at max capacity
- `remainingCapacity(): number` - Get remaining space

##### Collection Operations

- `clear(): void` - Remove all elements
- `toArray(): T[]` - Convert to array (top to bottom)
- `toArrayBottomUp(): T[]` - Convert to array (bottom to top)
- `contains(predicate: PredicateFn<T>): boolean` - Check for element
- `find(predicate: PredicateFn<T>): T | undefined` - Find element

##### Functional Operations

- `filter(predicate: PredicateFn<T>): Stack<T>` - Create filtered stack
- `map<U>(mapper: MapperFn<T, U>): Stack<U>` - Transform elements
- `forEach(callback: (value: T, index: number) => void): void` - Iterate

##### Iteration

- `[Symbol.iterator]()` - Iterate top to bottom
- `bottomToTop()` - Iterate bottom to top

##### Utility

- `clone(): Stack<T>` - Create shallow copy
- `toString(): string` - String representation
- `toJSON()` - JSON representation

##### Static Methods

- `Stack.from<T>(iterable: Iterable<T>, options?): Stack<T>`
- `Stack.of<T>(...elements: T[]): Stack<T>`

#### Queue Methods

##### Core Operations

- `enqueue(element: T): this` - Add element to rear (O(1))
- `dequeue(): T` - Remove and return front element (O(n))
- `peekFront(): T` - View front element without removing (O(1))
- `peekRear(): T` - View rear element without removing (O(1))
- `dequeueSafe(): T | undefined` - Safe dequeue without exceptions
- `peekFrontSafe(): T | undefined` - Safe peek front without exceptions
- `peekRearSafe(): T | undefined` - Safe peek rear without exceptions

##### Inspection

- `size(): number` - Get number of elements
- `isEmpty(): boolean` - Check if queue is empty
- `isFull(): boolean` - Check if at max capacity
- `remainingCapacity(): number` - Get remaining space

##### Collection Operations

- `clear(): void` - Remove all elements
- `toArray(): T[]` - Convert to array (front to rear)
- `contains(predicate: PredicateFn<T>): boolean` - Check for element
- `find(predicate: PredicateFn<T>): T | undefined` - Find element

##### Functional Operations

- `filter(predicate: PredicateFn<T>): Queue<T>` - Create filtered queue
- `map<U>(mapper: MapperFn<T, U>): Queue<U>` - Transform elements
- `forEach(callback: (value: T, index: number) => void): void` - Iterate

##### Iteration

- `[Symbol.iterator]()` - Iterate front to rear

##### Utility

- `clone(): Queue<T>` - Create shallow copy
- `toString(): string` - String representation
- `toJSON()` - JSON representation

##### Static Methods

- `Queue.from<T>(iterable: Iterable<T>, options?): Queue<T>`
- `Queue.of<T>(...elements: T[]): Queue<T>`

## Advanced Usage

### With Custom Types

```typescript
type Status = 'pending' | 'active' | 'completed'

interface Operation {
  id: string
  status: Status
  timestamp: Date
}

const operations = new Stack<Operation>({
  maxCapacity: 1000,
  initialElements: [{ id: 'op1', status: 'pending', timestamp: new Date() }]
})
```

### Capacity Management

```typescript
import { Stack, CapacityMode } from '@ds-algo.ts/ds'

const boundedStack = new Stack<number>({
  maxCapacity: 10,
  capacityMode: CapacityMode.BOUNDED
})

console.log(boundedStack.remainingCapacity()) // 10
boundedStack.push(1)
console.log(boundedStack.remainingCapacity()) // 9

try {
  for (let i = 0; i < 20; i++) {
    boundedStack.push(i)
  }
} catch (error) {
  console.log('Stack is full!')
}
```

### Complex Generics

```typescript
// Nested generics
const stackOfStacks = new Stack<Stack<number>>()
stackOfStacks.push(Stack.of(1, 2, 3))
stackOfStacks.push(Stack.of(4, 5, 6))

// With mapped types
type ReadOnly<T> = { readonly [K in keyof T]: T[K] }
const readOnlyStack = new Stack<ReadOnly<{ value: number }>>()

// With conditional types
type Nullable<T> = T | null
const nullableStack = new Stack<Nullable<string>>()
nullableStack.push('hello')
nullableStack.push(null)
```

## Performance

### Stack

| Operation | Time Complexity | Space Complexity |
| --------- | --------------- | ---------------- |
| push      | O(1)\*          | O(1)             |
| pop       | O(1)            | O(1)             |
| peek      | O(1)            | O(1)             |
| size      | O(1)            | O(1)             |
| clear     | O(1)            | O(1)             |
| toArray   | O(n)            | O(n)             |
| filter    | O(n)            | O(n)             |
| map       | O(n)            | O(n)             |
| clone     | O(n)            | O(n)             |

### Queue

| Operation | Time Complexity | Space Complexity |
| --------- | --------------- | ---------------- |
| enqueue   | O(1)\*          | O(1)             |
| dequeue   | O(n)            | O(1)             |
| peekFront | O(1)            | O(1)             |
| peekRear  | O(1)            | O(1)             |
| size      | O(1)            | O(1)             |
| clear     | O(1)            | O(1)             |
| toArray   | O(n)            | O(n)             |
| filter    | O(n)            | O(n)             |
| map       | O(n)            | O(n)             |
| clone     | O(n)            | O(n)             |

\*Amortized time complexity

## License

MIT
