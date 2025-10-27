import "./App.css";
import React, { useState, useEffect } from "react";
import { useLDClient, useFlags } from "launchdarkly-react-client-sdk";
import QRCode from "./components/qrCode";
import CustomerLogo from "./components/customerLogo";
import Astronaut from "./components/astronaut";

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
      
      <div className={headerStyle}>
        <CustomerLogo />
        <QRCode />
        <br />
        <Astronaut />
        <div>
          <br />
          <span style={{ color: 'black' }}><center><h2>My Name is AstroBot!</h2></center></span>
          <br />
        </div>
      </div>
    </div>
  );
}

export default App;
