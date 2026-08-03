# QuickClick Lite Sale Site

Static landing page for the QuickClick Lite commercial source-license sale. It
contains commercial copy, screenshots, the recorded Buyer Demo Mode video, and
a public technical buyer brief. It does not include the QuickClick application
source code, secrets, tokens, or a seller account.

## Public repository contents

The public repository contains the landing HTML, technical buyer brief, CSS,
JavaScript, sale configuration, commercial README, and public media assets
only. Local publishing instructions and publication audits remain ignored by
Git.

## Contact configuration

The published contact address is configured only in site.config.js:

    window.QUICKCLICK_SALE_CONFIG = {
      CONTACT_EMAIL: "your-sales-email@example.com",
    };

The contact link opens the buyer's mail client with a prefilled commercial
inquiry. Links can include a safe campaign reference, such as
`?ref=linkedin`, which is copied into the buyer's email to help identify the
inbound channel. Do not place credentials, product source, or private delivery
files in this static repository.
