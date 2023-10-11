---
sidebar_position: 4
sidebar_label: "3rd-Party DNS Setup"
---

# "3rd-Party DNS Setup" Email Sending Approach

This approach allows your SaaS service to send emails using the user's domain name, enhancing authenticity.

## How It Works:

1. **Configuration Sharing:** Your SaaS service provides users with specific DNS configuration values, including [SPF](../terms/spf) and [DKIM](../terms/dkim) settings.
2. **User Action:** Users then update their domain's DNS settings with these provided values.
3. **Email Dispatch:** With the updated DNS settings, your SaaS platform can send emails using the user's domain name in the sender address.

## Pros:

- **Authenticity:** Emails appear genuine to recipients and successfully pass SPF/DKIM validation checks.
- **Simplified Infrastructure:** The setup isn't overly complicated. You can utilize a shared email sending infrastructure, merely adjusting the sender name for each email. There's no need for intricate software or individualized services for each user.
- **Vendor Flexibility:** This approach often aligns with existing email sending vendors used for transactional emails.

## Cons:

- **DNS Complexity:** Updating DNS settings can be perplexing, especially for those unfamiliar with the process.
- **Admin Restrictions:** Only individuals with domain admin rights can modify the necessary records.
- **Knowledge Gap:** Smaller companies might not be aware of their DNS provider or how to adjust the settings.
- **Lack of Standardization:** DNS setup forms vary across providers. For instance, Cloudflare and AWS Route53 have different expectations for TXT records, making tutorial creation challenging.

## Required DNS Fields for Email Configuration

When integrating email sending into your SaaS platform, it's essential to understand the different DNS configurations available and their implications. Here's a breakdown of the two primary DNS fields associated with email sending: SPF and DKIM.

### SPF (Sender Policy Framework)

While SPF is a standard protocol used to prevent email spoofing, it might be advisable to skip its configuration for the following reasons:

- **Complexity:** SPF setup can be intricate. Unlike DKIM, where you typically add a new record, SPF requires modifying an existing record. This can be challenging, especially for those unfamiliar with DNS configurations.
- **Potential for Errors:** Small mistakes, such as adding multiple whitespaces or misplacing identifiers, can lead to SPF setup errors. For an average small business owner, incorrect SPF configurations can often result in email delivery issues.
- **Limited Value with VERP:** When using [VERP](../terms/verp)-based sending, the value of SPF diminishes. This is because VERP addresses use a different sending domain.

### DKIM (DomainKeys Identified Mail)

DKIM is a vital protocol that allows recipients to verify that an email was sent and authorized by the owner of the sending domain. Here's how to set it up:

1. **Setup DKIM Key:** Begin by setting up a DKIM key within your email infrastructure. This will be a TXT record. While traditionally, the `_domainkey` subdomain is used, you can choose any subdomain. In our example, we'll use `customers-dkim.example.com` for the shared public key.

   ```
   $ dig txt dkim.outfunnel.com
   ;; ANSWER SECTION:
   customers-dkim.example.com.	217	IN	TXT	"v=DKIM1; k=rsa; p=MIIBIjANBgkqhki..."
   ```

2. **CNAME Record for DKIM Selector:** Instruct your users to set up a CNAME record for the DKIM selector. The selector should be consistent and unlikely to change in the future. In our example, we use `my-saas` as the selector. So, for a domain like `customer.com`, the CNAME would be `my-saas._domainkey.customer.com`, pointing to your shared DKIM record `customers-dkim.example.com`.

   When you query the DKIM key for the customer's domain using your selector, you should retrieve your public DKIM key.

   ```
   $ dig txt my-saas._domainkey.customer.com
   ;; ANSWER SECTION:
   my-saas._domainkey.customer.com. 300 IN	CNAME	customers-dkim.example.com.
   customers-dkim.example.com.	217	IN	TXT	"v=DKIM1; k=rsa; p=MIIBIjANBgkqhki..."
   ```

When sending out emails on behalf of the customer, sign the emails with DKIM using the customer's domain name and the configured selector `my-saas`.

## Examples

The following screenshots illustrate the process of configuring a provider's DNS settings from the user's perspective. If you're integrating email sending into your SaaS platform, guiding your users through a similar setup will be essential for smooth email operations.

### Mailchimp

Configuring DNS settings with Mailchimp is a straightforward process. As illustrated in the following screenshots, Mailchimp requires users to set a few CNAME records. Once configured, these CNAME records automatically resolve into the necessary DKIM records.

<img src="/img/examples/mailchimp.png" className="text--center custom-image-lg custom-image-border" />

### SendGrid

Configuring DNS settings with SendGrid involves a few more steps compared to Mailchimp. SendGrid not only requires the setup of DKIM CNAME records but also an additional CNAME record. This specific CNAME is utilized by SendGrid as the sending domain for VERP addresses. Once set up, this CNAME record resolves into an A record, an MX record, and an SPF record.

<img src="/img/examples/sendgrid.png" className="text--center custom-image-lg custom-image-border" />

### Stripe

At first glance, Stripe's DNS configuration process might seem more intricate compared to simpler setups like Mailchimp or SendGrid. However, upon closer inspection, the complexity can be broken down into understandable components:

1. **Domain Verification:** One of the standout features in Stripe's setup is the domain verification field. This is a security measure to ensure that the domain being configured is genuinely owned by the user, preventing potential malicious activities.

2. **Multiple DKIM CNAME Entries:** Stripe diverges from the norm by requiring not just 2 but 6 DKIM CNAME entries. The exact reason for this increased number isn't explicitly detailed by Stripe. It might be related to enhanced security, redundancy, or specific technical intricacies of their email infrastructure.

3. **Bounce Handler Entry:** Similar to SendGrid, Stripe also has a configuration for handling bounced emails. This ensures that the sender is notified of any undelivered emails, allowing for better email management.

<img src="/img/examples/stripe1.png" className="text--center custom-image-lg custom-image-border" />

<img src="/img/examples/stripe2.png" className="text--center custom-image-lg custom-image-border" />

### Mailgun

Mailgun's approach to DNS configuration stands out from other providers due to its unique method of setting DNS records. Instead of configuring records for the main domain (e.g., `*.example.com`), Mailgun directs users to set up records for a subdomain (e.g., `*.out.example.com`).

**Key Points:**

1. **Subdomain Configuration:** By focusing on a subdomain, Mailgun allows for a separation between the main domain's email activities and the emails sent through their platform. This can be beneficial for organizations that want to keep transactional or marketing emails distinct from their primary email communications.

2. **Potential Pitfalls:** While this approach is technically sound, it comes with its set of challenges. There's a risk of misconfiguration, especially if users inadvertently set up records that are either invalid or conflict with the main domain's settings. Such mistakes can lead to email delivery issues or other unforeseen complications.

3. **Flexibility for Providers:** For those well-versed in DNS configurations, Mailgun's method offers a high degree of flexibility. By operating on a subdomain, Mailgun can implement specific features or changes without affecting the main domain's email operations.

<img src="/img/examples/mailgun1.png" className="text--center custom-image-lg custom-image-border" />

<img src="/img/examples/mailgun2.png" className="text--center custom-image-lg custom-image-border" />
