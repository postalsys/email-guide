---
id: spf
title: SPF
hoverText: Sender Policy Framework
---

Sender Policy Framework (SPF) is an **allowlist** containing IP addresses of email servers authorised to send emails on behalf of the domain.

- Used by the MX servers to verify the validity of the sender domains.
- Only a single SPF entry per domain. Can link to other SPF entries.
- Limited to 10 additional DNS lookups to resolve linked entries.
