---
name: evolve-ai-system
description: >-
  Maintains and extends the project's AI context system in .agents/ (rules,
  skills, context docs) and AGENTS.md. Use when the user wants to add a new
  rule or skill, when an agent made a repeated mistake that should be
  prevented, or after structural code changes that make the docs stale.
---

# Evolve the AI System

The `.agents/` folder is code. It rots like code. Keep it true and small.

## When to update what

| Situation | Update |
|---|---|
| Agent repeated a mistake / user corrected an agent | Add a one-line rule to the most specific rule file. If none fits, create one. |
| A multi-step task was done twice the same way | Create a skill. |
| Added/renamed a file, route, global, or data collection | `ARCHITECTURE.md` and/or `DATA_SCHEMA.md` |
| Found a bug / debt but not fixing now | `KNOWN_ISSUES.md` |
| Fixed something in `KNOWN_ISSUES.md` | Remove the row |
| Made a structural choice (new lib, new pattern, migration) | Append to `DECISIONS.md` |
| New class of bug slipped past verification | Add a check to `verify-locally/scripts/check.mjs` |

## Rule files (`.agents/rules/*.md`)

```md
---
trigger: always_on            # or: model_decision
description: When to apply    # required for model_decision
---
```

- **always_on** costs context every turn. Reserve it for things that cause damage if forgotten (architecture, integrity, production safety). Keep each under ~1 page.
- **model_decision** for topic-specific guidance (style, design). The description is what the agent sees to decide — write it as "Apply when …".
- Rules state constraints. Procedures belong in skills.

## Skills (`.agents/skills/<kebab-name>/SKILL.md`)

```md
---
name: kebab-name
description: >-
  What it does + when to use it (trigger words the user would say).
---
```

- Description is the only part loaded up front — make the trigger conditions explicit.
- Body: numbered steps, exact file paths, exact commands, a verification step at the end.
- Bulky reference material → `references/` subfolder; executable helpers → `scripts/`.
- Don't teach general programming. Only what's unique to this repo.

## Context docs (`.agents/context/*.md`)

Facts about the codebase, not instructions. If a fact can be derived by reading one file, link to the file instead of copying it.

## Hygiene

- After editing, re-read `AGENTS.md` — does its map still match reality?
- Delete instructions that no longer apply. Contradictory docs are worse than none.
- Cite sources: when documenting behavior, name the file (and function) it comes from.
