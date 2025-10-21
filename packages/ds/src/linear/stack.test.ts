/**
 * Stack Tests
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { Stack } from './stack'
import { EmptyStructureError, CapacityError } from '@ds-algo.ts/shared'

describe('Stack', () => {
  describe('Constructor and Initialization', () => {
    it('should create an empty stack', () => {
      const stack = new Stack<number>()
      expect(stack.isEmpty()).toBe(true)
      expect(stack.size()).toBe(0)
    })

    it('should create stack with initial elements', () => {
      const stack = new Stack<number>({
        initialElements: [1, 2, 3]
      })
      expect(stack.size()).toBe(3)
      expect(stack.peek()).toBe(3) // Last element pushed is on top
    })

    it('should create stack with max capacity', () => {
      const stack = new Stack<number>({
        maxCapacity: 5
      })
      expect(stack.remainingCapacity()).toBe(5)
    })

    it('should respect max capacity', () => {
      const stack = new Stack<number>({
        maxCapacity: 2
      })
      stack.push(1)
      stack.push(2)
      expect(stack.isFull()).toBe(true)
    })
  })

  describe('Basic Operations', () => {
    let stack: Stack<number>

    beforeEach(() => {
      stack = new Stack<number>()
    })

    it('should push elements onto the stack', () => {
      stack.push(1)
      expect(stack.size()).toBe(1)
      expect(stack.peek()).toBe(1)

      stack.push(2)
      expect(stack.size()).toBe(2)
      expect(stack.peek()).toBe(2)
    })

    it('should support method chaining for push', () => {
      stack.push(1).push(2).push(3)
      expect(stack.size()).toBe(3)
      expect(stack.peek()).toBe(3)
    })

    it('should pop elements from the stack', () => {
      stack.push(1).push(2).push(3)
      expect(stack.pop()).toBe(3)
      expect(stack.size()).toBe(2)
      expect(stack.pop()).toBe(2)
      expect(stack.pop()).toBe(1)
      expect(stack.isEmpty()).toBe(true)
    })

    it('should peek at the top element without removing it', () => {
      stack.push(1).push(2)
      expect(stack.peek()).toBe(2)
      expect(stack.size()).toBe(2) // Size unchanged
      expect(stack.peek()).toBe(2) // Still there
    })

    it('should throw error when popping from empty stack', () => {
      expect(() => stack.pop()).toThrow(EmptyStructureError)
    })

    it('should throw error when peeking at empty stack', () => {
      expect(() => stack.peek()).toThrow(EmptyStructureError)
    })
  })

  describe('Safe Operations', () => {
    it('should return undefined when safe popping from empty stack', () => {
      const stack = new Stack<number>()
      expect(stack.popSafe()).toBeUndefined()
    })

    it('should return undefined when safe peeking at empty stack', () => {
      const stack = new Stack<number>()
      expect(stack.peekSafe()).toBeUndefined()
    })

    it('should safely pop elements', () => {
      const stack = new Stack<number>()
      stack.push(1).push(2)
      expect(stack.popSafe()).toBe(2)
      expect(stack.popSafe()).toBe(1)
      expect(stack.popSafe()).toBeUndefined()
    })
  })

  describe('Capacity Management', () => {
    it('should throw error when exceeding max capacity', () => {
      const stack = new Stack<number>({ maxCapacity: 2 })
      stack.push(1).push(2)
      expect(() => stack.push(3)).toThrow(CapacityError)
    })

    it('should report correct remaining capacity', () => {
      const stack = new Stack<number>({ maxCapacity: 5 })
      expect(stack.remainingCapacity()).toBe(5)
      stack.push(1).push(2)
      expect(stack.remainingCapacity()).toBe(3)
    })

    it('should report infinite capacity when no max set', () => {
      const stack = new Stack<number>()
      expect(stack.remainingCapacity()).toBe(Infinity)
    })

    it('should correctly identify full stack', () => {
      const stack = new Stack<number>({ maxCapacity: 2 })
      expect(stack.isFull()).toBe(false)
      stack.push(1).push(2)
      expect(stack.isFull()).toBe(true)
    })
  })

  describe('Collection Operations', () => {
    it('should clear the stack', () => {
      const stack = new Stack<number>()
      stack.push(1).push(2).push(3)
      stack.clear()
      expect(stack.isEmpty()).toBe(true)
      expect(stack.size()).toBe(0)
    })

    it('should convert to array (top to bottom)', () => {
      const stack = new Stack<number>()
      stack.push(1).push(2).push(3)
      expect(stack.toArray()).toEqual([3, 2, 1])
    })

    it('should convert to array bottom-up', () => {
      const stack = new Stack<number>()
      stack.push(1).push(2).push(3)
      expect(stack.toArrayBottomUp()).toEqual([1, 2, 3])
    })

    it('should check if element exists', () => {
      const stack = new Stack<number>()
      stack.push(1).push(2).push(3)
      expect(stack.contains((x) => x === 2)).toBe(true)
      expect(stack.contains((x) => x === 5)).toBe(false)
    })

    it('should find element', () => {
      const stack = new Stack<number>()
      stack.push(1).push(2).push(3)
      expect(stack.find((x) => x > 1)).toBe(2)
      expect(stack.find((x) => x > 10)).toBeUndefined()
    })
  })

  describe('Functional Operations', () => {
    it('should filter elements', () => {
      const stack = new Stack<number>()
      stack.push(1).push(2).push(3).push(4)
      const filtered = stack.filter((x) => x % 2 === 0)
      expect(filtered.toArray()).toEqual([4, 2])
    })

    it('should map elements to new type', () => {
      const stack = new Stack<number>()
      stack.push(1).push(2).push(3)
      const mapped = stack.map((x) => x.toString())
      expect(mapped.toArray()).toEqual(['3', '2', '1'])
    })

    it('should forEach over elements', () => {
      const stack = new Stack<number>()
      stack.push(1).push(2).push(3)
      const results: number[] = []
      stack.forEach((x) => results.push(x))
      expect(results).toEqual([1, 2, 3]) // Bottom to top order
    })
  })

  describe('Iteration', () => {
    it('should iterate top to bottom', () => {
      const stack = new Stack<number>()
      stack.push(1).push(2).push(3)
      const items = [...stack]
      expect(items).toEqual([3, 2, 1])
    })

    it('should iterate bottom to top', () => {
      const stack = new Stack<number>()
      stack.push(1).push(2).push(3)
      const items = [...stack.bottomToTop()]
      expect(items).toEqual([1, 2, 3])
    })

    it('should work with for...of loop', () => {
      const stack = new Stack<number>()
      stack.push(1).push(2).push(3)
      const items: number[] = []
      for (const item of stack) {
        items.push(item)
      }
      expect(items).toEqual([3, 2, 1])
    })
  })

  describe('Clone and Copy', () => {
    it('should create a shallow clone', () => {
      const stack = new Stack<number>()
      stack.push(1).push(2).push(3)
      const clone = stack.clone()
      expect(clone.toArray()).toEqual(stack.toArray())
      expect(clone).not.toBe(stack)
    })

    it('should maintain independence after cloning', () => {
      const stack = new Stack<number>()
      stack.push(1).push(2)
      const clone = stack.clone()
      stack.push(3)
      expect(stack.size()).toBe(3)
      expect(clone.size()).toBe(2)
    })
  })

  describe('Static Factory Methods', () => {
    it('should create from iterable', () => {
      const stack = Stack.from([1, 2, 3])
      expect(stack.toArray()).toEqual([3, 2, 1])
    })

    it('should create from spread arguments', () => {
      const stack = Stack.of(1, 2, 3)
      expect(stack.toArray()).toEqual([3, 2, 1])
    })

    it('should create from iterable with options', () => {
      const stack = Stack.from([1, 2, 3], { maxCapacity: 5 })
      expect(stack.size()).toBe(3)
      expect(stack.remainingCapacity()).toBe(2)
    })
  })

  describe('String and JSON Representation', () => {
    it('should have string representation', () => {
      const stack = new Stack<number>()
      stack.push(1).push(2)
      expect(stack.toString()).toBe('Stack(2) [2, 1]')
    })

    it('should convert to JSON', () => {
      const stack = new Stack<number>({ maxCapacity: 10 })
      stack.push(1).push(2)
      const json = stack.toJSON()
      expect(json).toEqual({
        type: 'Stack',
        size: 2,
        maxCapacity: 10,
        items: [2, 1]
      })
    })
  })

  describe('Generic Type Safety', () => {
    it('should work with string type', () => {
      const stack = new Stack<string>()
      stack.push('hello').push('world')
      expect(stack.peek()).toBe('world')
    })

    it('should work with custom object types', () => {
      interface User {
        id: number
        name: string
      }

      const stack = new Stack<User>()
      stack.push({ id: 1, name: 'Alice' })
      stack.push({ id: 2, name: 'Bob' })

      const user = stack.peek()
      expect(user.name).toBe('Bob')
    })

    it('should work with union types', () => {
      type Value = number | string
      const stack = new Stack<Value>()
      stack.push(1).push('two').push(3)
      expect(stack.toArray()).toEqual([3, 'two', 1])
    })

    it('should maintain type through map operation', () => {
      const numStack = new Stack<number>()
      numStack.push(1).push(2).push(3)
      const strStack: Stack<string> = numStack.map((n) => `num-${n}`)
      expect(strStack.peek()).toBe('num-3')
    })
  })

  describe('Edge Cases', () => {
    it('should handle single element', () => {
      const stack = new Stack<number>()
      stack.push(42)
      expect(stack.peek()).toBe(42)
      expect(stack.pop()).toBe(42)
      expect(stack.isEmpty()).toBe(true)
    })

    it('should handle many operations', () => {
      const stack = new Stack<number>()
      for (let i = 0; i < 1000; i++) {
        stack.push(i)
      }
      expect(stack.size()).toBe(1000)
      expect(stack.peek()).toBe(999)
    })

    it('should handle null and undefined values', () => {
      const stack = new Stack<number | null>()
      stack.push(null).push(1)
      expect(stack.peek()).toBe(1)
      stack.pop()
      expect(stack.peek()).toBe(null)
    })
  })
})
