---
sidebar_position: 3
sidebar_label: '"Via Provider"'
---

# "Via Provider" Email Sending Approach

In this simple approach, your SaaS platform sends emails on behalf of the user, similar to how transactional emails are dispatched. The distinguishing feature is that the user's name appears as the sender name in the email header, while the actual email address remains that of the service.

**Example Header:**

```
From: [User's Name] (via Your SaaS Service) <customer-emails@example.com>
```

## Key Points:

- **Sender Identity:** The user's name is prominently displayed, but the actual sending email address belongs to the SaaS service.
- **Perception:** To some recipients, this method might appear less authentic, potentially giving an impression of being automated or bot-generated.
- **Ease of Setup:** One of the significant advantages is the simplicity. There's no complex setup required; you can begin sending emails immediately.

## Example

The following screenshot includes an email from Poedit that is sent via Paddle.

<img src="/img/examples/paddle.png" className="text--center custom-image-lg custom-image-border" />
