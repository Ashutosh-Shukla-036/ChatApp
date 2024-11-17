import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot
import App from "./App";
import "./index.css";
import { RecoilRoot } from "recoil";

const container = document.getElementById("root");

const root = createRoot(container);
root.render(
    <RecoilRoot>
        <App />
    </RecoilRoot>
);
