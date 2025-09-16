import getSvgBase64 from './src/utils/getSvgBase64.js';

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

// Only Service Desk button
createNavButton(
  "#nav-callhistory",
  "nav-service-desk",
  "Service Desk",
  getSvgBase64("service-desk.svg"),
  "service-desk-content",
);
