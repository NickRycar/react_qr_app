import "./App.css";
import React, { StrictMode, useState, useEffect } from "react";
import { createRoot } from 'react-dom/client';
import { LDProvider, useLDClient, useFlags } from "launchdarkly-react-client-sdk";
import QRCode from "./components/qrCode";
import HeaderLDLogo from "./components/headerLogo";
import Heart from "./components/heart";
import CustomerLogo from "./components/customerLogo";
import Astronaut from "./components/astronaut";
import AstronautName from "./components/astronautName";

function App() {
  const ldClient = useLDClient();

  useEffect(() => {
    // Tracking your memberId lets us know you are connected.
    ldClient?.track('68f11ee0a3ccc209b68d60d0');
  }, [ldClient]);

  const [headerStyle, setHeaderStyle] = useState("gray-app-header");
  const { configBackgroundColor } = useFlags();

  useEffect(() => {
    setHeaderStyle("gray-app-header");
    const updateBackGroundColor = () => {
      // Sets the className to "purple-app-header", "blue-app-header", etc.
      const headerStyle = configBackgroundColor + "-app-header";
      setHeaderStyle(headerStyle);

      return configBackgroundColor;
    };
    updateBackGroundColor();
  }, [configBackgroundColor]);

  return (
    <div className={headerStyle}>
      <div className="black-header">
        <HeaderLDLogo />
      </div>
      
      <div className={headerStyle}>
        <Heart />
        <CustomerLogo />
        <QRCode />
        <br />
        <Astronaut />
        <AstronautName />
      </div>
    </div>
  );
}

// A "context" is a data object representing users, devices, organizations, and other entities.
// You'll need this later, but you can ignore it for now.
const context = {
  kind: 'user',
  key: 'user-key-123abcde',
  email: 'biz@face.dev',
};

// The clientSideID is your SDK key.
// This value is automatically retrieved from LaunchDarkly.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LDProvider clientSideID="68f11ee0a3ccc209b68d60d1" context={context}>
      <App />
    </LDProvider>
  </StrictMode>,
);

export default App;
