---
id: smtp
title: SMTP
hoverText: Simple Mail Transfer Protocol
---

Simple Mail Transfer Protocol (SMTP) is an Internet standard communication protocol for electronic mail transmission.

SMTP is a text-based protocol where clients — be it desktop email clients like Outlook or Thunderbird, or another SMTP server — exchange commands and responses with the target server. When sending an email, the client introduces itself, specifies the sender and recipient, and shares the email content, with the server confirming each step.

```mermaid
sequenceDiagram
    participant Client
    participant Server

    Client->>Server: EHLO mta.sender.com
    Server->>Client: 250 Hello mta.sender.com

    Client->>Server: MAIL FROM:<user@sender.com>
    Server->>Client: 250 OK

    Client->>Server: RCPT TO:<user@recipient.com>
    Server->>Client: 250 OK

    Client->>Server: DATA
    Server->>Client: 354 Start mail input. End with <CRLF>.<CRLF>

    Client->>Server: Subject: Test Email<CRLF><CRLF>Body of the email.<CRLF>.<CRLF>
    Server->>Client: 250 Message accepted for delivery

    Client->>Server: QUIT
    Server->>Client: 221 Goodbye
```
