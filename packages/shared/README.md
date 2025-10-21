# @ds-algo.ts/shared

Common types, interfaces, enums, and utilities for the ds-algo.ts library.

## Installation

```bash
npm install @ds-algo.ts/shared
# or
pnpm add @ds-algo.ts/shared
# or
yarn add @ds-algo.ts/shared
```

## Exports

### Types

```typescript
import type {
  CompareFn,
  EqualsFn,
  PredicateFn,
  MapperFn,
  ReducerFn,
  IteratorResult,
  Collection
} from '@ds-algo.ts/shared'
```

#### `CompareFn<T>`

Function type for comparing two values, returns negative if `a < b`, zero if equal, positive if `a > b`.

#### `EqualsFn<T>`

Function type for checking equality between two values.

#### `PredicateFn<T>`

Function type for testing conditions on values.

#### `MapperFn<T, U>`

Function type for transforming values from type `T` to type `U`.

#### `ReducerFn<T, U>`

Function type for reducing/folding values.

#### `Collection<T>`

Interface defining basic collection operations (size, isEmpty, clear, toArray).

### Errors

```typescript
import {
  DSAlgoError,
  EmptyStructureError,
  IndexOutOfBoundsError,
  CapacityError,
  InvalidOperationError
} from '@ds-algo.ts/shared'
```

Custom error classes for better error handling:

- **DSAlgoError**: Base error class
- **EmptyStructureError**: Thrown when accessing empty structures
- **IndexOutOfBoundsError**: Thrown for invalid index access
- **CapacityError**: Thrown when capacity limits are exceeded
- **InvalidOperationError**: Thrown for invalid operations

### Enums

```typescript
import { TraversalOrder, SortOrder, ComparisonResult, CapacityMode } from '@ds-algo.ts/shared'
```

- **TraversalOrder**: Tree traversal orders (in-order, pre-order, post-order, level-order)
- **SortOrder**: Sorting orders (ascending, descending)
- **ComparisonResult**: Comparison results (-1, 0, 1)
- **CapacityMode**: Structure capacity modes (fixed, dynamic, bounded)

### Utilities

```typescript
import { defaultComparator, reverseComparator, defaultEquals, compareByKey, equalsByKey } from '@ds-algo.ts/shared'
```

#### Comparator Functions

```typescript
// Default comparator for primitives
const nums = [3, 1, 2]
nums.sort(defaultComparator) // [1, 2, 3]

// Reverse any comparator
const descendingComparator = reverseComparator(defaultComparator)
nums.sort(descendingComparator) // [3, 2, 1]

// Compare by key
interface Person {
  name: string
  age: number
}

const people: Person[] = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 }
]

people.sort(compareByKey((p) => p.age)) // Sort by age

// Equality by key
const areEqual = equalsByKey<Person, number>((p) => p.age)(people[0], people[1]) // false
```

## Usage Examples

### Working with Custom Types

```typescript
import type { CompareFn, Collection } from '@ds-algo.ts/shared'
import { defaultComparator, compareByKey } from '@ds-algo.ts/shared'

// Custom comparable class
class Product {
  constructor(
    public id: number,
    public name: string,
    public price: number
  ) {}
}

// Compare by price
const priceComparator: CompareFn<Product> = compareByKey((p) => p.price)

const products = [new Product(1, 'Widget', 29.99), new Product(2, 'Gadget', 19.99), new Product(3, 'Tool', 39.99)]

products.sort(priceComparator)
console.log(products[0].name) // 'Gadget' (cheapest)
```

### Error Handling

```typescript
import { Stack } from '@ds-algo.ts/ds'
import { EmptyStructureError } from '@ds-algo.ts/shared'

const stack = new Stack<number>()

try {
  stack.pop() // Stack is empty
} catch (error) {
  if (error instanceof EmptyStructureError) {
    console.log('Cannot pop from empty stack')
  }
}

// Or use safe operations
const value = stack.popSafe() // Returns undefined instead of throwing
```

### Using Enums

```typescript
import { Stack } from '@ds-algo.ts/ds'
import { CapacityMode } from '@ds-algo.ts/shared'

const boundedStack = new Stack<string>({
  maxCapacity: 100,
  capacityMode: CapacityMode.BOUNDED
})

const dynamicStack = new Stack<string>({
  capacityMode: CapacityMode.DYNAMIC
})
```

## TypeScript Support

This package is written in TypeScript and provides full type definitions. All types are properly exported for maximum type safety.

```typescript
// Type inference works automatically
import { defaultComparator } from '@ds-algo.ts/shared'

const numbers = [3, 1, 2]
numbers.sort(defaultComparator) // TypeScript knows this is number[]

// Explicit type parameters
import type { CompareFn } from '@ds-algo.ts/shared'

const stringComparator: CompareFn<string> = (a, b) => {
  return a.localeCompare(b)
}
```

## License

MIT
