PROJECT

- Title: Revamped Dashboard Experience
- Eyebrow (industry · area): Research Community Platform · Dashboard
- Tagline: Replacing a data-analyst tool with a researcher-friendly dashboard.
- Filename: project_dashboard-revamp.html

METADATA

- Product: Research Community Platform
- Area: Dashboard
- Timeline: March – April 2026
- Role: Product Designer
- Team: 1 Designer · 1 PM · 8–10 Engineers
- Tools: Figma, Cursor (prototyping)

TL;DR

- Problem: A Looker-based legacy dashboard built for data analysts, used by researchers who don't think like analysts.
- Approach: A guided creation flow, researcher-friendly tile configurations, and familiar functions they've been using in survey reports.
- Result: Received positive customer reception during prototype walkthroughs. The Figma-to-Cursor workflow became a shared team resource.

HERO MEDIA

- Final dashboard with mixed tile types. (assets/img/dashboard-revamp/thumbnail-dashboard.png)

NARRATIVE

§1 — CONTEXT

Pull quote: "Dashboards are hard to use today in general. I think that's the biggest thing."
— UX Researcher, Global Creative Software Company

- User pain point: Most of our users are not SQL writers. The Looker-flavored interface forced them to learn data-analyst concepts just to configure a tile.
- Business objective: Legacy dashboards were being deprecated. The new dashboard had to run on the new reporting architecture and also support multi-source data.

Media — legacy Looker carousel:
- Legacy · Add a New Tile: Adding a new tile dropped researchers straight into Looker's data-analyst configuration interface. (looker-3_add-tile.png)
- Legacy · Edit Tile: Editing a tile required understanding analyst concepts — Dimensions, Measures. (looker-4_edit-tile.png)

§2 — PROCESS

Framing: Collaborating with PM and engineering leads, we addressed user pain points, translating frustration into the foundation of the new design.

User flow — dashboard creation (before / after comparison):
- Before: Create New → Enter a Name → Select Access Level → Select Data Sources → Empty Dashboard → Add Tile → Configure Tile → Save → More tiles? → Done (user-flow_before.png)
- After: Create New → Select Data Sources → Add Data Tiles (optional, with bulk pre-filling) → Dashboard Settings → Dashboard with selected Tiles → optional tile edits → Dashboard Ready to Share (user-flow_after.png)
- What changed:
  - Efficiency: Drastically reduces "Time to Dashboard," making the dashboard easier to set up.
  - Reduced Friction: Automated pre-filling eliminates the need for manual tile configuration, saving significant user time.
  - Flexibility: Prevents setup fatigue by allowing users to add or modify tiles at any stage with the same assistance.

Key Point 1 — Moving technical complexity behind the UI
When selecting data sources, I had to bridge the gap between a strict backend logic and the simplified experience.
- The Challenge: Backend logic required users to manually designate a "primary source" when pulling from multiple data streams. Feedback from customer interviews showed that the initial design using UI copy and a default selection didn't resolve the underlying conceptual friction.
- The Strategy: I led a cross-functional conversation with PM and engineering leads to analyze every valid use case. We discovered that "Profile Variables" were the logical primary source for all core scenarios.
- The Pivot: We identified that the only "edge case" requiring a different primary source (external-only data) fell outside our product scope. By focusing on our core audience, we decided to automate the selection.
- The Result: I eliminated a major friction point, allowing users to complete the flow without needing to understand or configure complex backend requirements.
- Media (before/after carousel):
  - Initial Design: Users had to manually pick a "primary source" — a backend concept surfaced in the UI. (decision-1_primary-source_initial.png)
  - Final Design: Profile Variables are auto-set as the primary source; the decision is to remove it from the UI. (decision-1_primary-source_final.png)
- Tooltip — Profile Variables: A data field stored against a member — demographics, behavioral data, or custom business-specific attributes. Used for targeting, segmentation, and analysis.

Key Point 2 — Streamlining tile creation
To lower the barrier for non-analysts, I redesigned the tile configuration flow to eliminate technical jargon like "dimensions" and "measures."
- Automated Setup: Users simply select a survey question or profile variable; the system then pre-fills essential parameters for the tile.
- Simplified Configuration: Replaced legacy feature bloat with a curated set of essential tools, removing friction to significantly decrease time-to-insight.
- Media (carousel):
  - New · Edit Tile: Simplified editing interface using plain language. (decision-2_edit-tile.png)
  - Legacy · Edit Tile: Editing a tile required understanding analyst concepts — Dimensions, Measures. (looker-4_edit-tile.png)

Key Point 3 — Flexible dashboard layouts
- Prototyping for Clarity: Developed a Cursor prototype for tile drag-and-resize and reordering, allowing the team to iterate rapidly and align with customers and engineers without relying on lengthy written documentation.
- Design System Integration: Translated the Figma design system into Cursor rules. This established a shared resource for the design team.
- Media (carousel):
  - Cursor Prototype: A working prototype showing the interaction. (cursor-prototype.gif)
  - Design System in Cursor: Figma design tokens translated into Cursor rules — a shared resource for the design team. (cursor_design-system.png)

§3 — DRIVING ALIGNMENT & HANDOFF

With 8–10 engineers building in parallel and a single designer holding the spec, undocumented details created a high risk of product drift. To mitigate this, I established alignment through two communication rhythms:
- Comprehensive Kickoffs: I held two 1-hour kickoff calls with the full dev team. During these sessions, I anchored every conversation in the basic end-to-end workflow first, then branched into edge cases, ensuring every engineer saw the workflow as a user would before owning a piece of it.
- Targeted Syncs: I maintained ongoing, small syncs with PM and engineer leads, scoped strictly to features currently in flight.
- Media: Figma design with annotations prepared for engineering handoff. (figma-design-for-handoff.png)

§4 — OUTCOME

- Highly Positive — Customer reception in prototype walkthroughs
- Stay Tuned... — Tracking user adoption after launch
- Workflow Optimized — Design rules for Cursor adopted by the design team

NEXT STEP — The "Show Your Value" Problem

During the interviews, researchers consistently asked for platform usage data, like surveys sent, response rates, and engagement. On the surface, a feature request. Underneath: they need to show their executives that the platform is working and the team's investment is justified.

A direction worth exploring: a lightweight "research team report" for the researcher communicating upward. Not a data view, a value narrative.

NAV

- Previous: Data Mapping (project_data-mapping.html)
- Next: Multi-Video Insights (project_video-insights.html)
