# Contributing to ds-algo.ts

Thank you for your interest in contributing! This guide will help you get started.

## Development Setup

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 10.0.0

### Getting Started

1. Clone the repository
2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Build packages (required for cross-package imports):

   ```bash
   pnpm build
   ```

4. Run tests:
   ```bash
   pnpm test
   ```

## Project Structure

```
ds-algo.ts/
├── packages/
│   ├── shared/    # Common types, utilities, and errors
│   ├── ds/        # Data structures
│   └── algo/      # Algorithms
├── examples/      # Usage examples
└── ...
```

## Adding a New Data Structure

1. Create the implementation file in `packages/ds/src/{category}/`:

   ```typescript
   // packages/ds/src/linear/queue.ts
   import type { Collection } from '@ds-algo.ts/shared'

   export interface QueueOptions<T> {
     // Options...
   }

   export class Queue<T> implements Collection<T> {
     // Implementation with comprehensive generics...
   }
   ```

2. Create comprehensive tests:

   ```typescript
   // packages/ds/src/linear/queue.test.ts
   import { describe, it, expect } from 'vitest'
   import { Queue } from './queue.js'

   describe('Queue', () => {
     // Test cases...
   })
   ```

3. Export from category index:

   ```typescript
   // packages/ds/src/linear/index.ts
   export { Queue } from './queue.js'
   export type { QueueOptions } from './queue.js'
   ```

4. Export from package index:

   ```typescript
   // packages/ds/src/index.ts
   export { Queue } from './linear/queue.js'
   export type { QueueOptions } from './linear/queue.js'
   ```

5. Update package.json exports if needed:
   ```json
   {
     "exports": {
       "./linear": {
         "import": "./dist/linear/index.js",
         "types": "./dist/linear/index.d.ts"
       }
     }
   }
   ```

## Adding a New Algorithm

1. Create the implementation in `packages/algo/src/{category}/`:

   ```typescript
   // packages/algo/src/sorting/quick-sort.ts
   import type { CompareFn } from '@ds-algo.ts/shared'
   import { defaultComparator } from '@ds-algo.ts/shared'

   /**
    * Quick sort implementation
    * Time Complexity: O(n log n) average, O(n²) worst
    * Space Complexity: O(log n)
    * @template T - Element type
    */
   export function quickSort<T>(array: T[], compareFn: CompareFn<T> = defaultComparator): T[] {
     // Implementation...
   }
   ```

2. Follow the same export pattern as data structures

## Guidelines

### TypeScript & Generics

1. **Use specific generic constraints**:

   ```typescript
   // Good
   function process<T extends Comparable>(item: T): void

   // Avoid overly generic
   function process<T>(item: T): void
   ```

2. **Document type parameters**:

   ```typescript
   /**
    * @template T - The type of elements in the collection
    * @template K - The key type for comparison
    */
   ```

3. **Provide type-safe options**:
   ```typescript
   export interface StackOptions<T> {
     maxCapacity?: number
     initialElements?: Iterable<T>
   }
   ```

### Documentation

1. **JSDoc for all public APIs**:

   ````typescript
   /**
    * Pushes an element onto the stack
    * Time Complexity: O(1) amortized
    * Space Complexity: O(1)
    *
    * @param element - The element to push
    * @returns The stack instance for chaining
    * @throws {CapacityError} If stack is full
    *
    * @example
    * ```typescript
    * const stack = new Stack<number>();
    * stack.push(42);
    * ```
    */
   ````

2. **Include complexity analysis**
3. **Provide clear examples**
4. **Document edge cases and errors**

### Testing

1. **Comprehensive test coverage**:
   - Basic operations
   - Edge cases (empty, single element, large)
   - Error conditions
   - Generic type variations
   - Performance characteristics

2. **Test organization**:

   ```typescript
   describe('Stack', () => {
     describe('Constructor', () => {
       /* ... */
     })
     describe('Basic Operations', () => {
       /* ... */
     })
     describe('Edge Cases', () => {
       /* ... */
     })
     describe('Generic Types', () => {
       /* ... */
     })
   })
   ```

3. **Use descriptive test names**:
   ```typescript
   it('should throw error when popping from empty stack', () => {
     // ...
   })
   ```

### Code Style

1. **Follow existing patterns**
2. **Use TypeScript strict mode**
3. **Prefer `const` over `let`**
4. **Use meaningful variable names**
5. **Keep functions focused and small**

### Performance

1. **Document time and space complexity**
2. **Optimize hot paths**
3. **Avoid unnecessary allocations**
4. **Consider edge cases (empty, single element, large datasets)**

## Pull Request Process

1. Create a feature branch
2. Implement your changes with tests
3. Run the full test suite: `pnpm test`
4. Run type checking: `pnpm type-check`
5. Build all packages: `pnpm build`
6. Update relevant documentation
7. Submit a pull request with:
   - Clear description of changes
   - Motivation for the change
   - Any breaking changes noted

## Code Review

All submissions require review. We look for:

- Correct implementation
- Comprehensive tests
- Clear documentation
- Type safety
- Performance considerations
- Consistent code style

## Questions?

Feel free to open an issue for:

- Feature requests
- Bug reports
- Documentation improvements
- General questions

Thank you for contributing! 🎉
