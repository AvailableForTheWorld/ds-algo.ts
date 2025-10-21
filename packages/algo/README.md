# @ds-algo.ts/algo

High-performance TypeScript algorithms library with comprehensive type safety.

## Installation

```bash
npm install @ds-algo.ts/algo
# or
pnpm add @ds-algo.ts/algo
# or
yarn add @ds-algo.ts/algo
```

## Features

- 🎯 **Type-Safe**: Fully typed with TypeScript generics
- 🚀 **High Performance**: Optimized implementations
- 📦 **Tree-Shakeable**: Import only what you need
- 🧪 **Well Tested**: Comprehensive test coverage
- 📖 **Well Documented**: Detailed JSDoc comments

## Algorithms

### Searching

#### Binary Search

Searches for a target value in a sorted array using binary search algorithm.

```typescript
import { binarySearch } from '@ds-algo.ts/algo'

// Basic usage with numbers
const numbers = [1, 3, 5, 7, 9, 11, 13]
const index = binarySearch(numbers, 7) // 3

// Returns -1 if not found
const notFound = binarySearch(numbers, 6) // -1

// With custom objects and comparator
interface Product {
  id: number
  name: string
  price: number
}

const products: Product[] = [
  { id: 1, name: 'Widget', price: 19.99 },
  { id: 2, name: 'Gadget', price: 29.99 },
  { id: 3, name: 'Tool', price: 39.99 }
]

const result = binarySearch(products, { id: 2, name: 'Gadget', price: 29.99 }, { compareFn: (a, b) => a.id - b.id })
```

#### Binary Search Variants

```typescript
import {
  binarySearchDetailed,
  binarySearchFirst,
  binarySearchLast,
  binarySearchRange,
  lowerBound,
  upperBound
} from '@ds-algo.ts/algo'

// Get detailed results
const numbers = [1, 2, 3, 4, 5]
const detailed = binarySearchDetailed(numbers, 3)
console.log(detailed)
// {
//   index: 2,
//   found: true,
//   comparisons: 2,
//   insertionPoint: 2
// }

// Handle duplicates
const duplicates = [1, 2, 2, 2, 3, 4, 5]
const first = binarySearchFirst(duplicates, 2) // 1
const last = binarySearchLast(duplicates, 2) // 3
const range = binarySearchRange(duplicates, 2) // [1, 3]

// Lower and upper bounds
const sorted = [1, 3, 5, 7, 9]
const lb = lowerBound(sorted, 6) // 3 (index of first element >= 6)
const ub = upperBound(sorted, 6) // 3 (index of first element > 6)
```

### API Reference

#### `binarySearch<T>(array, target, options?): number`

- **Time Complexity**: O(log n)
- **Space Complexity**: O(1)
- **Returns**: Index of target or -1 if not found

#### `binarySearchDetailed<T>(array, target, options?): BinarySearchResult`

- **Time Complexity**: O(log n)
- **Space Complexity**: O(1)
- **Returns**: Detailed result with comparisons and insertion point

#### `binarySearchFirst<T>(array, target, options?): number`

- Finds first occurrence in array with duplicates
- **Time Complexity**: O(log n)
- **Returns**: Index of first occurrence or -1

#### `binarySearchLast<T>(array, target, options?): number`

- Finds last occurrence in array with duplicates
- **Time Complexity**: O(log n)
- **Returns**: Index of last occurrence or -1

#### `binarySearchRange<T>(array, target, options?): [number, number]`

- Finds range of all occurrences
- **Time Complexity**: O(log n)
- **Returns**: [firstIndex, lastIndex] or [-1, -1]

#### `lowerBound<T>(array, target, options?): number`

- Finds first element >= target
- **Time Complexity**: O(log n)
- **Returns**: Index or array.length

#### `upperBound<T>(array, target, options?): number`

- Finds first element > target
- **Time Complexity**: O(log n)
- **Returns**: Index or array.length

## Advanced Usage

### With Generic Types

```typescript
import { binarySearch } from '@ds-algo.ts/algo'

// String array
const words = ['apple', 'banana', 'cherry', 'date']
const index = binarySearch(words, 'banana') // 1

// Date array
const dates = [new Date('2024-01-01'), new Date('2024-06-01'), new Date('2024-12-01')]

const dateIndex = binarySearch(dates, new Date('2024-06-01'), {
  compareFn: (a, b) => a.getTime() - b.getTime()
})
```

### With Complex Objects

```typescript
interface User {
  id: number
  username: string
  score: number
}

const users: User[] = [
  { id: 1, username: 'alice', score: 100 },
  { id: 2, username: 'bob', score: 200 },
  { id: 3, username: 'charlie', score: 300 }
]

// Search by different fields
const byId = binarySearch(users, { id: 2, username: '', score: 0 }, { compareFn: (a, b) => a.id - b.id })

const byScore = binarySearch(
  users.sort((a, b) => a.score - b.score),
  { id: 0, username: '', score: 200 },
  { compareFn: (a, b) => a.score - b.score }
)
```

### Range Searching

```typescript
import { lowerBound, upperBound } from '@ds-algo.ts/algo'

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// Find all numbers in range [4, 7]
const start = lowerBound(numbers, 4) // 3
const end = upperBound(numbers, 7) // 7

const inRange = numbers.slice(start, end) // [4, 5, 6, 7]
```

## Performance

| Algorithm           | Time Complexity | Space Complexity |
| ------------------- | --------------- | ---------------- |
| Binary Search       | O(log n)        | O(1)             |
| Binary Search First | O(log n)        | O(1)             |
| Binary Search Last  | O(log n)        | O(1)             |
| Binary Search Range | O(log n)        | O(1)             |
| Lower Bound         | O(log n)        | O(1)             |
| Upper Bound         | O(log n)        | O(1)             |

## Coming Soon

More algorithms will be added:

- **Sorting**: Quick Sort, Merge Sort, Heap Sort
- **Graph**: DFS, BFS, Dijkstra, A\*
- **String**: KMP, Rabin-Karp, Boyer-Moore
- **Dynamic Programming**: LCS, Knapsack, Edit Distance

## License

MIT
