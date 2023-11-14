import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
// import Login from "./components/Login.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    {/* <Routes>
      <Route path="/*" element={<App />} />
    </Routes> */}
    <App />
  </BrowserRouter>
);
