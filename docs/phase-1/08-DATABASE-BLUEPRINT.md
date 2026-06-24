# Database blueprint

Identity: `profiles`, `organizations`, `organization_members`, `project_members`.

Sales: `leads`, `lead_activities`, `proposals`, `proposal_items`.

Delivery: `projects`, `project_phases`, `milestones`, `tasks`, `files`, `messages`, `approvals`.

Finance: `invoices`, `payments`.

Content: `services`, `case_studies`, `testimonials`, `blog_posts`.

System: `notifications`, `activity_logs`.

Roles: owner, admin, team member, client, client viewer.

Security: browser never receives secret key; public forms use validated server routes; client records use RLS; UI hiding is not authorization; payment status comes from verified webhooks; files use private storage.
