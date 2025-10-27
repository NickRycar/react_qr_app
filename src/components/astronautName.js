import { withLDConsumer } from "launchdarkly-react-client-sdk";
import { astronautId } from "../index";

const astronautName = ({ flags, ldClient}) => {

  return flags.releaseAstronautName ? (
  <div>
    <br />
    <span style={{ color: 'black' }}><center><h2>My Name is AstroBot{astronautId}!</h2></center></span>
    <br />
  </div>
  ) : (
  <div>
      <br />
    <span style={{ color: 'black' }}><center><h2>My Name is AstroBot!</h2></center></span>
    <br />
  </div>
  );
};

export default withLDConsumer()(astronautName);