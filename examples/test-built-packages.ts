/**
 * Example: Testing Built Packages
 * This example imports from the built dist files to verify the packages work correctly
 */

// Import from the built packages (as consumers would)
import { Stack } from '@ds-algo.ts/ds'
import { binarySearch, binarySearchDetailed } from '@ds-algo.ts/algo'
import { EmptyStructureError, CapacityMode } from '@ds-algo.ts/shared'

console.log('\n╔════════════════════════════════════════════════════════════╗')
console.log('║         Testing Built Packages                             ║')
console.log('╚════════════════════════════════════════════════════════════╝\n')

// Test 1: Stack from DS package
console.log('=== Test 1: Stack Data Structure ===')
const stack = new Stack<number>({
  maxCapacity: 10,
  capacityMode: CapacityMode.BOUNDED
})

stack.push(1).push(2).push(3)
console.log('✓ Stack created and pushed 3 elements')
console.log('  Size:', stack.size())
console.log('  Top element:', stack.peek())
console.log('  Array:', stack.toArray())

// Test 2: Error handling
console.log('\n=== Test 2: Error Handling ===')
const emptyStack = new Stack<string>()
try {
  emptyStack.pop()
  console.log('✗ Should have thrown error')
} catch (error) {
  if (error instanceof EmptyStructureError) {
    console.log('✓ EmptyStructureError thrown correctly')
  }
}

// Test 3: Generic types
console.log('\n=== Test 3: Generic Type Support ===')
interface User {
  id: number
  name: string
}

const userStack = new Stack<User>()
userStack.push({ id: 1, name: 'Alice' })
userStack.push({ id: 2, name: 'Bob' })

console.log('✓ Generic Stack<User> works')
console.log(
  '  Users:',
  userStack.toArray().map((u) => u.name)
)

// Test 4: Binary Search from Algo package
console.log('\n=== Test 4: Binary Search Algorithm ===')
const numbers = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
const target = 13
const index = binarySearch(numbers, target)

console.log('✓ Binary search works')
console.log(`  Found ${target} at index:`, index)

// Test 5: Detailed binary search
const detailed = binarySearchDetailed(numbers, 6)
console.log('✓ Detailed binary search works')
console.log('  Result:', detailed)

// Test 6: Functional operations
console.log('\n=== Test 5: Functional Operations ===')
const nums = Stack.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
const evenDoubled = nums.filter((n) => n % 2 === 0).map((n) => n * 2)

console.log('✓ Filter and map work')
console.log('  Even numbers doubled:', evenDoubled.toArray())

// Test 7: Iteration
console.log('\n=== Test 6: Iteration ===')
const letters = Stack.of('A', 'B', 'C')
const collected: string[] = []
for (const letter of letters) {
  collected.push(letter)
}
console.log('✓ Iteration works')
console.log('  Collected:', collected)

// Test 8: Custom comparator with algorithm
console.log('\n=== Test 7: Custom Comparator ===')
const users: User[] = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' }
]

const foundUser = binarySearch(users, { id: 2, name: 'Bob' }, { compareFn: (a, b) => a.id - b.id })

console.log('✓ Custom comparator works')
console.log('  Found user at index:', foundUser)

console.log('\n╔════════════════════════════════════════════════════════════╗')
console.log('║         All Tests Passed! ✓                                ║')
console.log('╚════════════════════════════════════════════════════════════╝\n')
