import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { useFlags, asyncWithLDProvider } from "launchdarkly-react-client-sdk";
import { browserName, deviceType, osName } from "react-device-detect";
import getUserId from "./util/getUserId";
import getAstronautId from "./util/getAstronautId";

const CLIENTKEY = "68f11ee0a3ccc209b68d60d2";

let id = getUserId();
export const astronautId = getAstronautId();

export const astronautName = "AstroBot";

(async () => {
  const LDProvider = await asyncWithLDProvider({
    clientSideID: CLIENTKEY,
    user: {
      key: id,
      //dynamically set these custom attributes using the deviceType and osName selectors from the npm package
      custom: {
        device: deviceType,
        operatingSystem: osName,
        browserName: browserName,
        astronautId: astronautId,
        astronautName: `${astronautName}${astronautId}`,
      },
    },
  });

  ReactDOM.render(
    <LDProvider>
      <App />
    </LDProvider>,
    document.getElementById("root")
  );
})();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
