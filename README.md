# QuickClick Lite Sale Site

Static landing page for the QuickClick Lite source-code sale. It contains only
commercial copy, screenshots, and the recorded Buyer Demo Mode video. It does
not include the QuickClick application source code, secrets, tokens, or a
seller account.

## Public repository contents

The public repository contains the landing HTML, CSS, JavaScript, sale
configuration, commercial README, and public media assets only. Local publishing
instructions and publication audits remain ignored by Git.

## Contact configuration

The published contact address is configured only in site.config.js:

    window.QUICKCLICK_SALE_CONFIG = {
      CONTACT_EMAIL: "your-sales-email@example.com",
    };

The contact link opens the buyer's mail client with a prefilled commercial
inquiry. Do not place credentials, product source, or private delivery files in
this static repository.
