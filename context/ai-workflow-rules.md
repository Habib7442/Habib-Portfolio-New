# AI Workflow Rules: Habibfolio Redesign

## Behavior Rules
1. **Spec-Driven Implementation**: Before starting any unit, read the corresponding spec in `context/specs/`.
2. **Incremental Development**: Build one unit at a time. Do not implement features from future units unless they are small and strictly necessary.
3. **No Assumptions**: If a requirement is ambiguous or missing (e.g., "what should the hover state for this specific element be?"), ask the USER for clarification before proceeding.
4. **Consistency Enforcement**: Cross-reference `code-standards.md` and `ui-context.md` before creating new components or styles.
5. **Progress Tracking**: Update `context/progress-tracker.md` after every meaningful change. State what was built and what needs to happen next.

## Refactoring Policy
- If you find a pattern that violates `code-standards.md`, refactor it only if it's within the scope of the current unit.
- If a refactor is major, propose it as a new unit in the build plan first.

## Verification Checklist (Before finishing a unit)
- [ ] No TypeScript errors.
- [ ] No console warnings or errors.
- [ ] Responsive behavior verified at mobile (375px) and desktop (1440px).
- [ ] Accessibility: Tab through the UI, ensure focus rings are visible.
- [ ] Performance: Check that images have proper `sizes` and `priority` if needed.
- [ ] Documentation: Update any relevant context files if the implementation changed the design or architecture.
