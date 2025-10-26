/**
 * Deque (Double-Ended Queue) Usage Examples
 * Demonstrates various ways to use the Deque data structure with TypeScript generics
 */

import { Deque } from '../packages/ds/src/index'

// ============================================================================
// Example 1: Basic Usage with Primitives
// ============================================================================

function basicExample() {
  console.log('=== Basic Deque Example ===')

  const numberDeque = new Deque<number>()

  // Add to both ends
  numberDeque.addRear(3)
  numberDeque.addFront(2)
  numberDeque.addRear(4)
  numberDeque.addFront(1)
  numberDeque.addRear(5)

  console.log('Deque:', numberDeque.toArray()) // [1, 2, 3, 4, 5]
  console.log('Front element:', numberDeque.peekFront()) // 1
  console.log('Rear element:', numberDeque.peekRear()) // 5

  // Remove from both ends
  console.log('Remove front:', numberDeque.removeFront()) // 1
  console.log('Remove rear:', numberDeque.removeRear()) // 5
  console.log('After removals:', numberDeque.toArray()) // [2, 3, 4]

  console.log('')
}

// ============================================================================
// Example 2: Working with Custom Objects
// ============================================================================

interface Task {
  id: number
  title: string
  priority: 'low' | 'medium' | 'high' | 'critical'
  createdAt: Date
}

function customObjectExample() {
  console.log('=== Custom Object Example ===')

  const taskDeque = new Deque<Task>({
    maxCapacity: 100
  })

  // Add normal priority tasks to rear
  taskDeque.addRear({
    id: 1,
    title: 'Write documentation',
    priority: 'medium',
    createdAt: new Date('2024-01-01')
  })

  taskDeque.addRear({
    id: 2,
    title: 'Code review',
    priority: 'medium',
    createdAt: new Date('2024-01-02')
  })

  // Add urgent task to front (priority override)
  taskDeque.addFront({
    id: 3,
    title: 'Fix critical bug',
    priority: 'critical',
    createdAt: new Date('2024-01-03')
  })

  // Add low priority to rear
  taskDeque.addRear({
    id: 4,
    title: 'Update dependencies',
    priority: 'low',
    createdAt: new Date('2024-01-04')
  })

  console.log('Total tasks:', taskDeque.size())
  console.log('Next task:', taskDeque.peekFront().title)
  console.log('Last task:', taskDeque.peekRear().title)

  // Process tasks
  console.log('\nProcessing tasks:')
  const firstTask = taskDeque.removeFront()
  console.log(`  1. ${firstTask.title} (${firstTask.priority})`)

  console.log('')
}

// ============================================================================
// Example 3: Sliding Window Maximum
// ============================================================================

function slidingWindowExample() {
  console.log('=== Sliding Window Maximum Example ===')

  function maxSlidingWindow(nums: number[], k: number): number[] {
    const result: number[] = []
    const deque = new Deque<number>() // Store indices

    for (let i = 0; i < nums.length; i++) {
      // Remove indices outside the window
      while (!deque.isEmpty() && deque.peekFront()! < i - k + 1) {
        deque.removeFront()
      }

      // Remove indices of elements smaller than current
      while (!deque.isEmpty() && nums[deque.peekRear()!] < nums[i]) {
        deque.removeRear()
      }

      deque.addRear(i)

      // Add to result if window is complete
      if (i >= k - 1) {
        result.push(nums[deque.peekFront()!])
      }
    }

    return result
  }

  const nums = [1, 3, -1, -3, 5, 3, 6, 7]
  const k = 3
  const maxValues = maxSlidingWindow(nums, k)

  console.log('Array:', nums)
  console.log('Window size:', k)
  console.log('Max in each window:', maxValues)
  console.log('')
}

// ============================================================================
// Example 4: Palindrome Checker
// ============================================================================

function palindromeExample() {
  console.log('=== Palindrome Checker Example ===')

  function isPalindrome(str: string): boolean {
    const deque = Deque.from(str.toLowerCase().replace(/[^a-z0-9]/g, '').split(''))

    while (deque.size() > 1) {
      if (deque.removeFront() !== deque.removeRear()) {
        return false
      }
    }

    return true
  }

  const tests = [
    'racecar',
    'A man, a plan, a canal: Panama',
    'hello world',
    'Was it a car or a cat I saw?',
    'Madam'
  ]

  tests.forEach((test) => {
    console.log(`"${test}" -> ${isPalindrome(test) ? 'Palindrome' : 'Not a palindrome'}`)
  })

  console.log('')
}

// ============================================================================
// Example 5: Browser History
// ============================================================================

interface HistoryEntry {
  url: string
  title: string
  timestamp: Date
}

function browserHistoryExample() {
  console.log('=== Browser History Example ===')

  const history = new Deque<HistoryEntry>({
    maxCapacity: 50
  })
  let currentIndex = -1

  function visit(url: string, title: string) {
    const entry: HistoryEntry = {
      url,
      title,
      timestamp: new Date()
    }

    // Remove forward history when visiting new page
    while (currentIndex < history.size() - 1) {
      history.removeRear()
    }

    history.addRear(entry)
    currentIndex = history.size() - 1
    console.log(`Visited: ${title}`)
  }

  function back(): HistoryEntry | undefined {
    if (currentIndex > 0) {
      currentIndex--
      return history.toArray()[currentIndex]
    }
    return undefined
  }

  function forward(): HistoryEntry | undefined {
    if (currentIndex < history.size() - 1) {
      currentIndex++
      return history.toArray()[currentIndex]
    }
    return undefined
  }

  // Simulate browsing
  visit('https://example.com', 'Example')
  visit('https://example.com/about', 'About Us')
  visit('https://example.com/contact', 'Contact')

  console.log('\nNavigating back:')
  const backPage = back()
  console.log(`  Current page: ${backPage?.title}`)

  console.log('\nNavigating forward:')
  const forwardPage = forward()
  console.log(`  Current page: ${forwardPage?.title}`)

  console.log('')
}

// ============================================================================
// Example 6: Work Stealing Queue
// ============================================================================

interface Job {
  id: string
  task: string
  estimatedTime: number
}

function workStealingExample() {
  console.log('=== Work Stealing Queue Example ===')

  class WorkerQueue {
    private queue: Deque<Job>

    constructor() {
      this.queue = new Deque<Job>()
    }

    // Worker adds jobs to its own queue (rear)
    addJob(job: Job): void {
      this.queue.addRear(job)
    }

    // Worker takes jobs from its own queue (rear - LIFO for cache locality)
    takeOwnJob(): Job | undefined {
      return this.queue.removeRearSafe()
    }

    // Other workers steal jobs (front - FIFO)
    stealJob(): Job | undefined {
      return this.queue.removeFrontSafe()
    }

    size(): number {
      return this.queue.size()
    }
  }

  const worker1 = new WorkerQueue()
  const worker2 = new WorkerQueue()

  // Worker 1 has many jobs
  worker1.addJob({ id: 'j1', task: 'Task 1', estimatedTime: 10 })
  worker1.addJob({ id: 'j2', task: 'Task 2', estimatedTime: 15 })
  worker1.addJob({ id: 'j3', task: 'Task 3', estimatedTime: 20 })
  worker1.addJob({ id: 'j4', task: 'Task 4', estimatedTime: 5 })

  console.log('Worker 1 queue size:', worker1.size())
  console.log('Worker 2 queue size:', worker2.size())

  // Worker 2 is idle, steals from worker 1
  const stolenJob = worker1.stealJob()
  if (stolenJob) {
    console.log(`\nWorker 2 stole job: ${stolenJob.id} (${stolenJob.task})`)
  }

  console.log('Worker 1 queue size after steal:', worker1.size())

  console.log('')
}

// ============================================================================
// Example 7: Undo/Redo System
// ============================================================================

interface Command {
  action: string
  data: any
  timestamp: Date
}

function undoRedoExample() {
  console.log('=== Undo/Redo System Example ===')

  class CommandManager {
    private history: Deque<Command>
    private currentIndex: number

    constructor(maxHistory: number = 50) {
      this.history = new Deque<Command>({ maxCapacity: maxHistory })
      this.currentIndex = -1
    }

    execute(action: string, data: any): void {
      const command: Command = {
        action,
        data,
        timestamp: new Date()
      }

      // Remove redo history when executing new command
      while (this.currentIndex < this.history.size() - 1) {
        this.history.removeRear()
      }

      this.history.addRear(command)
      this.currentIndex = this.history.size() - 1

      console.log(`Executed: ${action}`)
    }

    undo(): Command | undefined {
      if (this.currentIndex >= 0) {
        const command = this.history.toArray()[this.currentIndex]
        this.currentIndex--
        console.log(`Undid: ${command.action}`)
        return command
      }
      console.log('Nothing to undo')
      return undefined
    }

    redo(): Command | undefined {
      if (this.currentIndex < this.history.size() - 1) {
        this.currentIndex++
        const command = this.history.toArray()[this.currentIndex]
        console.log(`Redid: ${command.action}`)
        return command
      }
      console.log('Nothing to redo')
      return undefined
    }

    canUndo(): boolean {
      return this.currentIndex >= 0
    }

    canRedo(): boolean {
      return this.currentIndex < this.history.size() - 1
    }
  }

  const manager = new CommandManager()

  manager.execute('Type "Hello"', { text: 'Hello' })
  manager.execute('Type " World"', { text: ' World' })
  manager.execute('Bold text', { format: 'bold' })

  console.log('\nUndo operations:')
  manager.undo()
  manager.undo()

  console.log('\nRedo operations:')
  manager.redo()

  console.log('')
}

// ============================================================================
// Example 8: Functional Operations
// ============================================================================

function functionalExample() {
  console.log('=== Functional Programming Example ===')

  const numbers = Deque.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)

  // Chain operations
  const result = numbers
    .filter((n) => n % 2 === 0) // Keep even numbers
    .map((n) => n * 2) // Double them
    .filter((n) => n > 8) // Keep those > 8

  console.log('Original:', numbers.toArray())
  console.log('Transformed:', result.toArray())

  // Reverse operations
  const reversed = numbers.reversed()
  console.log('Reversed (new):', reversed.toArray())

  numbers.reverse()
  console.log('Reversed (in-place):', numbers.toArray())

  console.log('')
}

// ============================================================================
// Example 9: Iteration Patterns
// ============================================================================

function iterationExample() {
  console.log('=== Iteration Example ===')

  const deque = Deque.of('A', 'B', 'C', 'D', 'E')

  // Front to rear iteration
  console.log('Front to rear:')
  for (const item of deque) {
    console.log('  -', item)
  }

  // Rear to front iteration
  console.log('Rear to front:')
  for (const item of deque.rearToFront()) {
    console.log('  -', item)
  }

  // Spread operator
  const arrayFrontToRear = [...deque]
  console.log('Array (front to rear):', arrayFrontToRear)

  console.log('')
}

// ============================================================================
// Example 10: Multi-Priority Task Scheduler
// ============================================================================

interface ScheduledTask {
  id: number
  name: string
  priority: 1 | 2 | 3 | 4 | 5
}

function taskSchedulerExample() {
  console.log('=== Multi-Priority Task Scheduler Example ===')

  class TaskScheduler {
    private deque: Deque<ScheduledTask>

    constructor() {
      this.deque = new Deque<ScheduledTask>()
    }

    addTask(task: ScheduledTask): void {
      // High priority (4-5) goes to front
      if (task.priority >= 4) {
        this.deque.addFront(task)
      } else {
        // Normal/low priority goes to rear
        this.deque.addRear(task)
      }
    }

    getNextTask(): ScheduledTask | undefined {
      return this.deque.removeFrontSafe()
    }

    removeLastTask(): ScheduledTask | undefined {
      return this.deque.removeRearSafe()
    }

    getTasks(): ScheduledTask[] {
      return this.deque.toArray()
    }
  }

  const scheduler = new TaskScheduler()

  scheduler.addTask({ id: 1, name: 'Normal task 1', priority: 2 })
  scheduler.addTask({ id: 2, name: 'High priority task', priority: 5 })
  scheduler.addTask({ id: 3, name: 'Normal task 2', priority: 3 })
  scheduler.addTask({ id: 4, name: 'Critical task', priority: 5 })
  scheduler.addTask({ id: 5, name: 'Low priority task', priority: 1 })

  console.log('Task queue order:')
  scheduler.getTasks().forEach((task, index) => {
    console.log(`  ${index + 1}. ${task.name} (Priority: ${task.priority})`)
  })

  console.log('\nProcessing tasks:')
  let task = scheduler.getNextTask()
  while (task) {
    console.log(`  Processing: ${task.name}`)
    task = scheduler.getNextTask()
  }

  console.log('')
}

// ============================================================================
// Example 11: Advanced Type Inference
// ============================================================================

function advancedTypesExample() {
  console.log('=== Advanced Types Example ===')

  // Conditional types
  type Unwrap<T> = T extends Deque<infer U> ? U : T

  const numDeque = new Deque<number>()
  type NumType = Unwrap<typeof numDeque> // number

  // Mapped types
  interface User {
    id: number
    name: string
    email: string
  }

  type ReadonlyUser = { readonly [K in keyof User]: User[K] }

  const userDeque = new Deque<ReadonlyUser>()
  userDeque.addRear({
    id: 1,
    name: 'Alice',
    email: 'alice@example.com'
  })

  const user = userDeque.peekFront()
  console.log('User:', user.name)

  // Partial types
  const partialUserDeque = new Deque<Partial<User>>()
  partialUserDeque.addRear({ id: 1 })
  partialUserDeque.addRear({ name: 'Bob', email: 'bob@example.com' })

  console.log('Partial users:', partialUserDeque.size())

  console.log('')
}

// ============================================================================
// Run all examples
// ============================================================================

function runAllExamples() {
  console.log('\n'.repeat(2))
  console.log('╔════════════════════════════════════════════════════════════╗')
  console.log('║          TypeScript Deque Examples                         ║')
  console.log('║          Demonstrating Double-Ended Queue Usage            ║')
  console.log('╚════════════════════════════════════════════════════════════╝')
  console.log('\n')

  basicExample()
  customObjectExample()
  slidingWindowExample()
  palindromeExample()
  browserHistoryExample()
  workStealingExample()
  undoRedoExample()
  functionalExample()
  iterationExample()
  taskSchedulerExample()
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
  slidingWindowExample,
  palindromeExample,
  browserHistoryExample,
  workStealingExample,
  undoRedoExample,
  functionalExample,
  iterationExample,
  taskSchedulerExample,
  advancedTypesExample
}
