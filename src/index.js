import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { useFlags, asyncWithLDProvider } from "launchdarkly-react-client-sdk";
import { browserName, deviceType, osName } from "react-device-detect";
import getUserId from "./util/getUserId";
import Observability, { LDObserve } from '@launchdarkly/observability'
import SessionReplay, { LDRecord } from '@launchdarkly/session-replay'

const CLIENTKEY = "68f11ee0a3ccc209b68d60d2";

let id = getUserId();

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
      },
    },
    options: {
      plugins: [
        new Observability({
          networkRecording: {
            enabled: true,
            recordHeadersAndBody: true
          }
        }),
        new SessionReplay({
          // Defaults to no obfuscation - see https://docs.launchdarkly.com/sdk/features/client-side-observability?site=launchDarkly#privacy for more details
          privacySetting: 'none'
        })
      ]
    }
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
