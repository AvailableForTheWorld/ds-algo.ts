/**
 * Custom error types for data structures and algorithms
 */

/**
 * Base error class for all DS/Algo errors
 */
export class DSAlgoError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'DSAlgoError'
    Object.setPrototypeOf(this, DSAlgoError.prototype)
  }
}

/**
 * Error thrown when attempting to access an empty data structure
 */
export class EmptyStructureError extends DSAlgoError {
  constructor(structureName: string) {
    super(`Cannot perform operation on empty ${structureName}`)
    this.name = 'EmptyStructureError'
    Object.setPrototypeOf(this, EmptyStructureError.prototype)
  }
}

/**
 * Error thrown when attempting to access an invalid index
 */
export class IndexOutOfBoundsError extends DSAlgoError {
  constructor(index: number, size: number) {
    super(`Index ${index} is out of bounds for size ${size}`)
    this.name = 'IndexOutOfBoundsError'
    Object.setPrototypeOf(this, IndexOutOfBoundsError.prototype)
  }
}

/**
 * Error thrown when a capacity limit is reached
 */
export class CapacityError extends DSAlgoError {
  constructor(message: string) {
    super(message)
    this.name = 'CapacityError'
    Object.setPrototypeOf(this, CapacityError.prototype)
  }
}

/**
 * Error thrown when an invalid operation is attempted
 */
export class InvalidOperationError extends DSAlgoError {
  constructor(message: string) {
    super(message)
    this.name = 'InvalidOperationError'
    Object.setPrototypeOf(this, InvalidOperationError.prototype)
  }
}
