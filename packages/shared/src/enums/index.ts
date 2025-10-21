/**
 * Common enumerations for data structures and algorithms
 */

/**
 * Traversal order for tree-based structures
 */
export enum TraversalOrder {
  IN_ORDER = 'in-order',
  PRE_ORDER = 'pre-order',
  POST_ORDER = 'post-order',
  LEVEL_ORDER = 'level-order'
}

/**
 * Sort order enumeration
 */
export enum SortOrder {
  ASCENDING = 'ascending',
  DESCENDING = 'descending'
}

/**
 * Comparison result enumeration
 */
export enum ComparisonResult {
  LESS_THAN = -1,
  EQUAL = 0,
  GREATER_THAN = 1
}

/**
 * Structure capacity mode
 */
export enum CapacityMode {
  FIXED = 'fixed',
  DYNAMIC = 'dynamic',
  BOUNDED = 'bounded'
}
