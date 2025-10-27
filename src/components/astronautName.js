import { withLDConsumer } from "launchdarkly-react-client-sdk";

const astronautName = ({ flags, ldClient}) => {
  <div>
      <br />
    <span style={{ color: 'black' }}><center><h2>My Name is AstroBot!</h2></center></span>
    <br />
  </div>
};

export default withLDConsumer()(astronautName);