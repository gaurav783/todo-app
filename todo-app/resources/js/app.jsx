import "./bootstrap";
import React from "react";
import { createRoot } from "react-dom/client";
import TaskComponent from "./components/TaskComponent";
const container = document.getElementById("app");
if (container) {
   const root = createRoot(container);
   root.render(<TaskComponent />);
}
