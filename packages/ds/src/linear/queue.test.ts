/**
 * Queue Tests
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { Queue } from './queue'
import { EmptyStructureError, CapacityError } from '@ds-algo.ts/shared'

describe('Queue', () => {
  describe('Constructor and Initialization', () => {
    it('should create an empty queue', () => {
      const queue = new Queue<number>()
      expect(queue.isEmpty()).toBe(true)
      expect(queue.size()).toBe(0)
    })

    it('should create queue with initial elements', () => {
      const queue = new Queue<number>({
        initialElements: [1, 2, 3]
      })
      expect(queue.size()).toBe(3)
      expect(queue.peekFront()).toBe(1) // First element enqueued is at front
      expect(queue.peekRear()).toBe(3) // Last element enqueued is at rear
    })

    it('should create queue with max capacity', () => {
      const queue = new Queue<number>({
        maxCapacity: 5
      })
      expect(queue.remainingCapacity()).toBe(5)
    })

    it('should respect max capacity', () => {
      const queue = new Queue<number>({
        maxCapacity: 2
      })
      queue.enqueue(1)
      queue.enqueue(2)
      expect(queue.isFull()).toBe(true)
    })
  })

  describe('Basic Operations', () => {
    let queue: Queue<number>

    beforeEach(() => {
      queue = new Queue<number>()
    })

    it('should enqueue elements to the queue', () => {
      queue.enqueue(1)
      expect(queue.size()).toBe(1)
      expect(queue.peekFront()).toBe(1)
      expect(queue.peekRear()).toBe(1)

      queue.enqueue(2)
      expect(queue.size()).toBe(2)
      expect(queue.peekFront()).toBe(1)
      expect(queue.peekRear()).toBe(2)
    })

    it('should support method chaining for enqueue', () => {
      queue.enqueue(1).enqueue(2).enqueue(3)
      expect(queue.size()).toBe(3)
      expect(queue.peekFront()).toBe(1)
      expect(queue.peekRear()).toBe(3)
    })

    it('should dequeue elements from the queue (FIFO)', () => {
      queue.enqueue(1).enqueue(2).enqueue(3)
      expect(queue.dequeue()).toBe(1)
      expect(queue.size()).toBe(2)
      expect(queue.dequeue()).toBe(2)
      expect(queue.dequeue()).toBe(3)
      expect(queue.isEmpty()).toBe(true)
    })

    it('should peek at the front element without removing it', () => {
      queue.enqueue(1).enqueue(2)
      expect(queue.peekFront()).toBe(1)
      expect(queue.size()).toBe(2) // Size unchanged
      expect(queue.peekFront()).toBe(1) // Still there
    })

    it('should peek at the rear element without removing it', () => {
      queue.enqueue(1).enqueue(2)
      expect(queue.peekRear()).toBe(2)
      expect(queue.size()).toBe(2) // Size unchanged
      expect(queue.peekRear()).toBe(2) // Still there
    })

    it('should throw error when dequeuing from empty queue', () => {
      expect(() => queue.dequeue()).toThrow(EmptyStructureError)
    })

    it('should throw error when peeking at empty queue front', () => {
      expect(() => queue.peekFront()).toThrow(EmptyStructureError)
    })

    it('should throw error when peeking at empty queue rear', () => {
      expect(() => queue.peekRear()).toThrow(EmptyStructureError)
    })
  })

  describe('Safe Operations', () => {
    it('should return undefined when safe dequeuing from empty queue', () => {
      const queue = new Queue<number>()
      expect(queue.dequeueSafe()).toBeUndefined()
    })

    it('should return undefined when safe peeking at empty queue front', () => {
      const queue = new Queue<number>()
      expect(queue.peekFrontSafe()).toBeUndefined()
    })

    it('should return undefined when safe peeking at empty queue rear', () => {
      const queue = new Queue<number>()
      expect(queue.peekRearSafe()).toBeUndefined()
    })

    it('should safely dequeue elements', () => {
      const queue = new Queue<number>()
      queue.enqueue(1).enqueue(2)
      expect(queue.dequeueSafe()).toBe(1)
      expect(queue.dequeueSafe()).toBe(2)
      expect(queue.dequeueSafe()).toBeUndefined()
    })
  })

  describe('Capacity Management', () => {
    it('should throw error when exceeding max capacity', () => {
      const queue = new Queue<number>({ maxCapacity: 2 })
      queue.enqueue(1).enqueue(2)
      expect(() => queue.enqueue(3)).toThrow(CapacityError)
    })

    it('should report correct remaining capacity', () => {
      const queue = new Queue<number>({ maxCapacity: 5 })
      expect(queue.remainingCapacity()).toBe(5)
      queue.enqueue(1).enqueue(2)
      expect(queue.remainingCapacity()).toBe(3)
    })

    it('should report infinite capacity when no max set', () => {
      const queue = new Queue<number>()
      expect(queue.remainingCapacity()).toBe(Infinity)
    })

    it('should correctly identify full queue', () => {
      const queue = new Queue<number>({ maxCapacity: 2 })
      expect(queue.isFull()).toBe(false)
      queue.enqueue(1).enqueue(2)
      expect(queue.isFull()).toBe(true)
    })
  })

  describe('Collection Operations', () => {
    it('should clear the queue', () => {
      const queue = new Queue<number>()
      queue.enqueue(1).enqueue(2).enqueue(3)
      queue.clear()
      expect(queue.isEmpty()).toBe(true)
      expect(queue.size()).toBe(0)
    })

    it('should convert to array (front to rear)', () => {
      const queue = new Queue<number>()
      queue.enqueue(1).enqueue(2).enqueue(3)
      expect(queue.toArray()).toEqual([1, 2, 3])
    })

    it('should check if element exists', () => {
      const queue = new Queue<number>()
      queue.enqueue(1).enqueue(2).enqueue(3)
      expect(queue.contains((x) => x === 2)).toBe(true)
      expect(queue.contains((x) => x === 5)).toBe(false)
    })

    it('should find element', () => {
      const queue = new Queue<number>()
      queue.enqueue(1).enqueue(2).enqueue(3)
      expect(queue.find((x) => x > 1)).toBe(2)
      expect(queue.find((x) => x > 10)).toBeUndefined()
    })
  })

  describe('Functional Operations', () => {
    it('should filter elements', () => {
      const queue = new Queue<number>()
      queue.enqueue(1).enqueue(2).enqueue(3).enqueue(4)
      const filtered = queue.filter((x) => x % 2 === 0)
      expect(filtered.toArray()).toEqual([2, 4])
    })

    it('should map elements to new type', () => {
      const queue = new Queue<number>()
      queue.enqueue(1).enqueue(2).enqueue(3)
      const mapped = queue.map((x) => x.toString())
      expect(mapped.toArray()).toEqual(['1', '2', '3'])
    })

    it('should forEach over elements', () => {
      const queue = new Queue<number>()
      queue.enqueue(1).enqueue(2).enqueue(3)
      const results: number[] = []
      queue.forEach((x) => results.push(x))
      expect(results).toEqual([1, 2, 3]) // Front to rear order
    })
  })

  describe('Iteration', () => {
    it('should iterate front to rear', () => {
      const queue = new Queue<number>()
      queue.enqueue(1).enqueue(2).enqueue(3)
      const items = [...queue]
      expect(items).toEqual([1, 2, 3])
    })

    it('should work with for...of loop', () => {
      const queue = new Queue<number>()
      queue.enqueue(1).enqueue(2).enqueue(3)
      const items: number[] = []
      for (const item of queue) {
        items.push(item)
      }
      expect(items).toEqual([1, 2, 3])
    })
  })

  describe('Clone and Copy', () => {
    it('should create a shallow clone', () => {
      const queue = new Queue<number>()
      queue.enqueue(1).enqueue(2).enqueue(3)
      const clone = queue.clone()
      expect(clone.toArray()).toEqual(queue.toArray())
      expect(clone).not.toBe(queue)
    })

    it('should maintain independence after cloning', () => {
      const queue = new Queue<number>()
      queue.enqueue(1).enqueue(2)
      const clone = queue.clone()
      queue.enqueue(3)
      expect(queue.size()).toBe(3)
      expect(clone.size()).toBe(2)
    })
  })

  describe('Static Factory Methods', () => {
    it('should create from iterable', () => {
      const queue = Queue.from([1, 2, 3])
      expect(queue.toArray()).toEqual([1, 2, 3])
    })

    it('should create from spread arguments', () => {
      const queue = Queue.of(1, 2, 3)
      expect(queue.toArray()).toEqual([1, 2, 3])
    })

    it('should create from iterable with options', () => {
      const queue = Queue.from([1, 2, 3], { maxCapacity: 5 })
      expect(queue.size()).toBe(3)
      expect(queue.remainingCapacity()).toBe(2)
    })
  })

  describe('String and JSON Representation', () => {
    it('should have string representation', () => {
      const queue = new Queue<number>()
      queue.enqueue(1).enqueue(2)
      expect(queue.toString()).toBe('Queue(2) [1, 2]')
    })

    it('should convert to JSON', () => {
      const queue = new Queue<number>({ maxCapacity: 10 })
      queue.enqueue(1).enqueue(2)
      const json = queue.toJSON()
      expect(json).toEqual({
        type: 'Queue',
        size: 2,
        maxCapacity: 10,
        items: [1, 2]
      })
    })
  })

  describe('Generic Type Safety', () => {
    it('should work with string type', () => {
      const queue = new Queue<string>()
      queue.enqueue('hello').enqueue('world')
      expect(queue.peekFront()).toBe('hello')
      expect(queue.peekRear()).toBe('world')
    })

    it('should work with custom object types', () => {
      interface User {
        id: number
        name: string
      }

      const queue = new Queue<User>()
      queue.enqueue({ id: 1, name: 'Alice' })
      queue.enqueue({ id: 2, name: 'Bob' })

      const user = queue.peekFront()
      expect(user.name).toBe('Alice')
    })

    it('should work with union types', () => {
      type Value = number | string
      const queue = new Queue<Value>()
      queue.enqueue(1).enqueue('two').enqueue(3)
      expect(queue.toArray()).toEqual([1, 'two', 3])
    })

    it('should maintain type through map operation', () => {
      const numQueue = new Queue<number>()
      numQueue.enqueue(1).enqueue(2).enqueue(3)
      const strQueue: Queue<string> = numQueue.map((n) => `num-${n}`)
      expect(strQueue.peekFront()).toBe('num-1')
    })
  })

  describe('Edge Cases', () => {
    it('should handle single element', () => {
      const queue = new Queue<number>()
      queue.enqueue(42)
      expect(queue.peekFront()).toBe(42)
      expect(queue.peekRear()).toBe(42)
      expect(queue.dequeue()).toBe(42)
      expect(queue.isEmpty()).toBe(true)
    })

    it('should handle many operations', () => {
      const queue = new Queue<number>()
      for (let i = 0; i < 1000; i++) {
        queue.enqueue(i)
      }
      expect(queue.size()).toBe(1000)
      expect(queue.peekFront()).toBe(0)
      expect(queue.peekRear()).toBe(999)
    })

    it('should handle null and undefined values', () => {
      const queue = new Queue<number | null>()
      queue.enqueue(null).enqueue(1)
      expect(queue.peekFront()).toBe(null)
      expect(queue.peekRear()).toBe(1)
      queue.dequeue()
      expect(queue.peekFront()).toBe(1)
    })
  })

  describe('FIFO Behavior', () => {
    it('should maintain FIFO order through multiple enqueue/dequeue cycles', () => {
      const queue = new Queue<number>()
      
      // Add some elements
      queue.enqueue(1).enqueue(2).enqueue(3)
      
      // Remove first two
      expect(queue.dequeue()).toBe(1)
      expect(queue.dequeue()).toBe(2)
      
      // Add more elements
      queue.enqueue(4).enqueue(5)
      
      // Verify order is maintained
      expect(queue.dequeue()).toBe(3)
      expect(queue.dequeue()).toBe(4)
      expect(queue.dequeue()).toBe(5)
      expect(queue.isEmpty()).toBe(true)
    })

    it('should correctly handle interleaved operations', () => {
      const queue = new Queue<string>()
      
      queue.enqueue('A')
      expect(queue.dequeue()).toBe('A')
      
      queue.enqueue('B').enqueue('C')
      expect(queue.dequeue()).toBe('B')
      
      queue.enqueue('D')
      expect(queue.toArray()).toEqual(['C', 'D'])
    })
  })
})
