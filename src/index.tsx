import { createRoot } from "react-dom/client";
import App from "./app";

const container = document.getElementById("content");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
} else {
  console.warn("#content not found");
}
