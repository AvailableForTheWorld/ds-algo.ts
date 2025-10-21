# Quick Start Guide

Get up and running with ds-algo.ts in minutes!

## 🚀 Installation & Setup

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Build Packages

Build packages in order (shared → ds → algo):

```bash
# Build all packages
pnpm build

# Or build individually
pnpm build:shared
pnpm build:ds
pnpm build:algo
```

### 3. Run Tests

```bash
# Run all tests
pnpm test

# Run specific package tests
pnpm test:ds
pnpm test:algo

# Watch mode
pnpm --filter @ds-algo.ts/ds test:watch
```

## 📚 First Steps

### Using the Stack Data Structure

Create a new file `demo.ts`:

```typescript
import { Stack } from '@ds-algo.ts/ds'

// Create a type-safe stack
const stack = new Stack<number>()

// Push elements
stack.push(1)
stack.push(2)
stack.push(3)

console.log('Size:', stack.size()) // 3
console.log('Top:', stack.peek()) // 3
console.log('Pop:', stack.pop()) // 3
console.log('New top:', stack.peek()) // 2

// Method chaining
stack.push(10).push(20).push(30)

console.log('Stack:', stack.toArray()) // [30, 20, 10, 2, 1]
```

### Using Algorithms

```typescript
import { binarySearch } from '@ds-algo.ts/algo'

const numbers = [1, 3, 5, 7, 9, 11, 13]
const index = binarySearch(numbers, 7)
console.log('Found at index:', index) // 3
```

### Working with Custom Types

```typescript
import { Stack } from '@ds-algo.ts/ds'
import { binarySearch } from '@ds-algo.ts/algo'

interface User {
  id: number
  name: string
  email: string
}

// Type-safe stack
const userStack = new Stack<User>()
userStack.push({
  id: 1,
  name: 'Alice',
  email: 'alice@example.com'
})

// Search with custom comparator
const users: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com' }
]

const found = binarySearch(
  users,
  { id: 2, name: 'Bob', email: 'bob@example.com' },
  { compareFn: (a, b) => a.id - b.id }
)

console.log('User found at:', found) // 1
```

## 🎯 Key Concepts

### 1. Generic Type Safety

All data structures and algorithms are fully generic:

```typescript
// Primitives
const numberStack = new Stack<number>()
const stringStack = new Stack<string>()

// Custom types
interface Task {
  id: number
  title: string
}
const taskStack = new Stack<Task>()

// Union types
type Value = number | string | boolean
const mixedStack = new Stack<Value>()

// Nested generics
const stackOfStacks = new Stack<Stack<number>>()
```

### 2. Functional Operations

```typescript
const numbers = Stack.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)

// Chain operations
const result = numbers
  .filter((n) => n % 2 === 0) // Keep even numbers
  .map((n) => n * 2) // Double them
  .filter((n) => n > 8) // Keep > 8

console.log(result.toArray()) // [20, 16, 12, 10]
```

### 3. Error Handling

```typescript
import { Stack } from '@ds-algo.ts/ds'
import { EmptyStructureError, CapacityError } from '@ds-algo.ts/shared'

const stack = new Stack<number>({ maxCapacity: 3 })

// Option 1: Try-catch
try {
  stack.pop() // Empty stack
} catch (error) {
  if (error instanceof EmptyStructureError) {
    console.log('Stack is empty!')
  }
}

// Option 2: Safe methods (no exceptions)
const value = stack.popSafe() // undefined instead of throwing
const top = stack.peekSafe() // undefined instead of throwing

// Capacity errors
try {
  stack.push(1).push(2).push(3).push(4) // Exceeds capacity
} catch (error) {
  if (error instanceof CapacityError) {
    console.log('Stack is full!')
  }
}
```

### 4. Iteration

```typescript
const stack = Stack.of('A', 'B', 'C', 'D', 'E')

// Top to bottom
for (const item of stack) {
  console.log(item) // E, D, C, B, A
}

// Bottom to top
for (const item of stack.bottomToTop()) {
  console.log(item) // A, B, C, D, E
}

// Spread operator
const array = [...stack] // ['E', 'D', 'C', 'B', 'A']
```

## 🔧 Development Workflow

### Watch Mode

```bash
# Watch all packages
pnpm dev

# Watch specific package
pnpm --filter @ds-algo.ts/ds dev
```

### Type Checking

```bash
pnpm type-check
```

### Running Examples

```bash
# Build first
pnpm build

# Run examples
npx tsx examples/stack-usage.ts
```

## 📦 Package Exports

### Main Exports

```typescript
// Get everything from a package
import { Stack } from '@ds-algo.ts/ds'
import { binarySearch } from '@ds-algo.ts/algo'

// Specific categories (tree-shakeable)
import { Stack } from '@ds-algo.ts/ds/linear'
import { binarySearch } from '@ds-algo.ts/algo/searching'

// Shared utilities
import { EmptyStructureError, CapacityMode } from '@ds-algo.ts/shared'
import type { CompareFn, Collection } from '@ds-algo.ts/shared'
```

## 🎓 Learning Path

1. **Start with Stack** - `examples/stack-usage.ts`
2. **Read the tests** - `packages/ds/src/linear/stack.test.ts`
3. **Explore algorithms** - `packages/algo/src/searching/binary-search.ts`
4. **Check shared types** - `packages/shared/src/types/common.ts`
5. **Build your own** - Follow `CONTRIBUTING.md`

## ⚡ Performance Tips

1. **Use appropriate data structures** - Stack for LIFO, Queue for FIFO
2. **Leverage type inference** - Let TypeScript infer types when possible
3. **Check complexity** - Read JSDoc comments for time/space complexity
4. **Profile before optimizing** - Measure actual performance
5. **Consider capacity limits** - Pre-allocate if you know the size

## 🐛 Troubleshooting

### Build Errors

```bash
# Clean and rebuild
pnpm clean
pnpm install
pnpm build
```

### Type Errors

Make sure shared package is built first:

```bash
pnpm build:shared
```

### Import Errors

Use `.js` extensions in imports (even for TypeScript files):

```typescript
// Correct
import { Stack } from './stack.js'

// Incorrect
import { Stack } from './stack'
```

## 📖 Next Steps

- Read the main [README.md](./README.md)
- Explore [examples/](./examples/)
- Check [CONTRIBUTING.md](./CONTRIBUTING.md) to add features
- Browse package-specific READMEs in `packages/*/README.md`

## 💡 Tips

- Use TypeScript strict mode for maximum type safety
- Read JSDoc comments for detailed API documentation
- Check test files for edge cases and examples
- Use safe methods (`popSafe()`, `peekSafe()`) when appropriate
- Leverage method chaining for cleaner code

## 🤝 Getting Help

- Open an issue for bugs or questions
- Check existing tests for usage patterns
- Review examples directory
- Read package documentation

Happy coding! 🎉
