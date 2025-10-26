/**
 * Deque Tests
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { Deque } from './deque'
import { EmptyStructureError, CapacityError } from '@ds-algo.ts/shared'

describe('Deque', () => {
  describe('Constructor and Initialization', () => {
    it('should create an empty deque', () => {
      const deque = new Deque<number>()
      expect(deque.isEmpty()).toBe(true)
      expect(deque.size()).toBe(0)
    })

    it('should create deque with initial elements', () => {
      const deque = new Deque<number>({
        initialElements: [1, 2, 3]
      })
      expect(deque.size()).toBe(3)
      expect(deque.peekFront()).toBe(1)
      expect(deque.peekRear()).toBe(3)
    })

    it('should create deque with max capacity', () => {
      const deque = new Deque<number>({
        maxCapacity: 5
      })
      expect(deque.remainingCapacity()).toBe(5)
    })

    it('should respect max capacity', () => {
      const deque = new Deque<number>({
        maxCapacity: 2
      })
      deque.addRear(1)
      deque.addRear(2)
      expect(deque.isFull()).toBe(true)
    })
  })

  describe('Basic Operations - Adding', () => {
    let deque: Deque<number>

    beforeEach(() => {
      deque = new Deque<number>()
    })

    it('should add elements to the rear', () => {
      deque.addRear(1)
      expect(deque.size()).toBe(1)
      expect(deque.peekFront()).toBe(1)
      expect(deque.peekRear()).toBe(1)

      deque.addRear(2)
      expect(deque.size()).toBe(2)
      expect(deque.peekFront()).toBe(1)
      expect(deque.peekRear()).toBe(2)
    })

    it('should add elements to the front', () => {
      deque.addRear(2)
      deque.addFront(1)
      expect(deque.size()).toBe(2)
      expect(deque.peekFront()).toBe(1)
      expect(deque.peekRear()).toBe(2)

      deque.addFront(0)
      expect(deque.size()).toBe(3)
      expect(deque.peekFront()).toBe(0)
      expect(deque.peekRear()).toBe(2)
    })

    it('should support method chaining for addRear', () => {
      deque.addRear(1).addRear(2).addRear(3)
      expect(deque.size()).toBe(3)
      expect(deque.toArray()).toEqual([1, 2, 3])
    })

    it('should support method chaining for addFront', () => {
      deque.addFront(3).addFront(2).addFront(1)
      expect(deque.size()).toBe(3)
      expect(deque.toArray()).toEqual([1, 2, 3])
    })

    it('should handle mixed front and rear additions', () => {
      deque.addRear(3)
      deque.addFront(2)
      deque.addRear(4)
      deque.addFront(1)
      expect(deque.toArray()).toEqual([1, 2, 3, 4])
    })
  })

  describe('Basic Operations - Removing', () => {
    let deque: Deque<number>

    beforeEach(() => {
      deque = new Deque<number>()
      deque.addRear(1).addRear(2).addRear(3)
    })

    it('should remove elements from the front', () => {
      expect(deque.removeFront()).toBe(1)
      expect(deque.size()).toBe(2)
      expect(deque.peekFront()).toBe(2)
    })

    it('should remove elements from the rear', () => {
      expect(deque.removeRear()).toBe(3)
      expect(deque.size()).toBe(2)
      expect(deque.peekRear()).toBe(2)
    })

    it('should handle alternating removals', () => {
      expect(deque.removeFront()).toBe(1)
      expect(deque.removeRear()).toBe(3)
      expect(deque.removeFront()).toBe(2)
      expect(deque.isEmpty()).toBe(true)
    })

    it('should throw error when removing from empty deque (front)', () => {
      const empty = new Deque<number>()
      expect(() => empty.removeFront()).toThrow(EmptyStructureError)
    })

    it('should throw error when removing from empty deque (rear)', () => {
      const empty = new Deque<number>()
      expect(() => empty.removeRear()).toThrow(EmptyStructureError)
    })
  })

  describe('Peek Operations', () => {
    it('should peek at front and rear elements', () => {
      const deque = new Deque<number>()
      deque.addRear(1).addRear(2).addRear(3)
      
      expect(deque.peekFront()).toBe(1)
      expect(deque.peekRear()).toBe(3)
      expect(deque.size()).toBe(3) // Size unchanged
    })

    it('should throw error when peeking at empty deque front', () => {
      const deque = new Deque<number>()
      expect(() => deque.peekFront()).toThrow(EmptyStructureError)
    })

    it('should throw error when peeking at empty deque rear', () => {
      const deque = new Deque<number>()
      expect(() => deque.peekRear()).toThrow(EmptyStructureError)
    })

    it('should peek same element when single item', () => {
      const deque = new Deque<number>()
      deque.addRear(42)
      expect(deque.peekFront()).toBe(42)
      expect(deque.peekRear()).toBe(42)
    })
  })

  describe('Safe Operations', () => {
    it('should return undefined when safe removing from empty deque (front)', () => {
      const deque = new Deque<number>()
      expect(deque.removeFrontSafe()).toBeUndefined()
    })

    it('should return undefined when safe removing from empty deque (rear)', () => {
      const deque = new Deque<number>()
      expect(deque.removeRearSafe()).toBeUndefined()
    })

    it('should return undefined when safe peeking at empty deque (front)', () => {
      const deque = new Deque<number>()
      expect(deque.peekFrontSafe()).toBeUndefined()
    })

    it('should return undefined when safe peeking at empty deque (rear)', () => {
      const deque = new Deque<number>()
      expect(deque.peekRearSafe()).toBeUndefined()
    })

    it('should safely remove elements from front', () => {
      const deque = new Deque<number>()
      deque.addRear(1).addRear(2)
      expect(deque.removeFrontSafe()).toBe(1)
      expect(deque.removeFrontSafe()).toBe(2)
      expect(deque.removeFrontSafe()).toBeUndefined()
    })

    it('should safely remove elements from rear', () => {
      const deque = new Deque<number>()
      deque.addRear(1).addRear(2)
      expect(deque.removeRearSafe()).toBe(2)
      expect(deque.removeRearSafe()).toBe(1)
      expect(deque.removeRearSafe()).toBeUndefined()
    })
  })

  describe('Capacity Management', () => {
    it('should throw error when exceeding max capacity (rear)', () => {
      const deque = new Deque<number>({ maxCapacity: 2 })
      deque.addRear(1).addRear(2)
      expect(() => deque.addRear(3)).toThrow(CapacityError)
    })

    it('should throw error when exceeding max capacity (front)', () => {
      const deque = new Deque<number>({ maxCapacity: 2 })
      deque.addFront(1).addFront(2)
      expect(() => deque.addFront(3)).toThrow(CapacityError)
    })

    it('should report correct remaining capacity', () => {
      const deque = new Deque<number>({ maxCapacity: 5 })
      expect(deque.remainingCapacity()).toBe(5)
      deque.addRear(1).addFront(2)
      expect(deque.remainingCapacity()).toBe(3)
    })

    it('should report infinite capacity when no max set', () => {
      const deque = new Deque<number>()
      expect(deque.remainingCapacity()).toBe(Infinity)
    })

    it('should correctly identify full deque', () => {
      const deque = new Deque<number>({ maxCapacity: 2 })
      expect(deque.isFull()).toBe(false)
      deque.addRear(1).addRear(2)
      expect(deque.isFull()).toBe(true)
    })
  })

  describe('Collection Operations', () => {
    it('should clear the deque', () => {
      const deque = new Deque<number>()
      deque.addRear(1).addRear(2).addRear(3)
      deque.clear()
      expect(deque.isEmpty()).toBe(true)
      expect(deque.size()).toBe(0)
    })

    it('should convert to array (front to rear)', () => {
      const deque = new Deque<number>()
      deque.addRear(1).addRear(2).addRear(3)
      expect(deque.toArray()).toEqual([1, 2, 3])
    })

    it('should check if element exists', () => {
      const deque = new Deque<number>()
      deque.addRear(1).addRear(2).addRear(3)
      expect(deque.contains((x) => x === 2)).toBe(true)
      expect(deque.contains((x) => x === 5)).toBe(false)
    })

    it('should find element', () => {
      const deque = new Deque<number>()
      deque.addRear(1).addRear(2).addRear(3)
      expect(deque.find((x) => x > 1)).toBe(2)
      expect(deque.find((x) => x > 10)).toBeUndefined()
    })
  })

  describe('Functional Operations', () => {
    it('should filter elements', () => {
      const deque = new Deque<number>()
      deque.addRear(1).addRear(2).addRear(3).addRear(4)
      const filtered = deque.filter((x) => x % 2 === 0)
      expect(filtered.toArray()).toEqual([2, 4])
    })

    it('should map elements to new type', () => {
      const deque = new Deque<number>()
      deque.addRear(1).addRear(2).addRear(3)
      const mapped = deque.map((x) => x.toString())
      expect(mapped.toArray()).toEqual(['1', '2', '3'])
    })

    it('should forEach over elements', () => {
      const deque = new Deque<number>()
      deque.addRear(1).addRear(2).addRear(3)
      const results: number[] = []
      deque.forEach((x) => results.push(x))
      expect(results).toEqual([1, 2, 3])
    })
  })

  describe('Iteration', () => {
    it('should iterate front to rear', () => {
      const deque = new Deque<number>()
      deque.addRear(1).addRear(2).addRear(3)
      const items = [...deque]
      expect(items).toEqual([1, 2, 3])
    })

    it('should iterate rear to front', () => {
      const deque = new Deque<number>()
      deque.addRear(1).addRear(2).addRear(3)
      const items = [...deque.rearToFront()]
      expect(items).toEqual([3, 2, 1])
    })

    it('should work with for...of loop', () => {
      const deque = new Deque<number>()
      deque.addRear(1).addRear(2).addRear(3)
      const items: number[] = []
      for (const item of deque) {
        items.push(item)
      }
      expect(items).toEqual([1, 2, 3])
    })
  })

  describe('Clone and Copy', () => {
    it('should create a shallow clone', () => {
      const deque = new Deque<number>()
      deque.addRear(1).addRear(2).addRear(3)
      const clone = deque.clone()
      expect(clone.toArray()).toEqual(deque.toArray())
      expect(clone).not.toBe(deque)
    })

    it('should maintain independence after cloning', () => {
      const deque = new Deque<number>()
      deque.addRear(1).addRear(2)
      const clone = deque.clone()
      deque.addRear(3)
      expect(deque.size()).toBe(3)
      expect(clone.size()).toBe(2)
    })
  })

  describe('Reverse Operations', () => {
    it('should reverse deque in place', () => {
      const deque = new Deque<number>()
      deque.addRear(1).addRear(2).addRear(3)
      deque.reverse()
      expect(deque.toArray()).toEqual([3, 2, 1])
    })

    it('should return new reversed deque', () => {
      const deque = new Deque<number>()
      deque.addRear(1).addRear(2).addRear(3)
      const reversed = deque.reversed()
      expect(reversed.toArray()).toEqual([3, 2, 1])
      expect(deque.toArray()).toEqual([1, 2, 3]) // Original unchanged
    })

    it('should support method chaining with reverse', () => {
      const deque = new Deque<number>()
      deque.addRear(1).addRear(2).reverse().addRear(3)
      expect(deque.toArray()).toEqual([2, 1, 3])
    })
  })

  describe('Static Factory Methods', () => {
    it('should create from iterable', () => {
      const deque = Deque.from([1, 2, 3])
      expect(deque.toArray()).toEqual([1, 2, 3])
    })

    it('should create from spread arguments', () => {
      const deque = Deque.of(1, 2, 3)
      expect(deque.toArray()).toEqual([1, 2, 3])
    })

    it('should create from iterable with options', () => {
      const deque = Deque.from([1, 2, 3], { maxCapacity: 5 })
      expect(deque.size()).toBe(3)
      expect(deque.remainingCapacity()).toBe(2)
    })
  })

  describe('String and JSON Representation', () => {
    it('should have string representation', () => {
      const deque = new Deque<number>()
      deque.addRear(1).addRear(2)
      expect(deque.toString()).toBe('Deque(2) [1, 2]')
    })

    it('should convert to JSON', () => {
      const deque = new Deque<number>({ maxCapacity: 10 })
      deque.addRear(1).addRear(2)
      const json = deque.toJSON()
      expect(json).toEqual({
        type: 'Deque',
        size: 2,
        maxCapacity: 10,
        items: [1, 2]
      })
    })
  })

  describe('Generic Type Safety', () => {
    it('should work with string type', () => {
      const deque = new Deque<string>()
      deque.addRear('hello').addFront('world')
      expect(deque.peekFront()).toBe('world')
      expect(deque.peekRear()).toBe('hello')
    })

    it('should work with custom object types', () => {
      interface User {
        id: number
        name: string
      }

      const deque = new Deque<User>()
      deque.addRear({ id: 1, name: 'Alice' })
      deque.addFront({ id: 2, name: 'Bob' })

      const front = deque.peekFront()
      expect(front.name).toBe('Bob')
    })

    it('should work with union types', () => {
      type Value = number | string
      const deque = new Deque<Value>()
      deque.addRear(1).addRear('two').addFront(3)
      expect(deque.toArray()).toEqual([3, 1, 'two'])
    })

    it('should maintain type through map operation', () => {
      const numDeque = new Deque<number>()
      numDeque.addRear(1).addRear(2).addRear(3)
      const strDeque: Deque<string> = numDeque.map((n) => `num-${n}`)
      expect(strDeque.peekFront()).toBe('num-1')
    })
  })

  describe('Edge Cases', () => {
    it('should handle single element', () => {
      const deque = new Deque<number>()
      deque.addRear(42)
      expect(deque.peekFront()).toBe(42)
      expect(deque.peekRear()).toBe(42)
      expect(deque.removeFront()).toBe(42)
      expect(deque.isEmpty()).toBe(true)
    })

    it('should handle many operations', () => {
      const deque = new Deque<number>()
      for (let i = 0; i < 1000; i++) {
        if (i % 2 === 0) {
          deque.addRear(i)
        } else {
          deque.addFront(i)
        }
      }
      expect(deque.size()).toBe(1000)
    })

    it('should handle null and undefined values', () => {
      const deque = new Deque<number | null>()
      deque.addRear(null).addRear(1).addFront(2)
      expect(deque.peekFront()).toBe(2)
      expect(deque.toArray()).toEqual([2, null, 1])
    })
  })

  describe('Double-Ended Behavior', () => {
    it('should maintain order with alternating operations', () => {
      const deque = new Deque<number>()
      
      deque.addRear(3)      // [3]
      deque.addFront(2)     // [2, 3]
      deque.addRear(4)      // [2, 3, 4]
      deque.addFront(1)     // [1, 2, 3, 4]
      deque.addRear(5)      // [1, 2, 3, 4, 5]
      
      expect(deque.toArray()).toEqual([1, 2, 3, 4, 5])
      
      expect(deque.removeFront()).toBe(1)  // [2, 3, 4, 5]
      expect(deque.removeRear()).toBe(5)   // [2, 3, 4]
      expect(deque.removeFront()).toBe(2)  // [3, 4]
      expect(deque.removeRear()).toBe(4)   // [3]
      
      expect(deque.toArray()).toEqual([3])
    })

    it('should work as a stack (rear operations only)', () => {
      const deque = new Deque<number>()
      
      deque.addRear(1).addRear(2).addRear(3)
      
      expect(deque.removeRear()).toBe(3)
      expect(deque.removeRear()).toBe(2)
      expect(deque.removeRear()).toBe(1)
    })

    it('should work as a queue (front removal, rear addition)', () => {
      const deque = new Deque<number>()
      
      deque.addRear(1).addRear(2).addRear(3)
      
      expect(deque.removeFront()).toBe(1)
      expect(deque.removeFront()).toBe(2)
      expect(deque.removeFront()).toBe(3)
    })
  })

  describe('Complex Scenarios', () => {
    it('should handle sliding window pattern', () => {
      const deque = new Deque<number>()
      const nums = [1, 3, -1, -3, 5, 3, 6, 7]
      const k = 3
      const result: number[] = []

      for (let i = 0; i < nums.length; i++) {
        // Remove elements outside window
        while (!deque.isEmpty() && deque.peekFront()! < i - k + 1) {
          deque.removeFront()
        }
        
        // Remove smaller elements (for max in window)
        while (!deque.isEmpty() && nums[deque.peekRear()!] < nums[i]) {
          deque.removeRear()
        }
        
        deque.addRear(i)
        
        if (i >= k - 1) {
          result.push(nums[deque.peekFront()!])
        }
      }

      expect(result).toEqual([3, 3, 5, 5, 6, 7])
    })

    it('should handle palindrome checking', () => {
      const checkPalindrome = (str: string): boolean => {
        const deque = Deque.from(str.split(''))
        
        while (deque.size() > 1) {
          if (deque.removeFront() !== deque.removeRear()) {
            return false
          }
        }
        
        return true
      }

      expect(checkPalindrome('racecar')).toBe(true)
      expect(checkPalindrome('hello')).toBe(false)
      expect(checkPalindrome('a')).toBe(true)
      expect(checkPalindrome('ab')).toBe(false)
    })
  })
})
