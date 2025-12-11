import ReactDOM from "react-dom/client";

import App from "./App";
import { AuthProvider } from "./store/AuthProvider";
import { DeviceProvider } from "./store/DeviceProvider";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

console.log(process.env.REACT_APP_API_URL);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <DeviceProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </DeviceProvider>
);
