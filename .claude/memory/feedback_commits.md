---
name: feedback-commits
description: Never include Co-Authored-By in git commits — user explicitly rejected it
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 560264bd-c014-49a1-bf32-48ff84bd3e88
---

Never add "Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>" or any co-authoring line to git commits.

**Why:** User rejected the first commit containing this line and explicitly said "remove coauthoring." It is unwanted attribution noise for this project.

**How to apply:** Every `git commit -m` must omit any Co-Authored-By trailer. No exceptions, even for complex multi-file changes.
