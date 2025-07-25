import "../index.js";
import { createRoot } from "react-dom/client";
import App from "./App";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const pageContent = document.getElementById("content");
if (!pageContent) throw new Error("#content not found");

const mo = new MutationObserver((mutations, observer) => {
  if (document.getElementById("billing-center-content")) {
    observer.disconnect();

    const rootEl = document.getElementById("billing-center-content");
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1000 * 30,
          // refetch if you remount *after* that 30s window
          refetchOnMount: true,
        },
      },
    });

    if (rootEl) {
      const root = createRoot(rootEl);
      root.render(
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>,
      );
    }
  }
});

// 3) start observing for child additions under #content
mo.observe(pageContent, { childList: true });
