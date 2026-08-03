/**
 * Reads the public-sale configuration without embedding a seller address in
 * the landing-page source.
 *
 * @returns {{ CONTACT_EMAIL?: string }} The optional browser configuration.
 */
function getSaleConfig() {
  return window.QUICKCLICK_SALE_CONFIG ?? {};
}

/**
 * Returns a constrained campaign source from the public URL.
 *
 * @returns {string} A safe, optional source label for a buyer email.
 */
function getCampaignSource() {
  const source = new URLSearchParams(window.location.search).get("ref")?.trim() ?? "";
  return /^[a-z0-9][a-z0-9._-]{0,63}$/i.test(source) ? source : "";
}

/**
 * Builds the public contact copy for a specific buyer action.
 *
 * @param {string} intent The requested sales action.
 * @returns {{ subject: string, body: string }} Email-safe contact content.
 */
function getContactCopy(intent) {
  if (intent === "technical-evaluation") {
    return {
      subject: "QuickClick Lite Technical Evaluation",
      body: "Hello, I would like the QuickClick Lite technical evaluation pack, including the commercial scope and package-manifest details.",
    };
  }

  if (intent === "acquisition") {
    return {
      subject: "QuickClick Lite Full Acquisition Inquiry",
      body: "Hello, I am interested in discussing a broader QuickClick Lite project-asset acquisition and technical handoff.",
    };
  }

  return {
    subject: "QuickClick Lite Purchase Interest",
    body: "Hello, I am interested in QuickClick Lite. Please send me the technical and commercial details.",
  };
}

/**
 * Enables contact links only when the deployer supplies a valid address.
 *
 * @returns {void}
 */
function hydrateContactLinks() {
  const { CONTACT_EMAIL: configuredEmail = "" } = getSaleConfig();
  const email = configuredEmail.trim();
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const contactLinks = document.querySelectorAll("[data-contact-link]");
  const contactStatus = document.querySelector("[data-contact-status]");
  const campaignSource = getCampaignSource();

  if (!validEmail) {
    contactLinks.forEach((link) => {
      link.setAttribute("aria-disabled", "true");
      link.classList.add("is-disabled");
      link.href = "#contact";
    });
    if (contactStatus) {
      contactStatus.textContent = "Direct contact is enabled when this sale page is configured for publication.";
    }
    return;
  }

  contactLinks.forEach((link) => {
    const { subject, body } = getContactCopy(link.dataset.contactIntent ?? "");
    const sourceLine = campaignSource ? `\n\nReference: ${campaignSource}` : "";
    link.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`${body}${sourceLine}`)}`;
    link.removeAttribute("aria-disabled");
    link.classList.remove("is-disabled");
  });
  if (contactStatus) {
    contactStatus.textContent = "Request the buyer brief, package-manifest summary, validation record, and commercial scope without exposing source code or credentials.";
  }
}

/**
 * Marks screenshot cards as loaded after their image has been decoded.
 *
 * @returns {void}
 */
function hydrateGallery() {
  document.querySelectorAll(".shot img").forEach((image) => {
    const markReady = () => image.closest(".shot")?.classList.add("is-ready");
    if (image.complete) markReady();
    else image.addEventListener("load", markReady, { once: true });
  });
}

hydrateContactLinks();
hydrateGallery();
