import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Theme } from "@radix-ui/themes";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Theme accentColor="orange" appearance="light">
      <App /> 
    </Theme>
  </StrictMode>
);
