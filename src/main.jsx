import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css";

// Find root element in index.html
const rootElement = document.getElementById("root");

// Create root
const root = ReactDOM.createRoot(rootElement);

// Render App component
root.render(<App />);