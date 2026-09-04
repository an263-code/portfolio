PROJECT

- Title: Data Mapping
- Eyebrow: Alida · Modern Dashboards
- Tagline: Six working prototypes in a week, one usability test, and an interaction model engineering could click through.
- Filename: project_data-mapping.html

METADATA

- Product: Alida Analytics
- Area: Modern Dashboards · Data Mapping
- Timeline: July – August 2026
- Role: Product Designer
- Team: 1 Designer · 1 PM · Engineering [CONFIRM headcount]
- Tools: Claude Code, Figma, Figma Make, Alida (survey + reports)
- Status: Validated, handed off to engineering

OVERVIEW (TL;DR)

- Problem: Every tracker wave is a separate survey, so question names and scales drift between waves — dashboards had no way to chart one metric across them, and customers stitched trends together in spreadsheets, outside the product.
- Approach: Settled the data model in a written design note first, then built six clickable prototypes in a week with Claude Code instead of static mocks, ran an unmoderated usability test on our own platform against decision rules set before fielding, and handed the tested prototype to engineering as the interaction spec.
- Result: SUS 84 (Grade A, benchmark 68) with 5 of 5 completing both tasks. The evidence validated the grid and killed the manual-first premise — the AI-assist layer is now on the roadmap because the data said so.

NARRATIVE

§1 — WHY IT MATTERS  (#context)

Headline: Trackers drift. Dashboards can't trend them.

The drift, with a real example (three image cards):
- Customer Tracker Q1'26 — "Will you repurchase?" — Yes / No
- Customer Tracker Q2'26 — "How likely are you to repurchase?" — 5-point scale
- Customer Tracker Q3'26 — "Do you plan to buy again?" — Yes / Maybe / No
- Punch: One reportable trend line? Not without a mapping layer.

- The workaround: customers stitched wave results together in spreadsheets — the analysis was happening outside the product.
- The second, quieter problem (process): an interaction-heavy paradigm like this is exactly what static Figma mocks are worst at. Each hi-fi direction costs weeks, so most ideas die unexplored.

The charter (three parts):
1. Design the feature — cross-source field mapping that fits alongside the tools researchers already use (Recodes, Weighting, Banners, Filters).
2. Validate before build — evidence from real researchers on a working prototype, not opinions on pictures.
3. Hand off unambiguously — a spec engineering can click through, inside the quarter.

- PM and engineering were in design crits throughout; every iteration below was reviewed cross-functionally.
- Section pull: "Weeks per direction is a design constraint, not just a schedule problem."

§2 — THINKING FIRST, THEN SIX PROTOTYPES  (#exploration)

Sidebar label: Thinking First, Then Prototypes

Opening: Before opening Figma or generating a prototype, I wrote a design note (July 22, 2026).
The interaction was undecided, but so was the model underneath it — and a prototype built on
the wrong model is a well-made wrong answer that costs a week to discover.

The concept: keep the formula, not just the result
- The analogy is a spreadsheet: a formula cell keeps both the formula and the value it produced.
- Data Mapping needs the same pair — the mapping rule (how three waves become one CSAT field)
  and the stored field that widgets read.
- Keeping the result is what keeps dashboards fast. Keeping the rule is what keeps them alive.
- Diagram 1 (inline SVG): two survey waves -> mapping rule (saved instructions, the formula)
  -> CSAT field (stored result, widgets read this). Plus the two behaviors: new answers make
  the rule run by itself; editing the rule rebuilds the field for all past data.

The Wave 4 test
- Two architectures were on the table, and at setup they look identical. The difference only
  appears later, so I picked the moment they diverge — Wave 4 launches in Q4 — and worked out
  what each does.
- Diagram 2 (inline SVG), two stacked halves:
  A — materialized field only: waves 1-3 -> one-time merge (instructions not saved, gone after
  setup) -> CSAT field frozen at waves 1-3. Wave 4 arrives with nothing to plug into.
  B — persisted rule + materialized field: same waves -> mapping rule (stays live) -> CSAT
  field covering waves 1-4. Wave 4 is picked up by the saved rule.
- Scenario table (all three, from the note):
  | Scenario                      | A — Field only                                          | B — Rule + field                                                    |
  | Wave 4 launches               | Rebuild — new field, remap all waves, repoint widgets    | Extend — add the source (~30s, auto-suggested); field rebuilds itself |
  | Late responses to Wave 3      | Missed — never appear in reporting                      | Automatic — rule runs on new data; zero user action                 |
  | Wave 2 scale coded backwards  | Start over — no rule left to fix                        | Edit — fix the rule; history recomputes                             |
- Verdict: B on all three, and not because it was more elegant. A isn't wrong so much as it
  quietly expires, and every scenario where it fails is one a tracker program hits by
  definition — the whole point of a tracker is that another wave is always coming.
- This is the decision that reappears as Key Decision 2 in §3, and it was made in a document
  before a single prototype existed.
- Note: the design note cites Qualtrics CX Dashboards documentation as prior art. Deliberately
  left off the public page.

Six working prototypes in one week
- With the model fixed, the open question narrowed: what interface makes that model obvious to
  a researcher?
- Six prototypes with Claude Code in a week. Every one is real, clickable HTML — not a mock —
  so crits ran on working software and feedback turned around same-day. Because they sat on the
  same settled foundation they were genuinely comparable: six answers to one question, not six
  different questions.

Carousel (6 slides):
- v1 · Dialog chooser — Wizard plus AI auto-detect, following the existing Recodes pattern.
- v2 · Inline choice — The choice moves onto the page; one less dialog.
- v3 · Living rules — The pivot: a grid where the rows are the mapping rules.
- v4 · One page + modal — Column-scoped AI detection; the grid grows both ways.
- v5.2 · Manual grid — AI stripped out to validate the foundation. Team pick, and the tested build.
- v6 · Single-select — A strict 1:1 alternative, documented as a trade-off.

The reset (the beat that matters):
- v1 through v4 all led with AI auto-detection, and in crits people kept questioning whether
  users would trust it.
- In the old world that feedback dies in a backlog, because starting over costs weeks. Here each
  direction cost about a day — so v5 could be a full reset (strip the AI out, validate the
  manual foundation first) instead of a patch.
- Section pull: "AI made being wrong cheap — which is what made the reset affordable."

§3 — THE TESTED BUILD  (#build)

Headline: v5.2 — a grid that teaches its own structure

- Rows are rules, columns are sources — growth affordances sit on the edges they grow from: add a field at the bottom, add a source on the right. No wizard needed.
- A rule plus a materialized field — we save both the formula and the stored result, so dashboards stay fast and a new wave extends the field automatically. No rebuild.
- Manual-first, on purpose — every AI suggestion was stripped out so the usability test would tell us whether the grid itself works, before we earned the AI layer back.
- Values align by direct manipulation — behind each row's chevron is a drag-and-drop matrix that merges source options into one reportable value. This is the interaction users called out.

§4 — VALIDATING ON OUR OWN PLATFORM  (#validation)

Headline: Tested on our own platform, demoed to customers

Pipeline (four image cards) — unmoderated usability test, dogfooding Alida end to end:
1. Claude Code prototype
2. Figma Make published URL
3. Embedded in an Alida survey
4. Fielded by the research services team, recorded

- Distribution, solved in one prompt: a local HTML file can't reach participants. Pasting the prototype into Figma Make produced a published, shareable URL.
- Two realistic tasks: map a drifted repurchase question across three waves; cover a newly closed Q4 wave and save.
- SUS plus open probes, with screen and click recording and AI follow-up probes on open answers.
- Decision rules pre-committed before fielding — e.g. "if at least half say manual-only won't scale, v5 needs an AI-assist layer." That turned the results into decisions instead of debates.

Live prototype demos on customer calls:
- Customers watched real interactions happen — expanding a row, dragging values into a merge, saving — not static mocks.
- Concrete feedback surfaced early: "what happens when the scales disagree?"
- Section pull: "Same artifact, three jobs: crit material, test stimulus, demo."

§5 — RESULTS  (#results)

Metrics (4 tiles):
- 84 — SUS, Grade A — benchmark average is 68
- 5 / 5 — completed both tasks — in ~4.3 minutes on average
- 5 / 5 — would use it frequently — top-two-box agreement
- 0 / 5 — want AI to decide alone — everyone wants review control

Caveat footnote: n = 5 against a recruit target of 12–20 — results are directional, and completion is self-reported.

- The verdict: "The interaction model works; the manual-first premise doesn't scale." Four of five said hand-building is viable only for a few key questions — crossing the decision rule set before fielding. The data, not opinion, says v5 needs an AI-assist layer.

Quotes:
- "It was a nice surprise to be able to map multiple source values to the same output value via the drag and drop." — P3, SUS 97.5
- "12 monthly surveys with 20 questions each would be painfully slow to set up manually." — P3, on why AI drafting must come back

§6 — HANDOFF  (#handoff)

Headline: A spec engineers click, not read

- Coded v5.2 is the interaction spec — engineering clicks through every behavior instead of decoding annotations. Hi-fi mocks pin down visual detail only.
- Test findings already shipped — source-column reordering and a "Not mapped" tray (removed values are parked, never lost) went into v5.2 before handoff.
- Roadmap set by evidence — next: AI-drafted field and value matching over the validated grid; manual becomes the fallback, not the default.
- The efficiency delta — six explored directions in a week versus weeks per direction, with one artifact serving crits, testing, and customer demos.

§7 — REFLECTION  (#reflection)

Headline: Speed buys judgment.

- Cheap iteration isn't about drawing faster — it made the v5 reset affordable. The craft shifts to deciding what to test.
- The other half: the week that mattered most started with a written note, not a prompt. AI made
  the making cheap; it didn't make the thinking optional. The six prototypes were only worth
  comparing because the model underneath them had already been argued out on paper.
- Evidence beats debate — pre-committing decision rules turned "should AI assist?" from an opinion war into a measurement.
- Trust is the design problem — users (0 of 5 want AI deciding alone) and customers ("what happens when the scales disagree?") converged on the same principle: AI drafts, humans review.

NEXT:
- Design the AI-drafting layer — suggestions arrive as reviewable drafts, never silent decisions.
- Close the confidence gap — response counts per mapped value and a live data preview, so users can verify they got it right.
- Re-test at proper scale — the 12–20 participants the original plan called for, with the per-task measures we cut.

NAV

- Previous: Reporting System Migration (project_report-migration.html)
- Next: Dashboard Revamp (project_dashboard-revamp.html)

IMAGE MANIFEST

The two §2 diagrams are real inline SVG in the page, not images — nothing to swap.
All slots below currently hold a copy of assets/img/placeholder.jpg (900x497). Swap in the real
screenshot by overwriting the file; if the real file is a .png, update the src in
project_data-mapping.html and the filename here to match.

1. data-mapping/thumbnail-data-mapping.jpg  — hero + index card thumbnail
   Capture: the v5.2 Data Mapping grid, populated, wide crop.
   Alt: "Data Mapping — the v5.2 grid with mapped fields as rows and data sources as columns."
   Caption: "The tested build: rows are mapped fields, columns are data sources."

2. data-mapping/drift-q1.jpg — Capture: Q1'26 tracker question, Yes/No answer options.
   Alt: "Customer Tracker Q1'26 asking \"Will you repurchase?\" with Yes / No answer options."
   Label: "Customer Tracker Q1'26" · Caption: "\"Will you repurchase?\" — Yes / No"

3. data-mapping/drift-q2.jpg — Capture: Q2'26 tracker question, 5-point scale.
   Alt: "Customer Tracker Q2'26 asking \"How likely are you to repurchase?\" on a five-point scale."
   Label: "Customer Tracker Q2'26" · Caption: "\"How likely are you to repurchase?\" — 5-point scale"

4. data-mapping/drift-q3.jpg — Capture: Q3'26 tracker question, Yes/Maybe/No.
   Alt: "Customer Tracker Q3'26 asking \"Do you plan to buy again?\" with Yes / Maybe / No answer options."
   Label: "Customer Tracker Q3'26" · Caption: "\"Do you plan to buy again?\" — Yes / Maybe / No"

5-10. data-mapping/v1.jpg … v6.jpg — Capture: one screenshot per prototype direction.
   v1 Alt: "Prototype v1 — a dialog chooser wizard with AI auto-detect, following the Recodes pattern."
   v2 Alt: "Prototype v2 — the mapping choice moved inline onto the page, removing a dialog."
   v3 Alt: "Prototype v3 — the pivot to a grid where each row is a mapping rule."
   v4 Alt: "Prototype v4 — one page plus a modal, with column-scoped AI detection and a grid that grows in both directions."
   v5 Alt: "Prototype v5.2 — the manual grid with AI stripped out, the team pick and the tested build."
   v6 Alt: "Prototype v6 — a strict one-to-one single-select alternative."

11. data-mapping/v5-2-grid.jpg — Capture: v5.2 grid, annotated or plain, showing the
    add-field affordance at the bottom and add-source at the right.
   Alt: "The v5.2 Data Mapping grid — rows are mapping rules, columns are data sources, with add-field at the bottom edge and add-source at the right edge."
   Label: "v5.2 · Data Mapping grid" · Caption: "Growth affordances sit on the edges they grow from."

12. data-mapping/value-alignment-matrix.jpg — Capture: the expanded row showing the
    drag-and-drop matrix merging source values into one reportable value.
   Alt: "The value-alignment matrix — source answer options dragged and merged into a single reportable value."
   Label: "Value-alignment matrix" · Caption: "Behavior engineering can click through instead of decoding annotations."

13-16. data-mapping/pipeline-1.jpg … pipeline-4.jpg — Capture: one image per step of the
    test pipeline.
   pipeline-1 Alt: "The Data Mapping prototype running as clickable HTML built with Claude Code."
   pipeline-2 Alt: "The prototype republished as a shareable URL through Figma Make."
   pipeline-3 Alt: "The published prototype embedded as a task inside an Alida survey."
   pipeline-4 Alt: "The study fielded and recorded by the research services team."
