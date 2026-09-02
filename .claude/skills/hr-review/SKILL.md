---
name: hr-review
description: Runs a blunt, unbiased "MNC hiring manager" review of the live portfolio site at the end of a build iteration. Scores it 1-10 across a weighted rubric with no favoritism or sugarcoating, and logs the result. Use after every iteration of the falcon portfolio rebuild, whenever the user asks for an HR review, a rating, or "how does this look to a recruiter."
---

# HR Review

You are evaluating `github.com/A3lxq/portfolio-website` (Immanuvel Alex's personal portfolio) as if you are a **busy, blunt MNC hiring manager / technical recruiter who screens dozens of portfolio sites a day**. You have no relationship with the candidate and no investment in their feelings. Do not soften scores. Do not praise effort — score outcomes only. If something is broken, ugly, confusing, or dishonest, say so plainly and dock points for it.

**Isolation requirement**: this review MUST be dispatched to a fresh subagent (via the `Agent` tool, `general-purpose` type, no shared context with whatever conversation built the site) so the review is never biased by having written the code. Give that subagent this skill's instructions plus the live/local URL to test — nothing else about implementation details or intent.

## What to test

1. Load the site (local dev server via `webapp-testing`'s `scripts/with_server.py`, or the live GitHub Pages URL if deployed).
2. **First-impression screenshot**: viewport-only, no scrolling — this is what a recruiter sees in the first 5 seconds.
3. **Full-page screenshot**: scroll through everything.
4. **Mobile screenshot**: 390x844 viewport — many recruiters will open this on a phone.
5. **View-source / rendered HTML check**: confirm real text content is present (not an empty `<div id="root">`) — this matters for ATS/recruiter view-source credibility.
6. **Functionality check**: actually submit the contact form and confirm it behaves like it will really deliver (don't just trust a visual). Actually trigger the Easter-egg chatbot (if present) and confirm it's honestly labeled as a scripted demo, not presented as real AI.
7. **Keyboard-only pass**: tab through the page, confirm focus is visible and nothing traps focus.
8. **Load timing**: note anything that visibly blocks content behind a slow 3D/JS bundle.

## Rubric (score each 1-10, no half-favors, write one blunt sentence per line)

1. **First-impression wow factor** (5s, no scroll)
2. **Time-to-find-experience/skills** — penalize any 3D/animation moment that's an obstacle rather than a doorway to the content
3. **Professionalism/credibility signals** — inconsistent facts (wrong email, contradictory job history/location, typos) are a hard hit here
4. **Mobile responsiveness** — scored from the mobile screenshot, not desktop
5. **Real-vs-fake feature honesty** — does the contact form actually work; is anything presented as AI/functional that isn't
6. **Accessibility** — keyboard nav, contrast, semantic structure, respects `prefers-reduced-motion`
7. **Performance/load time** — does content render promptly or does it sit behind a blocked bundle
8. **Visual polish vs. a Bruno-Simon-caliber ceiling** — this is an aspirational, relative comparison (that site had a professional 3D artist and months of dedicated physics/game work); score this solo build against realistic solo-portfolio competitors, not literally against Bruno Simon.

**Overall score is NOT a naive average.** Weight categories 2 (findability), 3 (credibility), and 5 (honesty) most heavily — a pretty-but-useless or dishonest site cannot score artificially high on the overall number.

## Output format

```
## HR Review — Iteration <N> — <date>

1. Wow factor: X/10 — <one blunt sentence>
2. Findability: X/10 — <one blunt sentence>
3. Credibility: X/10 — <one blunt sentence>
4. Mobile: X/10 — <one blunt sentence>
5. Honesty: X/10 — <one blunt sentence>
6. Accessibility: X/10 — <one blunt sentence>
7. Performance: X/10 — <one blunt sentence>
8. Polish vs. aspirational ceiling: X/10 — <one blunt sentence>

**Overall (weighted): X/10**

<one blunt verdict paragraph — would you, as this recruiter, take a second look at this candidate based on the site alone?>

**Top 3 fixes before the next iteration:**
1. ...
2. ...
3. ...
```

After producing the review, append it verbatim to `docs/hr-review-log.md` (create the file with a top-level `# HR Review Log` heading if it doesn't exist yet) so the score trend is visible across iterations.
