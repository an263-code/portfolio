PROJECT

- Title: Data Mapping
- Eyebrow: Research SaaS · Dashboard
- Tagline: Decide the data model on paper, pressure-test it with engineering and customers, then validate the interaction with researchers — before any production code.
- Filename: project_data-mapping.html

METADATA

- Product: Research SaaS
- Area: Dashboard · Data Mapping
- Timeline: July – August 2026 (~6 weeks)
- Role: Product Designer
- Team: 1 Designer · 1 PM · 6-7 Engineers
- Tools: Figma, Claude Code (clickable prototypes), Figma Make (secure prototype sharing), Alida Surveys (usability testing)

ORIENTATION (for readers new to the product)

- Alida is a B2B research platform: enterprise teams (LinkedIn, Warner Bros. Discovery, the Financial Times) run surveys against a standing opted-in audience and analyze the results in reports and dashboards.
- A tracker is a survey re-run on a schedule — quarterly, say — so a team can watch a metric move over time. Each run is a wave.
- A dashboard tile reads from a field: a stored column of answers. Trackers break this, because each wave is its own survey, so the "same" question is a new field every time.
- The user here is the researcher who builds the dashboard.

OVERVIEW (TL;DR)

- Problem: Every tracker wave is a separate survey, so question names and scales drift between waves. Dashboards couldn't chart one metric across waves, so customers rebuilt trends in spreadsheets — the analysis was happening outside the product.
- Approach: Settle the data model first — a saved mapping rule, not a one-time merge — and commit to it on a written assumption before any user saw it. Pressure-test that choice with PM, engineering, customer signals, and competitor research; widen scope to answer-value mapping; then validate the interaction with researchers in an unmoderated test, fielded like a real study. Each AI tool in that chain answered a specific constraint, not a mandate to use one.
- Result: SUS 84 (Grade A, benchmark 68); 5 of 5 finished both grid tasks. The test validated the grid interaction and confirmed the sequence — ship the manual grid now, layer AI-assist next — with the layer's requirements already gathered. Hand-building held for a few key questions, not a full tracker program.

NARRATIVE

§1 — WHY IT MATTERS  (#context)

Headline: Trackers drift. Dashboards can't trend them.

The drift, with a real example (three image cards):
- Customer Tracker Q1'26 — "Will you repurchase?" — Yes / No
- Customer Tracker Q2'26 — "How likely are you to repurchase?" — 5-point scale
- Customer Tracker Q3'26 — "Do you plan to buy again?" — Yes / Maybe / No
- Punch: One trend line? Not without a mapping layer.

- The workaround: customers exported each wave and rebuilt the trend in spreadsheets — the reporting left the product, and left again every quarter.
- Why the business cares: trending a tracker is the core job customers buy a research platform to do. When that job runs in Excel, the platform is just a data source, not where the work happens — and that's the gap a competitor closes.
- The quieter problem: this kind of work is interaction-heavy, and directions you can't click get argued about instead of tested.

The charter (three parts):
1. Design the feature — cross-source field mapping that fits alongside the tools researchers already use (Recodes, Weighting, Banners, Filters).
2. Validate before build — evidence from real researchers on a working prototype, not just reactions to static mocks.
3. Hand off cleanly — a spec engineering can click through, within the quarter.

- PM and engineering leads joined design crits throughout; every iteration below was reviewed cross-functionally.
- Section pull: "When the work runs in a spreadsheet, the product is a data source, not the workplace."

§2 — CHOOSING THE MODEL BEFORE THE INTERFACE  (#exploration)

Sidebar label: The Model Decision

Opening: The interaction was undecided — and so was the data model under it. Ship the
wrong model and every wave after compounds the cost — unwinding it in production is far
more expensive than settling it now. So I started with the model. There were two candidates.

The idea: keep the formula, not just the result
- Think of a spreadsheet: a formula cell holds both the formula and the value it produced.
- Data Mapping needs the same pair — the mapping rule (how three waves become one CSAT field)
  and the stored field that tiles read.
- Keeping the result is what keeps dashboards fast. Keeping the rule is what keeps them alive.
- Diagram 1 (inline SVG): two survey waves -> mapping rule (saved instructions, the formula)
  -> CSAT field (stored result, tiles read this). Plus two behaviors: new answers run the
  rule automatically; editing the rule rebuilds the field for all past data.

Two concepts, one prototype each
- Concept A — materialized field only: waves are merged once into a new field. The merge
  instructions aren't kept; after setup there's a field and nothing else.
- Concept B — saved rule + materialized field: the same merge, but the rule stays live
  next to the field it produced.
- Both were small clickable prototypes, not static mocks, so the difference could be
  walked through, not just described.
- Diagram 2 (inline SVG), two stacked halves:
  A — materialized field only: waves 1-3 -> one-time merge (instructions gone after setup) ->
  CSAT field frozen at waves 1-3. Wave 4 arrives with nothing to plug into.
  B — saved rule + materialized field: same waves -> mapping rule (stays live) -> CSAT
  field covering waves 1-4. Wave 4 is picked up by the saved rule.

The assumption I committed to
- I picked Concept B before any user saw it, on this assumption: for a tracker, the cost
  that compounds is maintenance, not setup. A tracker exists because another wave is always
  coming — so a model that needs someone to rebuild the field and re-point every tile each
  wave (A) bleeds time on every cycle, while a model that keeps the rule live (B) absorbs
  the new wave on its own.
- The bet had two parts: that A's recurring cost would outweigh its simpler build, and that
  researchers would feel that cost sharply — re-pointing tiles after every wave is exactly
  the invisible chore that sends people back to a spreadsheet.
- I wrote the reasoning up as a short design note, so PM and engineering could argue with the
  logic, not just react to a mock.
- Scenario table (from the note):
  | Scenario                      | A — Field only                                          | B — Rule + field                                                     |
  | Wave 4 launches               | Rebuild — new field, remap all waves, repoint tiles      | Extend — add the new wave as a source by hand (~30s); field rebuilds itself |
  | Late responses to Wave 3      | Missed — never appear in reporting                      | Automatic — rule runs on new data; zero user action                  |
  | Wave 2 scale coded backwards  | Start over — no rule left to fix                        | Edit — fix the rule; history recomputes                             |
- Verdict: B, on the bet that recurring rework is the cost that matters. A isn't wrong so
  much as it quietly expires, and every scenario where it fails is one a tracker hits by
  definition.
- One caveat I flagged in the note: rebuilding the field restates numbers a customer may
  already have in a deck. B has to make a recompute visible — a version note on the field —
  not silent. Carried into the handoff.

Reviewing the concepts with PM and engineering
- I walked both prototypes through PM and dev leads in crit. The assumption behind B held —
  no one could name a tracker scenario where A's simplicity paid off.
- The review surfaced a gap the concepts missed: field-level mapping isn't enough for choice
  questions. When Wave 1 asks Yes / No and Wave 2 uses a 5-point scale, calling them "the
  same question" doesn't tell the dashboard which scale points count as "Yes." The mapping
  has to reach the answer-value level.
- I iterated Concept B to add a value-alignment layer — a place to say how source answer
  options collapse into one reportable value — without disturbing the rule-plus-field model
  underneath.

Bracketing the scope: how far does value mapping go?
- The open question was how much value logic to support. I built two more prototypes to make
  the trade-off concrete:
  - With value recoding — source options can be merged and renamed into one reportable value
    (a drag-and-drop matrix).
  - Without — strict 1:1, each source option maps to exactly one output, no merging.
- What decided it: a customer call ("what happens when the scales disagree?") and a look at
  competitors — Qualtrics CX Dashboards treats value-level recoding as table stakes. A
  drifted question can't be trended at all without collapsing mismatched scales.
- I took both prototypes back to dev leads and PM and confirmed scope: value recoding is in.
  The recoding prototype — our fifth build, second revision, so v5.2 in the file names —
  became the build to test; the strict 1:1 version stayed documented as the trade-off we
  chose against.
- Section pull: "The model was a judgment call I made first; the scope came from the room."

§3 — THE TESTED BUILD  (#build)

Headline: v5.2 — a grid that teaches its own structure

Getting to the grid:
- The first direction followed the existing Recodes pattern — a dialog wizard stepping
  through sources, then questions, then values. Crit verdict: opaque. The wizard hid the
  shape of what you were building, and you couldn't see all your mappings at once.
- Pulling the choices inline onto the page helped but didn't fix visibility. The grid did —
  every rule and every source on one surface, structure clear at a glance. The wizard's
  steps became directions you grow the grid.

What the grid does:
- Rows are rules, columns are sources. Growth controls sit on the edges they grow from: add a field at the bottom, add a source on the right. No wizard.
- A rule plus a materialized field — we save both the formula and the stored result, so dashboards stay fast and a new wave extends the field automatically. No rebuild.
- Manual-first by sequence, not by preference — no AI suggestions in the tested build. AI-assist was always the next layer; testing the manual grid first meant we'd know the foundation held before building the layer that leans on it.
- Values align by direct manipulation — behind each row's chevron is a drag-and-drop matrix that merges source options into one reportable value. This is the interaction users singled out.

§4 — VALIDATING ON OUR OWN PLATFORM  (#validation)

Headline: Tested with researchers — once I could share the prototype safely

The sharing problem (a real constraint for early concept testing):
- A clickable prototype that lives as a local HTML file can't reach recruited participants.
  A Figma prototype sits behind SSO; a public link puts an unreleased concept on the open web.
  Getting honest early feedback without leaking the concept is a wall most designers hit and
  few have a clean answer for.
- The fix: Figma Make published the prototype to a URL I could embed as a task inside an
  Alida survey — delivered to recruited participants, not the open web, and retired when the
  study closed.
- Section pull: "Honest early feedback without leaking the concept — that's the wall."

Pipeline (four image cards) — unmoderated usability test, dogfooding Alida end to end:
1. Clickable HTML prototype
2. Figma Make published URL
3. Embedded as a task in an Alida survey
4. Fielded and recorded by the research services team

- Two tasks tested the grid mechanics: map a drifted repurchase question across three waves; add a newly closed Q4 wave and save.
- SUS plus open questions, with screen and click recording. Alida's AI follow-up probes chased each open answer for a reason — roughly the depth a moderator gets, in an unmoderated test.
- The open questions also gathered requirements for the AI-assist layer already sequenced next: how much it should draft, how much the researcher keeps hold of. The tested build had no AI, so the answers describe what researchers want rather than a reaction to our version of it.
- One pre-registered decision rule: if at least half said hand-building won't scale past a few questions, that settled AI-assist as the next layer instead of a maybe. Writing the threshold down first kept a small sample from being read to taste.

Live prototype demos on customer calls:
- Customers watched real interactions — expanding a row, dragging values into a merge, saving — not static mocks.
- The "what happens when the scales disagree?" concern came up again here, from a different customer than the §2 call — the same signal twice.
- Section pull: "Same artifact, three jobs: crit material, test stimulus, demo."

§5 — RESULTS  (#results)

Metrics (4 tiles):
- 84 — SUS, Grade A — benchmark average is 68
- 5 / 5 — finished both tasks — in ~4.3 minutes on average
- 5 / 5 — would use it often — top-two-box agreement
- 0 / 5 — want AI to decide alone — matches the review-first principle the grid was designed toward

Caveat footnote: n = 5. Recruiting ran short inside a six-week window that also had to ship the build, so we fielded with what we had against a 12–20 target. Results are directional; task completion is self-reported, though recordings were reviewed for behavior. The scaling limit was probed in interview, not measured against a large mapping task.

- The verdict: the grid interaction works, and hand-building it doesn't stretch to a full tracker program. Four of five said mapping by hand is fine for a few key questions but not a program of them — crossing the pre-registered rule. That's participants reasoning about their own workload, not a scaling test we ran; as a signal for sequencing AI-assist next, it was consistent and clear.
- Closing the loop to the problem: [CONFIRM — add the read on whether participants expected a working mapping layer to pull their tracker reporting back out of spreadsheets]. That exodus is what the project set out to reverse, so the results should speak to it.

Quotes:
- "It was a nice surprise to be able to map multiple source values to the same output value via the drag and drop." — P3, SUS 97.5
- "12 monthly surveys with 20 questions each would be painfully slow to set up manually." — P3, on why AI drafting must come next

§6 — HANDOFF  (#handoff)

Headline: A spec engineers click, not read

- Coded v5.2 carries the interaction spec — engineering clicks through the core behaviors instead of decoding annotations. Hi-fi mocks pin down visual detail; empty, error and edge-case states are written up alongside, not left implied in the prototype.
- Test findings already shipped — source-column reordering and a "Not mapped" tray (removed values are parked, never lost) went into v5.2 before handoff.
- Open question handed over with it — recomputing a field restates numbers customers may have already presented. Flagged for engineering and PM: recomputes need a visible version note, not a silent update.
- Where it stands — handed to engineering against the coded spec; [CONFIRM current build status].
- Roadmap set by evidence — the AI-assist layer is now scoped: AI-drafted field and value matching over the validated grid, with manual as the fallback and every draft reviewable.
- Reusable workflow — the Figma Make route for fielding an unreleased prototype inside a real survey is now a pattern the team can reuse for early concept testing.

§7 — REFLECTION  (#reflection)

Headline: Decide the model on paper. Test the interface with people.

- The model decision (Concept A vs B) was a judgment call I committed to before any user saw
  it, then pressure-tested in crit rather than in the study — the session test exercised the
  grid, not the quarter-later maintenance savings that separate A from B. It held up against
  every tracker scenario PM and engineering could name, which is the validation a model
  choice can get at this stage. A polished prototype built on A would have tested just as
  well in one session and still expired at Wave 4.
- What the study actually bought — not a rescue from the wrong design, but the confidence to
  sequence: grid now, AI-assist next, with the layer's requirements already in hand.
  De-risking a roadmap decision is a quieter outcome than a pivot, and still worth a study
  to get right.
- Scope came from the room, not the brief — the answer-value requirement and the recoding
  scope both surfaced in cross-functional review and customer calls, not the original charter.
  The design job was as much about running those conversations as drawing the grid.
- AI tools earned their place against a specific constraint, not a mandate. Claude Code,
  because interaction-heavy directions get argued about until they're clickable — so crits
  and the study ran on working software. Figma Make, because secure sharing was the one thing
  between the concept and real participants. Alida's follow-up probes, because an unmoderated
  test still needs someone asking "why." In the product, AI-assist was sequenced, not
  withheld as a gimmick: build the manual grid, prove it holds, then layer drafting on top.
- Secure sharing is the unglamorous blocker — the study only happened because there was a way
  to field an unreleased prototype without publishing it. Worth naming, because every designer
  running early concept tests hits this wall.
- Trust is the design problem — the review-first principle the grid was built on is the one
  users (0 of 5 want AI deciding alone) and customers ("what happens when the scales
  disagree?") both asked for unprompted. AI drafts, humans review.

NEXT:
- Design the AI-drafting layer — suggestions arrive as reviewable drafts, never silent decisions.
- Close the confidence gap — response counts per mapped value and a live data preview, so users can check their work.
- Re-test at full scale — the 12–20 participants the timeline cut short, with a large mapping task that measures the scaling ceiling instead of asking about it.

NAV

- Previous: Reporting System Migration (project_report-migration.html)
- Next: Dashboard Revamp (project_dashboard-revamp.html)

IMAGE MANIFEST

The two §2 diagrams are real inline SVG in the page, not images — nothing to swap.
Image slots are empty for now (assets/img/data-mapping/ holds no files), so the page will
render broken images until real screenshots are added at the paths below. Target ~900x497;
if a real file is .png, update the src in project_data-mapping.html and the filename here to
match.

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

5. data-mapping/concept-a.jpg — Capture: the Concept A prototype — a one-time merge producing a single field, no rule kept.
   Alt: "Concept A prototype — waves merged once into a single field, with no mapping rule retained."
   Label: "Concept A · Materialized field only" · Caption: "A one-time merge. Nothing to extend when the next wave lands."

6. data-mapping/concept-b.jpg — Capture: the Concept B prototype — the mapping rule shown live next to the field it produced.
   Alt: "Concept B prototype — a saved mapping rule sitting alongside the materialized field it generates."
   Label: "Concept B · Saved rule + materialized field" · Caption: "The rule stays live, so a new wave extends the field by itself."

7. data-mapping/concept-b-values.jpg — Capture: Concept B iterated, showing the answer-value alignment layer for a choice question.
   Alt: "Concept B iterated — an answer-value alignment layer mapping mismatched scale options into one reportable value."
   Label: "Concept B, iterated · Answer-value mapping" · Caption: "Field-level mapping wasn't enough for choice questions — added after cross-functional review."

8. data-mapping/scope-recode.jpg — Capture: the scope prototype that supports full value recoding (merge and rename).
   Alt: "Scope prototype with value recoding — source answer options merged and renamed into one reportable value."
   Label: "With value recoding" · Caption: "Merge and rename mismatched options. Confirmed in scope after customer and competitor signals."

9. data-mapping/scope-strict.jpg — Capture: the scope prototype without value recoding — strict 1:1 mapping.
   Alt: "Scope prototype without value recoding — strict one-to-one mapping, each source option to exactly one output."
   Label: "Without value recoding (rejected)" · Caption: "Strict 1:1. Documented as the trade-off we chose against."

10. data-mapping/v5-2-grid.jpg — Capture: v5.2 grid, annotated or plain, showing the
    add-field affordance at the bottom and add-source at the right.
   Alt: "The v5.2 Data Mapping grid — rows are mapping rules, columns are data sources, with add-field at the bottom edge and add-source at the right edge."
   Label: "v5.2 · Data Mapping grid" · Caption: "Growth controls sit on the edges they grow from."

11. data-mapping/value-alignment-matrix.jpg — Capture: the expanded row showing the
    drag-and-drop matrix merging source values into one reportable value.
   Alt: "The value-alignment matrix — source answer options dragged and merged into a single reportable value."
   Label: "Value-alignment matrix" · Caption: "Behavior engineering can click through instead of decoding annotations."

12-15. data-mapping/pipeline-1.jpg … pipeline-4.jpg — Capture: one image per step of the
    test pipeline.
   pipeline-1 Alt: "The Data Mapping prototype running as a clickable HTML build."
   pipeline-2 Alt: "The prototype republished as a shareable URL through Figma Make."
   pipeline-3 Alt: "The published prototype embedded as a task inside an Alida survey."
   pipeline-4 Alt: "The study fielded and recorded by the research services team."
