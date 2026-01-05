---
name: pr-review
description: Review implemented code and create professional pull request. Use when code review is needed or when creating a PR for completed work that needs quality verification.
---

# PR Review

Code review with E2E testing and user approval gate.

## Process

Read [review.md](../../agents/review.md) and execute:

1. **Quality**: `npm run lint && npm run test && npm run build`
2. **E2E**: `npm run test:e2e:critical` — must pass
3. **Review**: TypeScript strict, edge cases, accessibility, security
4. **Approval**: Ask user before creating PR (required)
5. **PR**: Create with summary and testing checklist

## When to Use
After implementation is complete and ready for merge.
