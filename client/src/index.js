import * as React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import NewsContext from "./Context";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <NewsContext>
    <App />
  </NewsContext>
);
