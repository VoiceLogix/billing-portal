// This is the full version with both Billing Center and Service Desk
// Use index-service-desk-only.js for Service Desk only

async function getSvgUrl(filename) {
  const cdns = [
    `https://cdn.jsdelivr.net/gh/VoiceLogix/billing-portal@main/public/asset/${filename}`,
    `https://cdn.statically.io/gh/VoiceLogix/billing-portal/main/public/asset/${filename}`,
    `https://raw.githack.com/VoiceLogix/billing-portal/main/public/asset/${filename}`
  ];
  
  // Try each CDN until one works
  for (const url of cdns) {
    try {
      console.log(`Testing CDN: ${url}`);
      const response = await fetch(url, { 
        method: 'GET',
        mode: 'cors',
        referrerPolicy: 'no-referrer'
      });
      
      if (response.ok) {
        const content = await response.text();
        if (content && content.includes('<svg')) {
          console.log(`✅ Success with: ${url}`);
          return url;
        } else {
          console.warn(`❌ Invalid SVG content from: ${url}`);
        }
      } else {
        console.warn(`❌ HTTP ${response.status} from: ${url}`);
      }
    } catch (error) {
      console.warn(`❌ Error from ${url}:`, error.message);
    }
  }
  
  // If all fail, return the first one as fallback
  console.error(`All CDNs failed for ${filename}, using first URL as fallback`);
  return cdns[0];
}

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
(async () => {
  // Create Billing Center button
  createNavButton(
    "#nav-callhistory",
    "nav-billing",
    "Billing Center",
    await getSvgUrl('billing-center.svg'),
    "billing-center-content",
  );
  
  // Create Service Desk button
  createNavButton(
    "#nav-callhistory",
    "nav-service-desk",
    "Service Desk",
    await getSvgUrl('service-desk.svg'),
    "service-desk-content",
  );
})();
