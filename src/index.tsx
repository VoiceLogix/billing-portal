import "../index.js";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";

import BillingCenterApp from "./BillingCenterApp";
import ServiceDeskApp from "./ServiceDeskApp";
import { InfoIcon, ErrorIcon } from "./components/UI/ToastIcons";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

const pageContent = document.getElementById("content");
if (!pageContent) throw new Error("#content not found");

const rootMap: Record<string, React.FC> = {
  "billing-center-content": BillingCenterApp,
  "service-desk-content": ServiceDeskApp,
};

const mo = new MutationObserver(() => {
  Object.entries(rootMap).forEach(([contentId, Component]) => {
    const rootEl = document.getElementById(contentId);
    if (rootEl && !rootEl.hasAttribute("data-has-mounted")) {
      rootEl.setAttribute("data-has-mounted", "");

      const queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30_000,
            refetchOnMount: true,
          },
        },
      });

      const root = createRoot(rootEl);
      root.render(
        <QueryClientProvider client={queryClient}>
          <Component />
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={true}
            newestOnTop={true}
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
            icon={({ type }) => {
              if (type === "success") return <InfoIcon />;
              if (type === "error") return <ErrorIcon />;
              if (type === "info") return <InfoIcon />;
              if (type === "warning") return <ErrorIcon />;
              return <InfoIcon />;
            }}
          />
        </QueryClientProvider>,
      );
    }
  });
});

mo.observe(pageContent, { childList: true });
