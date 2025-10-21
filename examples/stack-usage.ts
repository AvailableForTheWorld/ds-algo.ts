/**
 * Stack Usage Examples
 * Demonstrates various ways to use the Stack data structure with TypeScript generics
 */

import { Stack } from '../packages/ds/src/index'

// ============================================================================
// Example 1: Basic Usage with Primitives
// ============================================================================

function basicExample() {
  console.log('=== Basic Stack Example ===')

  const numberStack = new Stack<number>()

  // Push operations
  numberStack.push(10)
  numberStack.push(20)
  numberStack.push(30)

  console.log('Size:', numberStack.size()) // 3
  console.log('Top element:', numberStack.peek()) // 30

  // Pop operations
  console.log('Popped:', numberStack.pop()) // 30
  console.log('New top:', numberStack.peek()) // 20
  console.log('New size:', numberStack.size()) // 2

  console.log('')
}

// ============================================================================
// Example 2: Working with Custom Objects
// ============================================================================

interface Task {
  id: number
  title: string
  priority: 'low' | 'medium' | 'high'
  createdAt: Date
}

function customObjectExample() {
  console.log('=== Custom Object Example ===')

  const taskStack = new Stack<Task>({
    maxCapacity: 100,
    initialElements: [
      {
        id: 1,
        title: 'Setup project',
        priority: 'high',
        createdAt: new Date('2024-01-01')
      }
    ]
  })

  // Add more tasks
  taskStack.push({
    id: 2,
    title: 'Write documentation',
    priority: 'medium',
    createdAt: new Date('2024-01-02')
  })

  taskStack.push({
    id: 3,
    title: 'Code review',
    priority: 'high',
    createdAt: new Date('2024-01-03')
  })

  console.log('Total tasks:', taskStack.size())
  console.log('Current task:', taskStack.peek().title)

  // Filter high priority tasks
  const highPriorityTasks = taskStack.filter((task) => task.priority === 'high')
  console.log('High priority count:', highPriorityTasks.size())

  // Map to titles
  const taskTitles = taskStack.map((task) => task.title)
  console.log('Task titles:', taskTitles.toArray())

  console.log('')
}

// ============================================================================
// Example 3: Generic Constraints and Type Safety
// ============================================================================

// Define a constraint for comparable items
interface Comparable {
  compareTo(other: this): number
}

class Priority implements Comparable {
  constructor(
    public level: number,
    public label: string
  ) {}

  compareTo(other: Priority): number {
    return this.level - other.level
  }

  toString(): string {
    return `${this.label} (${this.level})`
  }
}

function genericConstraintExample() {
  console.log('=== Generic Constraint Example ===')

  // Stack of comparable items
  const priorityStack = new Stack<Priority>()

  priorityStack.push(new Priority(1, 'Low'))
  priorityStack.push(new Priority(5, 'Critical'))
  priorityStack.push(new Priority(3, 'Medium'))

  // Find highest priority
  const highest = priorityStack.toArray().sort((a, b) => b.compareTo(a))[0]

  console.log('Highest priority:', highest.toString())

  console.log('')
}

// ============================================================================
// Example 4: Nested Generics
// ============================================================================

interface Message<T> {
  id: string
  data: T
  timestamp: number
}

function nestedGenericsExample() {
  console.log('=== Nested Generics Example ===')

  // Stack of messages containing different data types
  const numberMessages = new Stack<Message<number>>()
  numberMessages.push({
    id: 'msg1',
    data: 42,
    timestamp: Date.now()
  })

  const stringMessages = new Stack<Message<string>>()
  stringMessages.push({
    id: 'msg2',
    data: 'Hello, World!',
    timestamp: Date.now()
  })

  // Stack of stacks
  const stackOfStacks = new Stack<Stack<number>>()
  stackOfStacks.push(Stack.of(1, 2, 3))
  stackOfStacks.push(Stack.of(4, 5, 6))
  stackOfStacks.push(Stack.of(7, 8, 9))

  console.log('Number of stacks:', stackOfStacks.size())
  console.log('Top stack:', stackOfStacks.peek().toArray())

  const innerStack = stackOfStacks.pop()
  console.log('Popped stack elements:', innerStack.toArray())

  console.log('')
}

// ============================================================================
// Example 5: Union Types and Nullable Values
// ============================================================================

type Result<T, E> = { success: true; value: T } | { success: false; error: E }

function unionTypesExample() {
  console.log('=== Union Types Example ===')

  // Stack with union types
  const mixedStack = new Stack<string | number | boolean>()
  mixedStack.push('hello')
  mixedStack.push(42)
  mixedStack.push(true)
  mixedStack.push('world')

  console.log('Mixed values:', mixedStack.toArray())

  // Stack with Result type
  const resultStack = new Stack<Result<number, string>>()
  resultStack.push({ success: true, value: 100 })
  resultStack.push({ success: false, error: 'Division by zero' })
  resultStack.push({ success: true, value: 200 })

  // Filter successful results
  const successfulResults = resultStack.filter((r) => r.success)
  console.log('Successful results:', successfulResults.size())

  // Nullable stack
  const nullableStack = new Stack<number | null>()
  nullableStack.push(1)
  nullableStack.push(null)
  nullableStack.push(2)

  console.log('Nullable values:', nullableStack.toArray())

  console.log('')
}

// ============================================================================
// Example 6: Functional Programming Patterns
// ============================================================================

function functionalExample() {
  console.log('=== Functional Programming Example ===')

  const numbers = Stack.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)

  // Chain operations
  const result = numbers
    .filter((n) => n % 2 === 0) // Keep even numbers
    .map((n) => n * 2) // Double them
    .filter((n) => n > 8) // Keep those > 8

  console.log('Transformed stack:', result.toArray())

  // Reduce-like operation using forEach
  let sum = 0
  numbers.forEach((n) => {
    sum += n
  })
  console.log('Sum of all numbers:', sum)

  console.log('')
}

// ============================================================================
// Example 7: Capacity Management
// ============================================================================

function capacityExample() {
  console.log('=== Capacity Management Example ===')

  const boundedStack = new Stack<string>({
    maxCapacity: 5
  })

  console.log('Initial capacity:', boundedStack.remainingCapacity())

  boundedStack.push('First')
  boundedStack.push('Second')
  boundedStack.push('Third')

  console.log('Remaining capacity:', boundedStack.remainingCapacity())
  console.log('Is full?', boundedStack.isFull())

  boundedStack.push('Fourth')
  boundedStack.push('Fifth')

  console.log('Is full now?', boundedStack.isFull())

  try {
    boundedStack.push('Sixth') // This will throw
  } catch (error) {
    console.log('Error caught:', (error as Error).message)
  }

  console.log('')
}

// ============================================================================
// Example 8: Iteration Patterns
// ============================================================================

function iterationExample() {
  console.log('=== Iteration Example ===')

  const stack = Stack.of('A', 'B', 'C', 'D', 'E')

  // Top to bottom iteration
  console.log('Top to bottom:')
  for (const item of stack) {
    console.log('  -', item)
  }

  // Bottom to top iteration
  console.log('Bottom to top:')
  for (const item of stack.bottomToTop()) {
    console.log('  -', item)
  }

  // Spread operator
  const arrayTopDown = [...stack]
  console.log('Array (top down):', arrayTopDown)

  console.log('')
}

// ============================================================================
// Example 9: Cloning and Immutability
// ============================================================================

function cloningExample() {
  console.log('=== Cloning Example ===')

  const original = Stack.of(1, 2, 3, 4, 5)
  const clone = original.clone()

  console.log('Original:', original.toArray())
  console.log('Clone:', clone.toArray())

  // Modify original
  original.push(6)
  original.push(7)

  console.log('After modifying original:')
  console.log('  Original:', original.toArray())
  console.log('  Clone:', clone.toArray())

  // Create immutable-style operations
  const doubled = original.map((n) => n * 2)
  console.log('Doubled (new stack):', doubled.toArray())
  console.log('Original unchanged:', original.toArray())

  console.log('')
}

// ============================================================================
// Example 10: Advanced Type Inference
// ============================================================================

function advancedTypesExample() {
  console.log('=== Advanced Types Example ===')

  // Conditional types
  type Unwrap<T> = T extends Stack<infer U> ? U : T

  const numStack = new Stack<number>()
  type NumType = Unwrap<typeof numStack> // number

  // Mapped types
  interface User {
    id: number
    name: string
    email: string
  }

  type ReadonlyUser = { readonly [K in keyof User]: User[K] }

  const userStack = new Stack<ReadonlyUser>()
  userStack.push({
    id: 1,
    name: 'Alice',
    email: 'alice@example.com'
  })

  const user = userStack.peek()
  console.log('User:', user.name)
  // user.name = 'Bob'; // Error: Cannot assign to 'name' because it is a read-only property

  // Partial types
  const partialUserStack = new Stack<Partial<User>>()
  partialUserStack.push({ id: 1 }) // Only id is required
  partialUserStack.push({ name: 'Bob', email: 'bob@example.com' })

  console.log('Partial users:', partialUserStack.size())

  console.log('')
}

// ============================================================================
// Run all examples
// ============================================================================

function runAllExamples() {
  console.log('\n'.repeat(2))
  console.log('╔════════════════════════════════════════════════════════════╗')
  console.log('║          TypeScript Stack Examples                         ║')
  console.log('║          Demonstrating Generic Type Usage                  ║')
  console.log('╚════════════════════════════════════════════════════════════╝')
  console.log('\n')

  basicExample()
  customObjectExample()
  genericConstraintExample()
  nestedGenericsExample()
  unionTypesExample()
  functionalExample()
  capacityExample()
  iterationExample()
  cloningExample()
  advancedTypesExample()

  console.log('╔════════════════════════════════════════════════════════════╗')
  console.log('║          All Examples Completed Successfully!              ║')
  console.log('╚════════════════════════════════════════════════════════════╝')
  console.log('\n')
}

// Run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runAllExamples()
}

export {
  basicExample,
  customObjectExample,
  genericConstraintExample,
  nestedGenericsExample,
  unionTypesExample,
  functionalExample,
  capacityExample,
  iterationExample,
  cloningExample,
  advancedTypesExample
}
