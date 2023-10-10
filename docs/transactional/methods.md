---
sidebar_position: 4
sidebar_label: Sending Methods
---

# Choosing the Right Method

When integrating email sending into your SaaS platform, it's crucial to select the right method that aligns with your needs. Broadly, there are two primary methods to consider, each with its own advantages.

## SMTP-Based Providers

[SMTP](../terms/smtp) is a universal method where your application acts as an SMTP client. It connects to the provider's SMTP server, authenticates using credentials, and dispatches the email. Once sent, the SMTP server queues the message and attempts delivery to the recipient.

**Advantages of SMTP:**

- **Universality:** SMTP's universal nature means you can write your code once. If you ever decide to switch email service providers, a simple configuration change is all that's needed—no code alterations required.
- **Extensive Client Support:** Given its longstanding presence, SMTP is supported across all programming languages, with a plethora of libraries available for seamless integration.

## HTTP API-Based Providers

HTTP API-based methods are offered exclusively by specialized email services. Unlike SMTP, the API for each provider is unique, meaning it's not standardized.

**Advantages of API-Based Providers:**

- **Flexibility with Ports:** SMTP usually requires access to specific TCP ports like 587 or even 25, which can sometimes be blocked. In contrast, APIs operate over standard HTTPS, making them accessible even from browser JavaScript—a feature not available with SMTP.

- **Ease of Custom Integration:** While not every programming language might have dedicated libraries for a specific provider's API, the standard nature of HTTPS means you can effortlessly craft a client library yourself.

- **Simplified Email Formatting:** SMTP mandates emails to adhere to RFC822 formatting. On the other hand, HTTPS API anticipates emails to be structured as a JSON object. This format is not only simpler to comprehend but also easier to draft.

## Leveraging Email Sending Libraries

There are numerous email sending libraries available that can adeptly manage both SMTP and provider-specific APIs. A notable example is **[Nodemailer](https://nodemailer.com/)**. With such libraries, you can maintain the same codebase and simply adjust provider-specific settings via configuration. However, it's essential to note that these libraries might not support all provider's APIs.

---

In conclusion, your choice between SMTP and HTTP API-based methods should be influenced by your platform's specific requirements and the benefits each method offers. Both methods have their merits, so evaluate them in the context of your platform's needs to make an informed decision.
