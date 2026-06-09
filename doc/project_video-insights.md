PROJECT

- Title: Multi-Video Insights
- Eyebrow (industry · surface · year, e.g. "Enterprise SaaS · Dashboard · 2025"): Research Community Platform · AI
- Tagline (one sentence — what & why it mattered): Turning hours of video into minutes of insight — and bringing design upstream of engineering with customer evidence.
- Filename for the new page (e.g. project-fintech.html): project_video-insights

METADATA

- Product: Research Community Platform
- Area: AI-powered Video Insights · Survey Report
- Role: Product Designer
- Timeline: January – February 2026
- Team: 1 Designer · 1 PM · 8–10 Engineers
- Tools: Figma
- Status (Shipped / In progress / On hold / Concept): Launched (new video reporting pattern released July 2026)

OVERVIEW (TL;DR)

- Problem: Researchers were drowning in unmoderated interview videos and transcripts, with no efficient way to surface patterns or opportunities for the next iteration.
- Approach: Ran feedback sessions with power users to validate the right format for AI-generated video insights, then used that evidence to redirect engineering to a user-grounded backend structure.
- Result: Avoided backend rework, launched on a structure validated by customers, and received highly positive reception during prototype walkthroughs.

NARRATIVE

Context — "Researchers are Suffering from..."
- Before AI, the bottleneck was time: ~40 unmoderated sessions land in the queue on Monday; by Friday the readout is due and there's still video left to watch.
- After AI, the bottleneck is trust: the workaround is exporting videos & transcripts, pasting into AI, prompting for themes — but not knowing if it hallucinates, and hesitating before sharing a clean-looking summary with stakeholders.
- Key tension: "Before AI, the bottleneck was time. After AI, the bottleneck is trust. Researchers need both solved at once — or the speed isn't worth it."
- Customer interviews showed researchers are ready to let AI do the heavy synthesis — what they want back is speed, scale, and a fast way to spot-check before the readout goes out. But to defend an AI-detected insight to a stakeholder, they need to trace it back to the source video. In short: speed for researchers; traceability for both researchers and their stakeholders.

Turning Point — "Changing the Starting Point" (the lead hook)
- Challenge: Engineering got out ahead of product and design, and asked us to fit the UI to their backend structure.
- How I did it: Rather than comply, I partnered with the PM on targeted customer calls focused on a narrow question — how do researchers actually consume qualitative findings? What do they skim first, drill into, and trust enough to share?
- What Dev Assumed vs. What Customers Needed: the backend-assumed structure was built for backend convenience (grouped by participant/response), not the researcher's mental model. The validated structure is: overall summary first → drill to task insight → drill to source.
- Outcome of the redirect: I brought the verified design back to the dev team, walked through the customer evidence beat by beat, and called out the correct format for the AI-generated summary so backend output matched what researchers needed to see. The backend was retargeted to the user-validated structure without delaying the launch.
- Pull quote: "With evidence, not opinions — we brought design upstream of engineering."

Process — "Designing the Pattern"
- The design problem was twofold: serve two different video question types with one coherent pattern, and embed it into the existing reporting workflow.
- Key Decision 1 — One reporting pattern for two video question types: the platform supports unmoderated usability testing (participants move through a series of tasks) and AI interviewer (a conversational AI conducting the interview from pre-defined topics). Different formats, similar underlying data shape — usability testing organizes by task, AI interviewer by topic and key question. Both need the same hierarchy: overall summary at the top, sub-summaries at the task/topic level, and a traceable path back to the source clip. Designed to the shared structure once, then layered type-specific differences on top.
- Key Decision 2 — A 3-tier drill-down, tracing back to the source: 1) Overall Summary (AI-synthesized takeaways across all videos), 2) Insight Detail (supporting evidence behind a specific AI-generated insight), 3) Recording & Transcript (the raw moment that surfaced the insight, one click away).
- Why overall summary comes first (customer quote): "The current solution (with only individual summary for each participant) is not a time-saver, and the real value is in aggregating insights across all sessions to reveal study-wide trends." — UX & Product Strategist, Global Commerce Media Company

Outcome
- Customer quote: "This is getting so good!" — Customer Insights & Market Research Lead, Leading US Regulated Energy Utility (our proposed solution mirrors his current manual workflow, where he runs unmoderated scripts through Copilot or ChatGPT for a high-level summary before drilling to the source material).
- Highly Positive — customer reception in prototype walkthroughs.
- Course-Corrected — backend retargeted to a user-validated structure, avoiding rework.
- Launched — a new video reporting pattern released in July 2026.

Reflection
- "Backend-first isn't fatal if design shows up with evidence promptly." When engineering gets out ahead, the way to redirect isn't a stronger opinion or a prettier mock — it's customer evidence delivered quickly. The walkthroughs weren't a research deliverable here; they were a redirection tool. Designers who can move at that speed earn a seat further upstream on the next project.
