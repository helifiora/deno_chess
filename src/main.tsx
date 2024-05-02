/// <reference lib="dom" />
import { createRoot } from "react-dom/client";
import App from "@/ui/App.tsx";
import "@/style.css";

const root = createRoot(document.getElementById("root"));
root.render(<App />);
