---
id: mx
title: MX
hoverText: Mail Exchange
---

Mail Exchange (MX) is the "incoming" email server that accepts emails on behalf of a specific domain name using the SMTP protocol.

The MX server for a domain is resolved using DNS, and the MX server always runs on port 25.

- `gmail-smtp-in.l.google.com` for `gmail.com`
- `example-slug.mail.protection.outlook.com` for `example.com` using MS365
- `inbound-smtp.eu-west-1.amazonaws.com` for AWS Workmail
- etc

```mermaid
sequenceDiagram
    participant User as User
    participant MTA as MTA Server
    participant DNS as DNS Server
    participant MX as MX Server (example.com)

    User->>MTA: Sends email to someone@example.com
    MTA->>DNS: Requests MX record for example.com
    DNS-->>MTA: Returns MX record for example.com
    MTA->>MX: Connects to MX server using the provided record
    MX-->>MTA: Acknowledges connection
    MTA->>MX: Delivers email to someone@example.com
    MX-->>MTA: Confirms email receipt
```
