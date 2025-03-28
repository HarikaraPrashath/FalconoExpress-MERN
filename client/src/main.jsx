import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { UserInformationContextProvider } from "./context/UserInforContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <UserInformationContextProvider>
        <App />
      </UserInformationContextProvider>
    </AuthContextProvider>
  </StrictMode>
);
