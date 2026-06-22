# Plan: Remove Free Space (Compact View)

The user wants to "Remove free space". Based on the context of an invoice generator, this likely refers to reducing the white space or gaps in the UI to make it more compact, particularly in the `PrintableInvoice` component or the main `App` layout.

## Scope
- Identify and reduce excessive padding/margins in `PrintableInvoice.tsx`.
- Identify and reduce excessive vertical spacing in the main `App.tsx` layout.
- Ensure the compact design remains readable and professional for printing.

## Assumptions
- "Free space" refers to UI white space (padding/margins).
- The goal is a more information-dense view.

## Affected Areas
- `src/components/PrintableInvoice.tsx` (Margins and paddings)
- `src/App.tsx` (Container spacing)
- `src/index.css` (Global spacing overrides if necessary)

## Auth & RLS model
**Auth in scope:** no
**Model:** no_auth_public_read
**RLS strategy:** none
**Frontend implication:** none

## Migration baseline
**Local migrations in project:** none
**User confirmed proceed on connected DB:** not_applicable

## Phases

### Phase 1: Compact Printable Invoice
- Reduce margins in `PrintableInvoice.tsx`.
- Tighten table cell padding.
- Decrease spacing between header sections (Customer Info, Invoice Details).
- **Owner:** `quick_fix_engineer`

### Phase 2: Compact App Layout
- Reduce vertical spacing (`space-y-6` to `space-y-4` or `space-y-2`) in `App.tsx`.
- Adjust card paddings.
- **Owner:** `quick_fix_engineer`

## Execution Handoff

**Plan status:** ready

**Dispatch order:**
1. quick_fix_engineer — Tighten spacing across the UI.

**Per-agent instructions:**

### 1. quick_fix_engineer
- **Phases:** Phase 1 & 2
- **Scope:** 
    - In `src/components/PrintableInvoice.tsx`:
        - Reduce `p-8` or similar large paddings to `p-4` or `p-2`.
        - Reduce `gap-8` to `gap-4` in the header grid.
        - Tighten `th` and `td` padding in the table.
    - In `src/App.tsx`:
        - Change `space-y-6` to `space-y-4` in the main containers.
        - Reduce `pb-10` and `pt-10` margins.
- **Files:** `src/components/PrintableInvoice.tsx`, `src/App.tsx`
- **Depends on:** none
- **Acceptance criteria:** The UI looks more compact with significantly less white space between elements.
