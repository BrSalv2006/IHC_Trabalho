import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import './index.css';
import App from "./App";
import { ClerkProvider } from "@clerk/clerk-react";
import SplashScreen from "./screens/SplashScreen";
import SmartphoneFrame from "./components/SmartphoneFrame";

const PUBLISHABLE_KEY = "pk_test_c3Rhci1mbGFtaW5nby0zMy5jbGVyay5hY2NvdW50cy5kZXYk";

function Root() {
  const [loading, setLoading] = useState(() => !sessionStorage.getItem("hasSeenSplash"));

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem("hasSeenSplash", "true");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  if (loading) {
    return <SmartphoneFrame><SplashScreen /></SmartphoneFrame>;
  }

  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <App />
    </ClerkProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Root />);