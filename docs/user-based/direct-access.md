---
sidebar_position: 5
sidebar_label: "Direct account access"
---

# Direct Account Access

By obtaining direct access to your users' email accounts, you can seamlessly send emails as if the user themselves initiated it. This method involves connecting to the user's SMTP server, authenticating as the user, and dispatching the email.

## Authentication Mechanisms

Different email services offer varied authentication methods. Let's delve into the most common ones:

### 1. Regular Account Password

In cases where advanced solutions aren't available, you might need to request the email account's username and password.

:::caution

**Security Alert:** This method poses significant risks. Storing such credentials can be a liability. If unauthorized individuals breach your database, they can gain full control over the email account. Always prioritize safer alternatives.

:::

### 2. Application-Specific Password

This is akin to the regular account password but with a twist. The password grants access only to a specific function, such as SMTP, rather than the entire email account. The user can also invalidate these passwords whenever they like.

### 3. OAuth2 Authentication

Platforms like Gmail and MS365 offer OAuth2 authentication. Unlike regular passwords, the "access token" or "password" in this method expires hourly. This means you'll need to request a new token from the email provider every hour. If a user revokes your application's access, any existing tokens become invalid.

## Potential Challenges

While direct account access offers convenience, it comes with its set of challenges:

- **Security Concerns:** Storing sensitive credentials can be perilous. A data breach can severely tarnish your reputation.
- **Sending Limitations:** Regular email accounts often have sending restrictions. For instance, premium Gmail accounts have a 2500 daily email limit. Consuming this limit can inconvenience users who might want to send personal emails.

- **Hurdles with OAuth2:** Publicly available OAuth2 access requires stringent compliance. This often means undergoing security audits, maintaining extensive documentation, and incurring additional costs. Moreover, email providers can reject your application for OAuth2 access if it doesn't align with their policies.

In conclusion, while sending emails on behalf of users offers a personalized touch, it's crucial to weigh the benefits against potential pitfalls. Always prioritize user security and ensure compliance with all necessary regulations.
