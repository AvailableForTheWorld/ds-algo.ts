# TypeScript ESM Module Guide

## Why `.js` Extensions in TypeScript Files?

The `.js` extensions in imports are **CORRECT** for ESM TypeScript projects. This is required by TypeScript's ESM specification.

### Why This Is Necessary

1. **ES Modules Require Extensions**: Unlike CommonJS, ES modules require explicit file extensions
2. **Runtime Behavior**: At runtime, files will be `.js` (after compilation from `.ts`)
3. **TypeScript Resolution**: TypeScript will automatically resolve `.js` imports to `.ts` source files during development
4. **Official Recommendation**: This is the official TypeScript recommendation for ESM projects

### How It Works

```typescript
// ✅ CORRECT - Use .js extension
import { Stack } from './stack.js'

// ❌ INCORRECT - Will cause runtime errors
import { Stack } from './stack'
import { Stack } from './stack.ts'
```

**During Development:**

- TypeScript sees `import './stack.js'`
- TypeScript resolves this to `stack.ts` source file
- TypeScript compiles and type-checks the code

**After Build:**

- Files are compiled to `.js`
- Import paths remain as `.js`
- Everything works at runtime

### Current Configuration

Your `tsconfig.base.json` uses:

```json
{
  "module": "ESNext",
  "moduleResolution": "Bundler"
}
```

This configuration **requires** `.js` extensions in imports.

## Alternatives (If You Want .ts Extensions)

If you prefer `.ts` extensions during development, here are options:

### Option 1: Keep Current Setup (Recommended)

This is the TypeScript team's recommended approach. The `.js` extensions are correct.

**Pros:**

- Official TypeScript recommendation
- Works with all bundlers
- No additional configuration
- Portable and standard

**Cons:**

- Feels counterintuitive at first

### Option 2: Use TypeScript Paths (Not Recommended for This Project)

You could use path mappings, but this adds complexity:

```json
{
  "compilerOptions": {
    "paths": {
      "@ds-algo.ts/*": ["./packages/*/src"]
    }
  }
}
```

**Pros:**

- Can use shorter imports

**Cons:**

- Requires additional build configuration
- Not portable
- Can cause issues with bundlers

### Option 3: Change Module Resolution

Change to Node16 resolution:

```json
{
  "compilerOptions": {
    "module": "Node16",
    "moduleResolution": "Node16"
  }
}
```

But this still requires `.js` extensions for ESM!

## Recommendation

**Keep the current setup with `.js` extensions.** This is:

- The correct TypeScript approach
- The most portable solution
- The official recommendation
- What modern TypeScript projects use

## Common Questions

### Q: Why does my IDE show errors about `.d.ts` not being a module?

**A:** This happens when the `dist` folder doesn't exist yet. Run `pnpm build` to generate the compiled files.

### Q: Will imports work during development?

**A:** Yes! TypeScript automatically resolves `.js` imports to `.ts` source files during development.

### Q: What about in tests?

**A:** Vitest (configured in `vitest.config.ts`) has path aliases that resolve imports correctly.

### Q: Can I use import without extensions?

**A:** Not with ESM. The `.js` extension is required by the ES module specification.

## References

- [TypeScript Handbook - Modules](https://www.typescriptlang.org/docs/handbook/modules.html)
- [TypeScript ESM Support](https://www.typescriptlang.org/docs/handbook/esm-node.html)
- [Node.js ES Modules](https://nodejs.org/api/esm.html)

## Summary

✅ Using `.js` extensions in TypeScript imports is **correct and required** for ESM projects  
✅ TypeScript resolves `.js` imports to `.ts` files during development  
✅ After build, everything is `.js` and imports work correctly  
✅ This is the official TypeScript recommendation

The current project setup is correct and follows best practices! 🎉
