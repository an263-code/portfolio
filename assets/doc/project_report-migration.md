PROJECT

- Title: Reporting System Migration
- Eyebrow: Research Community Platform · Survey Report · AI Chatbot
- Tagline: Researchers used to open the report, then export data to Excel. After two years of incremental migrations and upgrades, most stopped needing to leave.
- Filename for the new page: project_report-migration

METADATA

- Role: Product Designer (Individual Contributor)
- Timeline: 2024 – 2026 (2 years)
- Team: 1 Designer · 1 PM · 8–10 Engineers
- Tools: Figma, Pendo (tracking usage)
- Status: Launched

OVERVIEW

- Problem: An outdated framework capped the legacy report, so researchers hit the ceiling fast and had to finish their analysis in Excel.
- Approach: Framed the migration as a major product upgrade, leveraging user adoption signals to strategically time the legacy report's deprecation.
- Result: Researchers now complete their analysis inside the report, making Excel exports the rare exception rather than the default.

CONTEXT — Why It Matters

Researchers didn't just view reports — they used them to find the story inside thousands of responses. The legacy report stopped at "here's a chart;" anything harder (multi-level crosstabs, data cleaning, wave-over-wave trends) meant exporting to Excel and starting over. Meanwhile, the framework underneath was no longer extensible.

Migration wasn't a choice, but the scope of it was. We set out to rebuild the reporting system not just to parity, but to give researchers the analysis power they actually needed inside the product.

Supporting data (Pendo):
- 75% of users exported data within 2 minutes of opening a report — Q1 2023
- For every 100 accounts that exported a report, only 10–15 shared the in-product view — Q1–Q4 2023

NARRATIVE — How We Killed the Excel Detour (2-year feature timeline)

2024
  1. Full Crosstab Analysis, Right Inside the Report (Banners)
     - Usage: ~20% of report authors consistently use banners
     - Before: No reorder, no live preview, forced Excel export for 20–30 banners
     - After: Drag-to-reorder editor, live preview, in-product crosstab rendering

  2. Recode Data Right Inside the Report
     - Usage: [CONFIRM]
     - Process: Mapped recode use cases with PM and CS team (rating-to-number, group answers, date-to-number, number-to-SC, conditional recode)
     - Final design: Step 1 recode type picker with simplified illustrations; Step 2 rule configuration with 5 recode types

  Year-end insight: New report hit 30% adoption within 2 months, then stalled. Missing exports (CSV, PPTX, SPSS) gave researchers no reason to switch.

2025
  1. Usability Testing Reports, Built Around Data Levels
     - Usage: [CONFIRM]
     - Process: Mapped every metric to its data level (aggregate path, aggregate screen, individual respondent) before design
     - Final design: Aggregate path view (success rate, duration, heatmap) + individual respondent drill-down

  2. Reusing the Pattern: Card Sort & Tree Test
     - Usage: [CONFIRM]
     - Card sort: brand-new reporting — similarity matrix + per-participant breakdown
     - Tree test: reused usability testing path pattern with adapted visualizations

  3. An AI Assistant for the AI-Era Detour
     - Usage: ~25% of AI prompts ended in an insert, copy, or download within 3 months
     - Problem: Researchers were pasting data into external AI tools for quick analysis
     - Approach: Designed base component kit (message bubbles, prompt bar, output card) within existing system; launched from top bar due to responsive layout constraint; added in-report nudges
     - Output actions: insert into report, copy, or download

  Year-end insight: By May 2025, time spent in the new report caught up to legacy — then kept climbing. ~30 min in new report vs. ~20 min in legacy by year-end.

SIDEBAR NAVIGATION

- Intro
- Why It Matters (#context)
- How We Killed the Excel Detour (#arc)

PREV / NEXT

- Previous: Multi-Video Insights (project_video-insights.html)
- Next: Data Mapping (project_data-mapping.html)
