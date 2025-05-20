(function () {
  const navItems = [
    { label: "Billing Center", contentId: "billing-center-content" },
    { label: "Service Desk", contentId: "service-desk-content" },
  ];

  const existingButton = document.querySelector("#nav-uiconfigs");
  const navList = document.querySelector("#nav-buttons");
  const titleEl = document.querySelector(".navigation-title");
  const content = document.getElementById("content");

  if (!existingButton || !navList || !titleEl || !content) return;

  navItems.forEach(({ label, contentId }) => {
    const newButton = existingButton.cloneNode(true);

    // Set text
    const textEl = newButton.querySelector(".nav-text");
    if (textEl) textEl.textContent = label;

    // Style tweaks (optional)
    const bgEl = newButton.querySelector(".nav-bg-image");
    if (bgEl) bgEl.style.backgroundPosition = "0";

    // Append to nav
    navList.appendChild(newButton);

    // Add click handler
    const link = newButton.querySelector("a");
    if (link) {
      link.addEventListener("click", (e) => {
        e.preventDefault();

        // Remove all active states
        document
          .querySelectorAll("#nav-buttons li")
          .forEach((li) => li.classList.remove("nav-link-current"));

        // Set new active state
        newButton.classList.add("nav-link-current");

        // Update title
        titleEl.textContent = label;

        // Render content container (React will hook into this div if needed)
        content.innerHTML = `<div id="${contentId}"></div>`;
      });
    }
  });
})();
