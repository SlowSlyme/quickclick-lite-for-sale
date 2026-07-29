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

  const subject = encodeURIComponent("QuickClick Lite Purchase Interest");
  const body = encodeURIComponent("Hello, I am interested in QuickClick Lite. Please send me the technical and commercial details.");
  contactLinks.forEach((link) => {
    link.href = `mailto:${email}?subject=${subject}&body=${body}`;
    link.removeAttribute("aria-disabled");
    link.classList.remove("is-disabled");
  });
  if (contactStatus) {
    contactStatus.textContent = "Use the contact button to request the demo, package manifest, and due-diligence materials.";
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
