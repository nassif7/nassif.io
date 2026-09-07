// Workaround for a tsx/@next/env interop bug: tsx's ESM transform expects
// @next/env to have a `.default` export, but it's a plain CJS module with
// named exports only. Pre-loading it here (plain require, unaffected by
// tsx's transform) and aliasing `.default` to itself fixes it for anything
// that requires it later via the shared module cache.
const nextEnv = require('@next/env')
if (!nextEnv.default) nextEnv.default = nextEnv
