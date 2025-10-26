# Examples

This directory contains comprehensive examples demonstrating the usage of ds-algo.ts packages with TypeScript generics.

## Running Examples

### Prerequisites

Make sure all packages are built first:

```bash
# From the root directory
pnpm install
pnpm build
```

### Run Examples

```bash
# Using tsx (recommended for development)
npx tsx examples/stack-usage.ts
npx tsx examples/queue-usage.ts
npx tsx examples/deque-usage.ts

# Or using Node.js (if compiled)
node examples/stack-usage.ts
node examples/queue-usage.ts
node examples/deque-usage.ts
```

## Available Examples

### `stack-usage.ts`

Comprehensive Stack data structure examples covering:

1. **Basic Usage** - Simple push/pop operations
2. **Custom Objects** - Working with complex types
3. **Generic Constraints** - Type constraints and interfaces
4. **Nested Generics** - Stack of stacks and complex nesting
5. **Union Types** - Mixed type stacks and nullable values
6. **Functional Programming** - Map, filter, reduce patterns
7. **Capacity Management** - Bounded stacks and capacity tracking
8. **Iteration** - Different iteration patterns
9. **Cloning** - Deep/shallow copying
10. **Advanced Types** - Conditional, mapped, and partial types

### `queue-usage.ts`

Comprehensive Queue data structure examples covering:

1. **Basic Usage** - Simple enqueue/dequeue operations
2. **Custom Objects** - Working with complex types
3. **Print Job Queue** - Real-world print queue simulation
4. **Nested Generics** - Queue of queues and complex nesting
5. **Union Types** - Mixed type queues and nullable values
6. **Functional Programming** - Map, filter, forEach patterns
7. **Capacity Management** - Bounded queues and capacity tracking
8. **Iteration** - Front-to-rear iteration patterns
9. **Cloning** - Shallow copying and immutability
10. **Customer Service Queue** - FIFO service simulation
11. **Event Processing** - Event handling queue
12. **Advanced Types** - Conditional, mapped, and partial types

### `deque-usage.ts`

Comprehensive Deque (Double-Ended Queue) data structure examples covering:

1. **Basic Usage** - Adding and removing from both ends
2. **Custom Objects** - Priority task management
3. **Sliding Window Maximum** - Algorithm implementation
4. **Palindrome Checker** - String validation with deque
5. **Browser History** - Navigation simulation
6. **Work Stealing Queue** - Multi-threaded work distribution
7. **Undo/Redo System** - Command pattern implementation
8. **Functional Programming** - Map, filter, reverse patterns
9. **Iteration** - Front-to-rear and rear-to-front patterns
10. **Multi-Priority Scheduler** - Task scheduling system
11. **Advanced Types** - Conditional, mapped, and partial types

## Example Structure

Each example follows this pattern:

```typescript
// Import necessary types and classes
import { Stack, Queue, Deque } from '../packages/ds/src/index.js'

// Define interfaces/types if needed
interface MyType {
  // ...
}

// Example function
function exampleName() {
  console.log('=== Example Title ===')

  // Example code with detailed comments
  const stack = new Stack<MyType>()
  const queue = new Queue<MyType>()
  const deque = new Deque<MyType>()

  // Show results
  console.log('Result:' /* ... */)
  console.log('')
}

// Export for reuse
export { exampleName }
```

## Creating Your Own Examples

1. Create a new file in the `examples/` directory
2. Import the packages you need
3. Write clear, documented examples
4. Include console output for verification
5. Export functions for potential reuse

Example template:

```typescript
/**
 * My Custom Example
 * Description of what this example demonstrates
 */

import { Stack } from '../packages/ds/src/index.js'
import { binarySearch } from '../packages/algo/src/index.js'

function myCustomExample() {
  console.log('=== My Custom Example ===')

  // Your example code here

  console.log('')
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  myCustomExample()
}

export { myCustomExample }
```

## Tips for Learning

1. **Start Simple** - Begin with basic examples
2. **Experiment** - Modify examples and observe results
3. **Type Safety** - Pay attention to TypeScript errors
4. **Performance** - Note complexity in comments
5. **Read Tests** - Check `*.test.ts` files for more examples

## Common Patterns

### Generic Type Safety

```typescript
// Define strict types
interface Task {
  id: number
  title: string
}

// Type-safe stack
const tasks = new Stack<Task>()
tasks.push({ id: 1, title: 'Example' }) // OK
// tasks.push({ wrong: 'type' }); // Error!

// Type-safe queue
const taskQueue = new Queue<Task>()
taskQueue.enqueue({ id: 1, title: 'Example' }) // OK
// taskQueue.enqueue({ wrong: 'type' }); // Error!

// Type-safe deque
const taskDeque = new Deque<Task>()
taskDeque.addRear({ id: 1, title: 'Example' }) // OK
taskDeque.addFront({ id: 2, title: 'Urgent' }) // OK
// taskDeque.addRear({ wrong: 'type' }); // Error!
```

### Functional Operations

```typescript
// Stack operations (LIFO)
const stackNumbers = Stack.of(1, 2, 3, 4, 5)
const stackResult = stackNumbers.filter((n) => n % 2 === 0).map((n) => n * 2)
console.log(stackResult.toArray()) // [10, 8, 4]

// Queue operations (FIFO)
const queueNumbers = Queue.of(1, 2, 3, 4, 5)
const queueResult = queueNumbers.filter((n) => n % 2 === 0).map((n) => n * 2)
console.log(queueResult.toArray()) // [4, 8, 10]

// Deque operations (Double-ended)
const dequeNumbers = Deque.of(1, 2, 3, 4, 5)
const dequeResult = dequeNumbers.filter((n) => n % 2 === 0).map((n) => n * 2)
console.log(dequeResult.toArray()) // [4, 8, 10]
console.log(dequeResult.reversed().toArray()) // [10, 8, 4]
```

### Error Handling

```typescript
import { EmptyStructureError } from '@ds-algo.ts/shared'

// Stack error handling
try {
  stack.pop()
} catch (error) {
  if (error instanceof EmptyStructureError) {
    console.log('Stack is empty')
  }
}

// Queue error handling
try {
  queue.dequeue()
} catch (error) {
  if (error instanceof EmptyStructureError) {
    console.log('Queue is empty')
  }
}

// Deque error handling
try {
  deque.removeFront() // or deque.removeRear()
} catch (error) {
  if (error instanceof EmptyStructureError) {
    console.log('Deque is empty')
  }
}

// Or use safe operations
const stackValue = stack.popSafe() // Returns undefined if empty
const queueValue = queue.dequeueSafe() // Returns undefined if empty
const dequeFront = deque.removeFrontSafe() // Returns undefined if empty
const dequeRear = deque.removeRearSafe() // Returns undefined if empty
```

## Next Steps

- Explore the main README: `../README.md`
- Read package documentation in `../packages/*/README.md`
- Check out the test files for edge cases
- Try implementing your own data structures

## Contributing Examples

If you create useful examples, consider contributing them:

1. Ensure code is well-documented
2. Include clear output examples
3. Follow the existing style
4. Submit a pull request

Happy coding! 🚀
