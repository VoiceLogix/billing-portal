// This is the full version with both Billing Center and Service Desk
// Use index-service-desk-only.js for Service Desk only

function createNavButton(cloneFromId, newId, label, iconUrl, contentId) {
  const existing = document.querySelector(cloneFromId);
  if (!existing) throw new Error(`Template button not found: ${cloneFromId}`);

  const btn = existing.cloneNode(true);
  btn.id = newId;
  btn.querySelector(".nav-text").innerHTML = label;
  btn.classList.remove("nav-link-current");
  document.querySelector("#nav-buttons").appendChild(btn);
  btn
    .querySelector(".nav-bg-image")
    .setAttribute(
      "style",
      `background-position: 50%;background-repeat:no-repeat; background-size: 70%; background-image: url('${iconUrl}');`,
    );

  btn.querySelector("a").addEventListener("click", (e) => {
    e.preventDefault();

    const existingContent = document.getElementById(contentId);
    if (
      existingContent &&
      window.getComputedStyle(existingContent).display !== "none"
    ) {
      return false;
    }

    document.querySelectorAll("#nav-buttons li").forEach((li) => {
      li.classList.remove("nav-link-current");
    });

    btn.querySelector(".nav-text").style.color = "#404040";

    document.querySelector(".navigation-title").textContent = label;
    document.querySelector(
      "#content",
    ).innerHTML = `<div id="${contentId}"></div>`;

    return false;
  });

  return btn;
}

// Full version: Both Billing Center and Service Desk
createNavButton(
  "#nav-callhistory",
  "nav-billing",
  "Billing Center",
  "https://raw.githubusercontent.com/VoiceLogix/billing-portal/refs/heads/main/public/asset/billing-center.svg",
  "billing-center-content",
);

createNavButton(
  "#nav-callhistory",
  "nav-service-desk",
  "Service Desk",
  "https://cdn.jsdelivr.net/gh/VoiceLogix/billing-portal@main/public/asset/service-desk.svg",
  "service-desk-content",
);
