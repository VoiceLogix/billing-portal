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
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0wLjc5OTk4OCAxNi4yNjY1QzAuNzk5OTg4IDcuNzI0NiA3LjcyNDc5IDAuNzk5ODA1IDE2LjI2NjcgMC43OTk4MDVIMjMuNzMzM0MzMi4yNzUyIDAuNzk5ODA1IDM5LjIgNy43MjQ2IDM5LjIgMTYuMjY2NUMzOS4yIDI0LjgwODMgMzIuMjc1MiAzMS43MzMxIDIzLjczMzMgMzEuNzMzMUgyMi45ODY3VjM5LjE5OThDMjIuOTg2NyAzOS4xOTk4IDAuNzY3OTk4IDM1LjQ2NjUgMC43OTk5ODggMTYuMjY2NVpNMjMuOTM3MSA3LjcxMzk0QzI1LjAzNTcgOC40NDM1NCAyNS44NjQ1IDkuNjI2NDcgMjUuODY0NSAxMS4yMTI2QzI1Ljg2NDUgMTIuODk1OCAyNS4xODUxIDE0LjEzMzEgMjQuMDg1MyAxNC44OTA1QzIzLjY1MTQgMTUuMTg0OCAyMy4xNzIxIDE1LjQwNiAyMi42NjY3IDE1LjU0NTRWMTcuMTc5NUMyMi42NjY3IDE3LjM4OTcgMjIuNjI1MyAxNy41OTc3IDIyLjU0NDkgMTcuNzkxOEMyMi40NjQ1IDE3Ljk4NiAyMi4zNDY2IDE4LjE2MjMgMjIuMTk4IDE4LjMxMDlDMjIuMDQ5NSAxOC40NTk1IDIxLjg3MzEgMTguNTc3MyAyMS42Nzg5IDE4LjY1NzdDMjEuNDg0OCAxOC43MzgyIDIxLjI3NjggMTguNzc5NSAyMS4wNjY3IDE4Ljc3OTVDMjAuODU2NSAxOC43Nzk1IDIwLjY0ODUgMTguNzM4MiAyMC40NTQ0IDE4LjY1NzdDMjAuMjYwMiAxOC41NzczIDIwLjA4MzkgMTguNDU5NSAxOS45MzUzIDE4LjMxMDlDMTkuNzg2NyAxOC4xNjIzIDE5LjY2ODkgMTcuOTg2IDE5LjU4ODQgMTcuNzkxOEMxOS41MDggMTcuNTk3NyAxOS40NjY3IDE3LjM4OTcgMTkuNDY2NyAxNy4xNzk1VjE0LjE5NjFDMTkuNDY2NiAxMy43OTAxIDE5LjYyMDggMTMuMzk5MyAxOS44OTgxIDEzLjEwMjhDMjAuMTc1MyAxMi44MDYzIDIwLjU1NDkgMTIuNjI2MyAyMC45NiAxMi41OTkzQzIxLjU1MDkgMTIuNTU5OCAyMS45OTg5IDEyLjQ0MjUgMjIuMjY5OSAxMi4yNTU4QzIyLjM3OTIgMTIuMTgzMyAyMi40Njc1IDEyLjA4MzIgMjIuNTI1OSAxMS45NjU3QzIyLjU4OTkgMTEuODM3NyAyMi42NjQ1IDExLjYwOTQgMjIuNjY0NSAxMS4yMTE1QzIyLjY2NDUgMTAuODc4NyAyMi41MzMzIDEwLjYyMjcgMjIuMTY1MyAxMC4zNzc0QzIxLjc0NzIgMTAuMTAwMSAyMS4wNzUyIDkuODk1MjcgMjAuMjY3NyA5Ljg2OTY3QzE5LjQ2OTkgOS44NDQwNyAxOC42OTQ0IDkuOTk5ODEgMTguMTIzNyAxMC4yNzYxQzE3LjU1MiAxMC41NTM0IDE3LjM0MjkgMTAuODY0OSAxNy4yODMyIDExLjA5NDJDMTcuMjM0OCAxMS4zMDE3IDE3LjE0NTQgMTEuNDk3NSAxNy4wMjAzIDExLjY3MDFDMTYuODk1MiAxMS44NDI2IDE2LjczNjkgMTEuOTg4NCAxNi41NTQ3IDEyLjA5ODlDMTYuMzcyNSAxMi4yMDk0IDE2LjE3IDEyLjI4MjQgMTUuOTU5MiAxMi4zMTM2QzE1Ljc0ODQgMTIuMzQ0OCAxNS41MzM0IDEyLjMzMzYgMTUuMzI3IDEyLjI4MDZDMTUuMTIwNiAxMi4yMjc1IDE0LjkyNjkgMTIuMTMzOCAxNC43NTcyIDEyLjAwNDlDMTQuNTg3NSAxMS44NzYgMTQuNDQ1MiAxMS43MTQ1IDE0LjMzODggMTEuNTI5OUMxNC4yMzI0IDExLjM0NTIgMTQuMTYzOSAxMS4xNDEyIDE0LjEzNzQgMTAuOTI5N0MxNC4xMTA5IDEwLjcxODMgMTQuMTI2OSAxMC41MDM3IDE0LjE4NDUgMTAuMjk4NUMxNC41NTE1IDguODY4MDcgMTUuNjIyNCA3LjkzMzY3IDE2LjcyODUgNy4zOTcxNEMxNy44Mzc5IDYuODU4NDcgMTkuMTQyNCA2LjYzMTI3IDIwLjM3MDEgNi42NzA3NEMyMS41ODgzIDYuNzA5MTQgMjIuODg5NiA3LjAxNjM0IDIzLjkzNzEgNy43MTM5NFpNMjEuMDY2NyAyNS4zMzMxQzIxLjYzMjUgMjUuMzMzMSAyMi4xNzUxIDI1LjEwODQgMjIuNTc1MSAyNC43MDgzQzIyLjk3NTIgMjQuMzA4MiAyMy4yIDIzLjc2NTYgMjMuMiAyMy4xOTk4QzIzLjIgMjIuNjM0IDIyLjk3NTIgMjIuMDkxNCAyMi41NzUxIDIxLjY5MTNDMjIuMTc1MSAyMS4yOTEyIDIxLjYzMjUgMjEuMDY2NSAyMS4wNjY3IDIxLjA2NjVDMjAuNTAwOSAyMS4wNjY1IDE5Ljk1ODIgMjEuMjkxMiAxOS41NTgyIDIxLjY5MTNDMTkuMTU4MSAyMi4wOTE0IDE4LjkzMzMgMjIuNjM0IDE4LjkzMzMgMjMuMTk5OEMxOC45MzMzIDIzLjc2NTYgMTkuMTU4MSAyNC4zMDgyIDE5LjU1ODIgMjQuNzA4M0MxOS45NTgyIDI1LjEwODQgMjAuNTAwOSAyNS4zMzMxIDIxLjA2NjcgMjUuMzMzMVoiIGZpbGw9InJlZCIvPgo8L3N2Zz4=",
  "service-desk-content",
);
