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

# Or using Node.js (if compiled)
node examples/stack-usage.ts
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

## Example Structure

Each example follows this pattern:

```typescript
// Import necessary types and classes
import { Stack } from '../packages/ds/src/index.js'

// Define interfaces/types if needed
interface MyType {
  // ...
}

// Example function
function exampleName() {
  console.log('=== Example Title ===')

  // Example code with detailed comments
  const stack = new Stack<MyType>()

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
```

### Functional Operations

```typescript
const numbers = Stack.of(1, 2, 3, 4, 5)

const result = numbers.filter((n) => n % 2 === 0).map((n) => n * 2)

console.log(result.toArray()) // [10, 8, 4]
```

### Error Handling

```typescript
import { EmptyStructureError } from '@ds-algo.ts/shared'

try {
  stack.pop()
} catch (error) {
  if (error instanceof EmptyStructureError) {
    console.log('Stack is empty')
  }
}

// Or use safe operations
const value = stack.popSafe() // Returns undefined
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
