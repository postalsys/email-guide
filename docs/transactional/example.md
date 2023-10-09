---
sidebar_position: 2
---

# Example Transaction Flow

The following example illustrates the sequence of events when a user signs up for a service. After entering their details and clicking "Sign Up," the service saves this information in a database. Once stored, a welcome email is dispatched to the user. When the user clicks on this email to verify or activate their account, they receive a final account activation notification. Notably, since this email is directly linked to the user's action of signing up, it's termed a "transactional email."

```mermaid
sequenceDiagram
    participant User
    participant SaaS
    participant Database
    participant EmailService

    User->>SaaS: Visit Signup Page
    User->>SaaS: Enter Details & Click "Sign Up"
    SaaS->>Database: Store User Details
    Database-->>SaaS: Confirm Details Stored
    SaaS->>EmailService: Trigger Welcome Email
    EmailService-->>User: Send Welcome Email
    User->>SaaS: Click on Email to Verify/Activate
    SaaS->>Database: Update Account Status
    Database-->>SaaS: Confirm Account Activated
    SaaS-->>User: Account Activated Notification
```
