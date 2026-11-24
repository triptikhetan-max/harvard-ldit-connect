# LDIT Connect: HarvardKey and alumni-data integration request

Prepared November 24, 2026. Draft only; not submitted.

LDIT Connect is a T522 student networking project. Tripti requires shared alumni results inside the app, accessible only through HarvardKey. Email-only, ChatGPT login, public data, and browser-local snapshots do not meet this requirement.

Application: https://ldit-connect-tripti.trilogy-1207.chatgpt.site
Source: https://github.com/triptikhetan-max/harvard-ldit-connect (private)

## Request for the HGSE sponsor, IAM, and AA&D

Could HGSE sponsor LDIT Connect for HarvardKey integration and identify the unit that can assume technical ownership after the student team leaves? We need eligible visitors to authenticate through HarvardKey and receive authorization to search a shared, restricted alumni dataset inside the app.

Please confirm the supported registration protocol (OIDC or SAML), permitted visitor population, and attributes/authorization groups that may be released. We also need AA&D to confirm permitted use, display, retention, and an approved source for alumni profile data. App sign-in and permission to reuse directory records are separate requirements.

We have not registered the app, submitted a request, obtained an application identity credential, or deployed a shared alumni database. The public app currently has fictional demo data and an optional browser-local saved-list import. Real captured records are kept outside Git and public deployment artifacts.

Data collection now covers all 822 unique directory matches for Graduate School of Education, degree year 2025, across all professions, excluding deceased records. All 17 result pages were collected and reconciled. Of these result cards, 34 expose a professional headline; unavailable fields remain blank. This is a directory-search snapshot, not a verified LDIT-only dataset or a complete current-employment dataset. The local JSON is 0600 and has not been placed in the shared service.

## Implementation after the registration is supplied

- Authenticate through the registered HarvardKey flow and verify the server-side response, issuer/audience, callback state, and eligible-user authorization.
- Store approved minimal records in a server-side database; protect every search/profile endpoint, including direct requests.
- Keep records out of static files, public pages, client bundles, source history, and caches accessible to anonymous users.
- Verify a signed-out request receives no records, an eligible HarvardKey session can search from another browser/device, and logout removes access.

## Information still required

- Sponsoring Harvard employee and administrative unit/academic department.
- Harvard IAM registration and configuration supplied through its supported process.
- AA&D-approved data access/display scope and hosting requirements.

## Official sources

- HarvardKey application integration: https://www.iam.harvard.edu/get-started/app-integration
- Protocols: https://www.iam.harvard.edu/selecting-harvardkey-authentication-protocol
- Restricted alumni-system API overview: https://portal.apis.huit.harvard.edu/docs/ats-caads-ace-drupal/1/overview
- Alumni directory terms: https://alumni.harvard.edu/terms

The restricted API overview directs prospective integration questions to AA&D Systems or apihelp@harvard.edu; it does not confirm that the student app has an available alumni-search API. No message has been sent.
