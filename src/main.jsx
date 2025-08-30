import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import { AppThemeProvider } from "./theme/index.jsx";
import "@fontsource-variable/inter";
import "pretendard/dist/web/static/pretendard.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppThemeProvider>
      <App />
    </AppThemeProvider>
  </StrictMode>
);
