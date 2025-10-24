import { withLDConsumer } from "launchdarkly-react-client-sdk";

const astronautName = ({ flags, ldClient}) => {

  return flags.releaseAstronautName ? (
  <div>
    <br />
    <span style={{ color: 'black' }}><center><h2>My Name is Bob!</h2></center></span>
    <br />
  </div>
  ) : (
  <div />
  );
};

export default withLDConsumer()(astronautName);