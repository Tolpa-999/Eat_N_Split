import React from "react";
import ReactDOM from "react-dom/client"
import "./style.css"
import App from "./App";









// React v18  
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

// React before v18
// React.render(<App/>)