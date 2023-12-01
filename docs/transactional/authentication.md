---
sidebar_position: 5
sidebar_label: Email Authentication
---

import EnvelopeSvg from '/img/envelope.svg';

# Email Authentication

To ensure emails from your platform are delivered to the recipient's inbox and not classified as junk or rejected, it's essential to authenticate them correctly.

:::note

Email authentication doesn't refer to using passwords or credentials to send an email. It's about establishing and defining email sending policies for your domain and ensuring your emails carry a valid signature. These policies are set using DNS. When a recipient's server receives an email from your domain, it checks these policies from your DNS name servers to verify the email's legitimacy.

:::

:::caution

Regardless of whether you're using SMTP or HTTP API to dispatch emails to your email service provider, it's imperative to have the correct email authentication in place. This authentication isn't primarily about the traffic between the client (your application or system) and the MTA (Mail Transfer Agent, which is the email service provider's SMTP server). Instead, the critical authentication check occurs between the MTA and the MX (Mail Exchange server, which is responsible for receiving emails).

:::

## Sender Policy Framework (SPF)

[SPF](../terms/spf) is a protocol that specifies which IP addresses are permitted to send emails for your domain.

It's implemented using a DNS TXT record, identifiable by the `v=spf1` prefix.

For instance, the SPF policy for the domain [emailengine.app](https://emailengine.app) is:

```bash
$ dig +short txt emailengine.app
"v=spf1 mx a include:_spf.google.com include:servers.mcsv.net ~all"
```

This indicates:

- The domain [emailengine.app](https://emailengine.app) has an SPF record (`v=spf1`).
- The policy permits emails:
  - From the domain's MX server (`mx`).
  - From the domain's own IP address (`a`).
  - From Gmail's SMTP servers (`include:_spf.google.com`).
  - From Mailchimp's SMTP servers (`include:servers.mcsv.net`).
- Emails from IPs not listed in the SPF record are marked as a soft fail (`~all`). Other options include hard fail (`-all`) and neutral (`?all`).

### Additional SPF considerations:

- When using email service providers, SPF might not be directly applicable. This is because SPF checks the SMTP envelope, not the "From:" address in the email. Many ESPs send emails from their domains using VERP addresses to track bounces.
- SPF works in conjunction with [DKIM](../terms/dkim). If an email fails SPF validation, it can still be accepted if it has a valid DKIM signature.
- Email forwarding can cause SPF checks to fail, so many mail hosts treat even strict SPF failures leniently. This makes SPF more valuable as a positive indicator than a negative one.
- In any case, follow the advice of your ESP regarding setting up SPF

:::info

When an email is sent, it carries two sets of addressing information: the envelope and the header.

1. **Envelope:** This is like the physical envelope you'd use to send a traditional letter. It contains the essential routing information, determining where the email originates from and where it's headed. In the event the email fails to be delivered, any bounce-back notifications are directed to the address mentioned in the envelope, not the header.

2. **Header:** This is what the recipient sees when they open the email. It displays the sender's and recipient's email addresses. However, it's essential to note that even if the header shows `<sender@example.com>` as the sender, any undeliverable email notifications (or bounces) will be sent to the address in the envelope, not the header.

<div className="text--center custom-image-lg">
    <EnvelopeSvg/>
</div>

**Why is this distinction important for SaaS web service owners?**

Email service providers often employ a unique strategy to track email bounces effectively. They set a random identifier linked with the email as the user part of the email address, using their domain (the so-called VERP-address). This means if an email bounces, the provider can use this unique identifier to pinpoint which specific email wasn't delivered. This system ensures efficient tracking and better email deliverability insights for businesses integrating email sending into their platforms.

This is why SPF might not be very relevant for SaaS services – SPF is checked against the sender's address on the envelope, and it is not theirs.

:::

## DomainKeys Identified Mail (DKIM)

[DKIM](../terms/dkim) is a protocol that enables email recipients to verify the authenticity of email signatures.

When an email server is set up with DKIM and it sends an email:

1. The server generates a signature using DKIM-specific algorithms for the email.
2. This signature is then added to the email header before the email is sent.
3. Upon receiving the email, the recipient checks for the presence of this signature.
4. The signature is then validated using the public key retrieved from the sending domain's DNS server.
5. The recipient verifies if the domain in the signature is aligned with the "From" address in the email header.

By following this process, DKIM ensures that the email has not been tampered with during transit and confirms the legitimacy of the sender.

### DKIM Selectors:

Unlike SPF, there isn't a one-size-fits-all DKIM policy for a domain. Instead, multiple policy keys can be created for a domain, each identified by its unique "selector". This selector acts as a specially crafted subdomain of the main domain, aiding in the identification and retrieval of the correct DKIM key.

For instance, to retrieve the DKIM key for the domain `emailengine.app` with the selector "google", the following command can be used:

```bash
$ dig +short txt google._domainkey.emailengine.app
"v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAO...
```

This command fetches the DKIM key associated with the "google" selector for the domain `emailengine.app`.

### Understanding DKIM DNS Results

When you retrieve a DKIM key from the DNS, the result provides specific properties that give insights into the key's configuration and format. Using the example for the domain `emailengine.app` with the selector "google" above, the result can be broken down into the following properties:

1. **Version (`v=DKIM1`)**: This indicates that the record is a DKIM key. The "DKIM1" prefix specifies the version of the DKIM standard being used.

2. **Key Type (`k=rsa`)**: This denotes the algorithm used for the key. In this case, the key is in RSA format. Another potential format is `ed25519`, but it's less common because Elliptic Curve (EC) keys aren't widely supported in the current email infrastructure.

3. **Public Key (`p=...`)**: The string following the `p=` is the public key, encoded in base64 format. This key is used by the recipient's server to validate the DKIM signature in the email header, ensuring the email's authenticity and integrity.

### Additional DKIM Considerations:

- An email may contain multiple DKIM signatures, and not all of them might be related to the domain in the "From" header. This is because email servers often append their technical signatures to emails.
- These additional signatures allow email servers to verify if an email originated from their infrastructure. By validating their signature in the email headers, they can confirm the email's source.
- Some third-party services offer analytics and insights on emails based on these signatures. They provide valuable data to the signature owners about the processed emails, helping them monitor and optimize their email delivery.

## Domain-based Message Authentication, Reporting and Conformance (DMARC)

[DMARC](../terms/dmarc) is a protocol that builds upon SPF and DKIM to provide a clear set of instructions for email receivers on how to handle emails that don't pass authentication checks. It specifically focuses on the domain name in the "From" header of the email.

The core component of a DMARC policy is the `p` tag, which defines the action to be taken when an email fails both SPF and DKIM checks:

1. **Reject (`p=reject`)**: If this policy is set, emails that fail the checks are not delivered to the recipient. They are outright rejected.

2. **Quarantine (`p=quarantine`)**: With this policy, emails that don't pass the checks are not immediately rejected but are typically directed to the spam or junk folder.

3. **None (`p=none`)**: This is a monitoring mode. While information about the email's DMARC compliance is recorded, no specific action is taken based on the DMARC check. It allows domain owners to gather data on their email delivery without affecting the delivery of non-compliant emails.

By implementing DMARC, domain owners can protect their domain from unauthorized use, reduce the risk of phishing attacks, and improve the deliverability of legitimate emails.

### Interpreting DMARC DNS Results

When you retrieve a DMARC record from the DNS, it provides specific properties that detail the domain's DMARC configuration. Using the example for the domain `emailengine.app`:

```bash
$ dig +short txt _dmarc.emailengine.app
"v=DMARC1; p=none; pct=100; rua=mailto:re+s6qz7txzgeq@dmarc.postmarkapp.com; sp=none; aspf=r;"
```

The result can be interpreted as follows:

1. **Version (`v=DMARC1`)**: This indicates that the record is a DMARC policy. The "DMARC1" prefix specifies the version of the DMARC standard being used.

2. **Policy (`p=none`)**: This denotes the action to be taken when an email fails both SPF and DKIM checks for the `emailengine.app` domain. In this case, the policy is "none", meaning emails will be monitored for DMARC compliance but won't be blocked even if they fail the checks.

3. **Percentage (`pct=100`)**: This specifies the proportion of emails that should be subjected to DMARC checks. Here, it's set to 100%, meaning all emails from the domain should undergo DMARC verification.

4. **Reporting URI (`rua=mailto:re+s6qz7txzgeq@dmarc.postmarkapp.com`)**: This indicates where aggregate reports about DMARC authentication results should be sent. In this example, reports are to be emailed to the provided address.
