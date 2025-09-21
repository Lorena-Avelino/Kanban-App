import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import '@mantine/core/styles.css';
import "./index.css";
import App from "./App.tsx";
import { MantineProvider } from "@mantine/core";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider
      theme={{
        fontFamily: "Inter, system-ui, sans-serif",
        defaultRadius: "md",
        components: {
          Button: { defaultProps: { size: "sm" } },
          Select: { defaultProps: { size: "sm" } },
          Modal: { defaultProps: { size: "md" } },
          TextInput: { defaultProps: { size: "sm" } },
          Textarea: { defaultProps: { size: "sm" } },
        },
      }}
    >
      <App />
    </MantineProvider>
  </StrictMode>
);
