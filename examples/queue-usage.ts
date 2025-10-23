/**
 * Queue Usage Examples
 * Demonstrates various ways to use the Queue data structure with TypeScript generics
 */

import { Queue } from '../packages/ds/src/index'

// ============================================================================
// Example 1: Basic Usage with Primitives
// ============================================================================

function basicExample() {
  console.log('=== Basic Queue Example ===')

  const numberQueue = new Queue<number>()

  // Enqueue operations
  numberQueue.enqueue(10)
  numberQueue.enqueue(20)
  numberQueue.enqueue(30)

  console.log('Size:', numberQueue.size()) // 3
  console.log('Front element:', numberQueue.peekFront()) // 10
  console.log('Rear element:', numberQueue.peekRear()) // 30

  // Dequeue operations (FIFO)
  console.log('Dequeued:', numberQueue.dequeue()) // 10
  console.log('New front:', numberQueue.peekFront()) // 20
  console.log('New size:', numberQueue.size()) // 2

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

  const taskQueue = new Queue<Task>({
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

  // Add more tasks (FIFO order)
  taskQueue.enqueue({
    id: 2,
    title: 'Write documentation',
    priority: 'medium',
    createdAt: new Date('2024-01-02')
  })

  taskQueue.enqueue({
    id: 3,
    title: 'Code review',
    priority: 'high',
    createdAt: new Date('2024-01-03')
  })

  console.log('Total tasks:', taskQueue.size())
  console.log('Next task:', taskQueue.peekFront().title)
  console.log('Last added task:', taskQueue.peekRear().title)

  // Filter high priority tasks
  const highPriorityTasks = taskQueue.filter((task) => task.priority === 'high')
  console.log('High priority count:', highPriorityTasks.size())

  // Map to titles
  const taskTitles = taskQueue.map((task) => task.title)
  console.log('Task titles:', taskTitles.toArray())

  console.log('')
}

// ============================================================================
// Example 3: Print Job Queue
// ============================================================================

interface PrintJob {
  id: string
  documentName: string
  pages: number
  submittedBy: string
}

function printJobExample() {
  console.log('=== Print Job Queue Example ===')

  const printQueue = new Queue<PrintJob>()

  // Add print jobs
  printQueue.enqueue({
    id: 'job1',
    documentName: 'Report.pdf',
    pages: 5,
    submittedBy: 'Alice'
  })

  printQueue.enqueue({
    id: 'job2',
    documentName: 'Presentation.pptx',
    pages: 20,
    submittedBy: 'Bob'
  })

  printQueue.enqueue({
    id: 'job3',
    documentName: 'Invoice.docx',
    pages: 2,
    submittedBy: 'Charlie'
  })

  console.log('Jobs in queue:', printQueue.size())

  // Process jobs in FIFO order
  console.log('Processing jobs:')
  while (!printQueue.isEmpty()) {
    const job = printQueue.dequeue()
    console.log(`  - Printing ${job.documentName} (${job.pages} pages) for ${job.submittedBy}`)
  }

  console.log('All jobs completed!')
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

  // Queue of messages containing different data types
  const numberMessages = new Queue<Message<number>>()
  numberMessages.enqueue({
    id: 'msg1',
    data: 42,
    timestamp: Date.now()
  })

  const stringMessages = new Queue<Message<string>>()
  stringMessages.enqueue({
    id: 'msg2',
    data: 'Hello, World!',
    timestamp: Date.now()
  })

  // Queue of queues
  const queueOfQueues = new Queue<Queue<number>>()
  queueOfQueues.enqueue(Queue.of(1, 2, 3))
  queueOfQueues.enqueue(Queue.of(4, 5, 6))
  queueOfQueues.enqueue(Queue.of(7, 8, 9))

  console.log('Number of queues:', queueOfQueues.size())
  console.log('Front queue:', queueOfQueues.peekFront().toArray())

  const innerQueue = queueOfQueues.dequeue()
  console.log('Dequeued queue elements:', innerQueue.toArray())

  console.log('')
}

// ============================================================================
// Example 5: Union Types and Nullable Values
// ============================================================================

type Result<T, E> = { success: true; value: T } | { success: false; error: E }

function unionTypesExample() {
  console.log('=== Union Types Example ===')

  // Queue with union types
  const mixedQueue = new Queue<string | number | boolean>()
  mixedQueue.enqueue('hello')
  mixedQueue.enqueue(42)
  mixedQueue.enqueue(true)
  mixedQueue.enqueue('world')

  console.log('Mixed values:', mixedQueue.toArray())

  // Queue with Result type
  const resultQueue = new Queue<Result<number, string>>()
  resultQueue.enqueue({ success: true, value: 100 })
  resultQueue.enqueue({ success: false, error: 'Division by zero' })
  resultQueue.enqueue({ success: true, value: 200 })

  // Filter successful results
  const successfulResults = resultQueue.filter((r) => r.success)
  console.log('Successful results:', successfulResults.size())

  // Nullable queue
  const nullableQueue = new Queue<number | null>()
  nullableQueue.enqueue(1)
  nullableQueue.enqueue(null)
  nullableQueue.enqueue(2)

  console.log('Nullable values:', nullableQueue.toArray())

  console.log('')
}

// ============================================================================
// Example 6: Functional Programming Patterns
// ============================================================================

function functionalExample() {
  console.log('=== Functional Programming Example ===')

  const numbers = Queue.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)

  // Chain operations
  const result = numbers
    .filter((n) => n % 2 === 0) // Keep even numbers
    .map((n) => n * 2) // Double them
    .filter((n) => n > 8) // Keep those > 8

  console.log('Transformed queue:', result.toArray())

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

  const boundedQueue = new Queue<string>({
    maxCapacity: 5
  })

  console.log('Initial capacity:', boundedQueue.remainingCapacity())

  boundedQueue.enqueue('First')
  boundedQueue.enqueue('Second')
  boundedQueue.enqueue('Third')

  console.log('Remaining capacity:', boundedQueue.remainingCapacity())
  console.log('Is full?', boundedQueue.isFull())

  boundedQueue.enqueue('Fourth')
  boundedQueue.enqueue('Fifth')

  console.log('Is full now?', boundedQueue.isFull())

  try {
    boundedQueue.enqueue('Sixth') // This will throw
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

  const queue = Queue.of('A', 'B', 'C', 'D', 'E')

  // Front to rear iteration
  console.log('Front to rear:')
  for (const item of queue) {
    console.log('  -', item)
  }

  // Spread operator
  const array = [...queue]
  console.log('Array (front to rear):', array)

  console.log('')
}

// ============================================================================
// Example 9: Cloning and Immutability
// ============================================================================

function cloningExample() {
  console.log('=== Cloning Example ===')

  const original = Queue.of(1, 2, 3, 4, 5)
  const clone = original.clone()

  console.log('Original:', original.toArray())
  console.log('Clone:', clone.toArray())

  // Modify original
  original.enqueue(6)
  original.enqueue(7)

  console.log('After modifying original:')
  console.log('  Original:', original.toArray())
  console.log('  Clone:', clone.toArray())

  // Create immutable-style operations
  const doubled = original.map((n) => n * 2)
  console.log('Doubled (new queue):', doubled.toArray())
  console.log('Original unchanged:', original.toArray())

  console.log('')
}

// ============================================================================
// Example 10: Customer Service Queue
// ============================================================================

interface Customer {
  id: number
  name: string
  issue: string
  waitTime: number
}

function customerServiceExample() {
  console.log('=== Customer Service Queue Example ===')

  const serviceQueue = new Queue<Customer>({
    maxCapacity: 50
  })

  // Customers arrive
  serviceQueue.enqueue({
    id: 1,
    name: 'John Doe',
    issue: 'Billing question',
    waitTime: 0
  })

  serviceQueue.enqueue({
    id: 2,
    name: 'Jane Smith',
    issue: 'Technical support',
    waitTime: 0
  })

  serviceQueue.enqueue({
    id: 3,
    name: 'Bob Johnson',
    issue: 'Account access',
    waitTime: 0
  })

  console.log('Customers waiting:', serviceQueue.size())

  // Serve customers in FIFO order
  let servedCount = 0
  while (!serviceQueue.isEmpty() && servedCount < 2) {
    const customer = serviceQueue.dequeue()
    console.log(`Serving: ${customer.name} - Issue: ${customer.issue}`)
    servedCount++
  }

  console.log('Customers still waiting:', serviceQueue.size())

  console.log('')
}

// ============================================================================
// Example 11: Event Processing Queue
// ============================================================================

interface Event {
  type: 'click' | 'keypress' | 'scroll' | 'submit'
  timestamp: number
  data: any
}

function eventProcessingExample() {
  console.log('=== Event Processing Queue Example ===')

  const eventQueue = new Queue<Event>()

  // Simulate events
  eventQueue.enqueue({ type: 'click', timestamp: Date.now(), data: { x: 100, y: 200 } })
  eventQueue.enqueue({ type: 'keypress', timestamp: Date.now(), data: { key: 'Enter' } })
  eventQueue.enqueue({ type: 'scroll', timestamp: Date.now(), data: { scrollY: 500 } })
  eventQueue.enqueue({ type: 'submit', timestamp: Date.now(), data: { formId: 'login' } })

  console.log('Events in queue:', eventQueue.size())

  // Process events
  console.log('Processing events:')
  eventQueue.forEach((event, index) => {
    console.log(`  ${index + 1}. ${event.type} at ${new Date(event.timestamp).toLocaleTimeString()}`)
  })

  // Find specific event type
  const submitEvent = eventQueue.find((e) => e.type === 'submit')
  if (submitEvent) {
    console.log('Found submit event:', submitEvent.data)
  }

  console.log('')
}

// ============================================================================
// Example 12: Advanced Type Inference
// ============================================================================

function advancedTypesExample() {
  console.log('=== Advanced Types Example ===')

  // Conditional types
  type Unwrap<T> = T extends Queue<infer U> ? U : T

  const numQueue = new Queue<number>()
  type NumType = Unwrap<typeof numQueue> // number

  // Mapped types
  interface User {
    id: number
    name: string
    email: string
  }

  type ReadonlyUser = { readonly [K in keyof User]: User[K] }

  const userQueue = new Queue<ReadonlyUser>()
  userQueue.enqueue({
    id: 1,
    name: 'Alice',
    email: 'alice@example.com'
  })

  const user = userQueue.peekFront()
  console.log('User:', user.name)
  // user.name = 'Bob'; // Error: Cannot assign to 'name' because it is a read-only property

  // Partial types
  const partialUserQueue = new Queue<Partial<User>>()
  partialUserQueue.enqueue({ id: 1 }) // Only id is required
  partialUserQueue.enqueue({ name: 'Bob', email: 'bob@example.com' })

  console.log('Partial users:', partialUserQueue.size())

  console.log('')
}

// ============================================================================
// Run all examples
// ============================================================================

function runAllExamples() {
  console.log('\n'.repeat(2))
  console.log('╔════════════════════════════════════════════════════════════╗')
  console.log('║          TypeScript Queue Examples                         ║')
  console.log('║          Demonstrating Generic Type Usage                  ║')
  console.log('╚════════════════════════════════════════════════════════════╝')
  console.log('\n')

  basicExample()
  customObjectExample()
  printJobExample()
  nestedGenericsExample()
  unionTypesExample()
  functionalExample()
  capacityExample()
  iterationExample()
  cloningExample()
  customerServiceExample()
  eventProcessingExample()
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
  printJobExample,
  nestedGenericsExample,
  unionTypesExample,
  functionalExample,
  capacityExample,
  iterationExample,
  cloningExample,
  customerServiceExample,
  eventProcessingExample,
  advancedTypesExample
}
