import "../index.js";
import { createRoot } from "react-dom/client";
import App from "./App";
// 1) grab the container that will eventually get the billing div
const pageContent = document.getElementById("content");
if (!pageContent) throw new Error("#content not found");

// 2) create the observer
const mo = new MutationObserver((mutations, observer) => {
  // for each mutation, check if our billing div is now present
  if (document.getElementById("billing-center-content")) {
    // stop observing
    observer.disconnect();

    const rootEl = document.getElementById("billing-center-content");
    if (rootEl) {
      const root = createRoot(rootEl);
      root.render(<App />);
    }
  }
});

// 3) start observing for child additions under #content
mo.observe(pageContent, { childList: true });
