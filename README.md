# ds-algo.ts

A high-performance, type-safe TypeScript library for data structures and algorithms with comprehensive generic support.

## 📦 Packages

This monorepo contains three independently publishable packages:

### [@ds-algo.ts/shared](./packages/shared)

Common types, interfaces, enums, and utilities used across all packages.

```typescript
import { CompareFn, EmptyStructureError, CapacityMode } from '@ds-algo.ts/shared'
```

### [@ds-algo.ts/ds](./packages/ds)

High-performance data structure implementations.

```typescript
import { Stack } from '@ds-algo.ts/ds'
import { Stack } from '@ds-algo.ts/ds/linear' // Specific category
```

### [@ds-algo.ts/algo](./packages/algo)

Efficient algorithm implementations.

```typescript
import { binarySearch } from '@ds-algo.ts/algo'
import { binarySearch } from '@ds-algo.ts/algo/searching' // Specific category
```

## 🚀 Features

- **🎯 Type-Safe**: Comprehensive TypeScript generics with strict type checking
- **⚡ High Performance**: Optimized implementations with documented time complexities
- **📦 Tree-Shakeable**: Import only what you need
- **🧪 Well Tested**: Comprehensive test coverage with Vitest
- **📖 Well Documented**: Detailed JSDoc comments and examples
- **🔧 Monorepo Structure**: Independent packages that work together seamlessly

## 📚 Quick Start

### Installation

```bash
# Install individual packages
pnpm add @ds-algo.ts/ds
pnpm add @ds-algo.ts/algo
pnpm add @ds-algo.ts/shared

# Or all together
pnpm add @ds-algo.ts/ds @ds-algo.ts/algo @ds-algo.ts/shared
```

### Basic Usage

```typescript
import { Stack } from '@ds-algo.ts/ds'
import { binarySearch } from '@ds-algo.ts/algo'

// Create a type-safe stack
const stack = new Stack<number>()
stack.push(1)
stack.push(2)
stack.push(3)

console.log(stack.peek()) // 3
console.log(stack.pop()) // 3

// Use algorithms with generics
const numbers = [1, 3, 5, 7, 9, 11, 13]
const index = binarySearch(numbers, 7) // 3

// With custom objects
interface User {
  id: number
  name: string
}

const users: User[] = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' }
]

const result = binarySearch(users, { id: 2, name: 'Bob' }, { compareFn: (a, b) => a.id - b.id })
```

## 🎓 Generic Type Examples

### Basic Generics

```typescript
// Primitives
const numberStack = new Stack<number>()
const stringStack = new Stack<string>()
const boolStack = new Stack<boolean>()

// Objects
interface Task {
  id: number
  title: string
}

const taskStack = new Stack<Task>()
```

### Advanced Generics

```typescript
// Union types
type Value = number | string | boolean
const mixedStack = new Stack<Value>()

// Nested generics
const stackOfStacks = new Stack<Stack<number>>()

// Conditional types
type Nullable<T> = T | null
const nullableStack = new Stack<Nullable<string>>()

// Mapped types
type ReadOnly<T> = { readonly [K in keyof T]: T[K] }
const readOnlyStack = new Stack<ReadOnly<Task>>()
```

## 🛠️ Development

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 10.0.0

### Setup

```bash
# Clone the repository
git clone <repository-url>
cd ds-algo.ts

# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run tests
pnpm test

# Run tests for specific package
pnpm test:ds
pnpm test:algo
```

### Build Individual Packages

```bash
# Build in order (shared must be built first)
pnpm build:shared
pnpm build:ds
pnpm build:algo
```

### Development Mode

```bash
# Watch mode for all packages
pnpm dev

# Watch mode for specific package
pnpm --filter @ds-algo.ts/shared dev
```

## 📁 Project Structure

```
ds-algo.ts/
├── packages/
│   ├── shared/          # Common types and utilities
│   │   ├── src/
│   │   │   ├── types/
│   │   │   ├── enums/
│   │   │   ├── utils/
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   ├── ds/              # Data structures
│   │   ├── src/
│   │   │   ├── linear/  # Stack, Queue, etc.
│   │   │   ├── tree/    # Binary Tree, AVL, etc.
│   │   │   ├── graph/   # Graph implementations
│   │   │   ├── heap/    # Min/Max Heap
│   │   │   ├── hash/    # Hash Table, etc.
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   └── algo/            # Algorithms
│       ├── src/
│       │   ├── sorting/      # Quick Sort, Merge Sort, etc.
│       │   ├── searching/    # Binary Search, etc.
│       │   ├── graph/        # DFS, BFS, Dijkstra, etc.
│       │   ├── string/       # Pattern matching, etc.
│       │   ├── dynamic-programming/
│       │   └── index.ts
│       └── package.json
│
├── examples/            # Usage examples
├── vite.config.ts       # Build configuration
├── vitest.config.ts     # Test configuration
├── tsconfig.base.json   # Base TypeScript config
├── pnpm-workspace.yaml  # Workspace configuration
└── package.json         # Root package.json
```

## 📖 Documentation

Each package has its own README with detailed documentation:

- [Shared Package Documentation](./packages/shared/README.md)
- [Data Structures Documentation](./packages/ds/README.md)
- [Algorithms Documentation](./packages/algo/README.md)

See the [examples](./examples) directory for comprehensive usage examples.

## 🧪 Testing

All packages include comprehensive tests:

```bash
# Run all tests
pnpm test

# Run tests with coverage
pnpm test -- --coverage

# Run tests in watch mode
pnpm --filter @ds-algo.ts/ds test:watch
```

## 🎯 Design Principles

1. **Type Safety First**: Leverage TypeScript's type system to catch errors at compile time
2. **Generic by Design**: All data structures and algorithms support comprehensive generics
3. **Performance**: Optimized implementations with documented time/space complexity
4. **Immutability Where Appropriate**: Functional operations return new instances
5. **Fail Fast**: Clear error messages with custom error types
6. **Flexibility**: Configurable options for different use cases
7. **Documentation**: Extensive JSDoc comments and examples

## 📊 Performance

All operations include documented time and space complexity:

```typescript
/**
 * Pushes an element onto the stack
 * Time Complexity: O(1) amortized
 * Space Complexity: O(1)
 */
push(element: T): this;
```

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Maintain strict TypeScript typing
2. Include comprehensive tests
3. Document time/space complexity
4. Add JSDoc comments
5. Follow existing code style
6. Update relevant README files

## 📄 License

MIT

## 🔗 Related Projects

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Generic Programming in TypeScript](https://www.typescriptlang.org/docs/handbook/2/generics.html)

## 📞 Support

For issues, questions, or contributions, please open an issue on the repository.

---

**Built with ❤️ using TypeScript and modern build tools**
