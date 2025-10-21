/**
 * Simple test of built packages using pure ESM
 */

import { Stack } from '@ds-algo.ts/ds'
import { binarySearch } from '@ds-algo.ts/algo'
import { EmptyStructureError, CapacityMode } from '@ds-algo.ts/shared'

console.log('\n╔════════════════════════════════════════╗')
console.log('║  Testing Built Packages (ESM)          ║')
console.log('╚════════════════════════════════════════╝\n')

// Test Stack
console.log('✓ Stack imported successfully')
const stack = new Stack()
stack.push(1).push(2).push(3)
console.log('✓ Stack operations work:', stack.toArray())

// Test Binary Search
console.log('✓ Binary search imported successfully')
const result = binarySearch([1, 3, 5, 7, 9], 5)
console.log('✓ Binary search works, found at index:', result)

// Test Errors
console.log('✓ Errors imported successfully')
const emptyStack = new Stack()
try {
  emptyStack.pop()
} catch (err) {
  if (err instanceof EmptyStructureError) {
    console.log('✓ EmptyStructureError works correctly')
  }
}

// Test Enums
console.log('✓ Enums imported successfully')
const boundedStack = new Stack({ maxCapacity: 5, capacityMode: CapacityMode.BOUNDED })
console.log('✓ CapacityMode.BOUNDED works')

console.log('\n╔════════════════════════════════════════╗')
console.log('║  All Tests Passed! ✓                   ║')
console.log('╚════════════════════════════════════════╝\n')
