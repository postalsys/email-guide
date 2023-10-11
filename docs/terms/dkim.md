---
id: dkim
title: DKIM
hoverText: DomainKeys Identified Mail
---

DomainKeys Identified Mail (DKIM) is a public key signature system for email _domains_.

- Each _domain_ can have any number of DKIM public keys, each identified by a unique _selector_.
- [MTA](./mta) signs emails with the private key for the domain and the selector.
- DNS entry for the specific _selector_ contains the public key.
- [MX](./mx) server fetches the public key from DNS and uses it to verify the signature.
- DKIM verifies the _domain_, not the user.
