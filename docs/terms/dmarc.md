---
id: dmarc
title: DMARC
hoverText: Domain-based Message Authentication, Reporting & Conformance
---

Domain-based Message Authentication, Reporting & Conformance (DMARC) is a policy for emails where both the [SPF](./spf) and the [DKIM](./dkim) checks failed.

- If the SPF policy for the sender domain is set and matches the IP address of the sending email server, DMARC does nothing.
- If the email has a valid DKIM signature for the sender's domain, DMARC does nothing.
- If both checks against the sender's domain name fail, then DMARC policy is applied. If the policy is "reject", the [MX](./mx) server rejects the email without further processing.
