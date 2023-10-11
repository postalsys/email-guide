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

## Choosing the Right Email Sending Solution

When integrating email sending into your platform, you have a few options to consider. Each has its pros and cons, and the best choice depends on your specific needs and resources. Here's a breakdown:

1. **In-House Development:** Building everything from scratch offers maximum control over the process. However, it can be time-consuming and resource-intensive.
2. **[EmailEngine](https://emailengine.app/) Software:** A product of Postal Systems OÜ, this software manages accounts and IMAP/SMTP connections, offering a balance between control and convenience.
3. **External Services like Nylas Email API:** These are third-party solutions that can simplify the process but might come with recurring costs and less control.

Given my affiliation with Postal Systems OÜ, I'll delve deeper into the [EmailEngine](https://emailengine.app/) solution.

### Getting Started with EmailEngine

[EmailEngine](https://emailengine.app/) is a robust software designed to streamline the email sending process. It's a self-hosted solution, ensuring that you have control over your data and operations.

<div className="text--center custom-image">
    <a href="https://emailengine.app/"><img src="/img/emailengine.png" /></a>
</div>

#### Installation

[EmailEngine](https://emailengine.app/) is user-friendly and can be set up on your infrastructure. Once installed, it offers a web service interface and an HTTP API. This API facilitates seamless interaction with email accounts, be it reading incoming emails or dispatching them.

:::tip

A significant advantage is that EmailEngine handles all account-related data, including credentials. Your primary application remains oblivious to these details. To send an email, all you require is the account ID, and you can forward your API request to EmailEngine.

:::

#### Account Registration

Integrating email accounts with EmailEngine is straightforward. You have two primary methods:

1. **API Registration:** Here, you directly input the credentials using the [API](https://api.emailengine.app/#operation/postV1Account).
2. **Hosted Account Form:** This method is more user-centric. You guide your users to a dedicated account form page on your EmailEngine setup. They can then input their credentials directly into EmailEngine, ensuring transparency and trust.

For a visual representation, refer to the screenshot below:

<img src="/img/examples/hosted1.jpg" className="text--center custom-image-lg custom-image-border" />

<img src="/img/examples/hosted2.jpg" className="text--center custom-image-lg custom-image-border" />

<img src="/img/examples/hosted3.jpg" className="text--center custom-image-lg custom-image-border" />

#### Sending an Email with EmailEngine

After successfully registering an account with EmailEngine, sending emails becomes a breeze. With a straightforward API call to your EmailEngine instance, you can dispatch emails without any hassle.

Here's a step-by-step guide on how to send an email using EmailEngine:

1. **API Endpoint:** The endpoint to send an email is structured as `https://emailengine/v1/account/{account-id}/submit`. Replace `{account-id}` with the user ID of the registered account. For our example, the user ID is `example`.

2. **HTTP Method:** Use the `POST` method to send your email.

3. **Headers:**

   - **Authorization:** This header is crucial for security. It ensures that only authorized requests can send emails. Replace `<secret-token>` with your actual authorization token.
   - **Content-type:** Set this header to `application/json` to inform EmailEngine that you're sending JSON data.

4. **Payload:** This is the actual content of your email. It's structured in JSON format and contains details like the recipient's information, subject, and body of the email.

Here's a sample API call using `curl`:

```bash
$ curl -XPOST "https://emailengine/v1/account/example/submit" \
    -H "Authorization: Bearer <secret-token>" \
    -H "Content-type: application/json" \
    -d '{
      "to": [
        {
          "name": "John Doe",
          "address": "john.doe@ethereal.email"
        }
      ],
      "subject": "Hello, John!",
      "html": "<p>Hello, John!</p>"
    }'
```

In this example, we're sending an email to John Doe at `john.doe@ethereal.email` with the subject "Hello, John!" and a simple HTML body.

---

In conclusion, EmailEngine, developed by Postal Systems OÜ, offers a balanced solution for SaaS web service owners looking to integrate email sending into their platforms. It combines the control of in-house solutions with the convenience of external services, making it a compelling choice for many businesses.
