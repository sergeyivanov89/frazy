import { createRoot } from "react-dom/client";

import RootProvider from "./providers";
import App from "./components/App";
import "./index.scss";

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <RootProvider>
    <App />
  </RootProvider>,
);
