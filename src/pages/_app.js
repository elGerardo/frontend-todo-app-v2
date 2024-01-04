import "bootstrap/dist/css/bootstrap.min.css";
import "../global.css";
import { Container } from "react-bootstrap";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

const App = ({ Component, pageProps }) => {
  return (
    <Container>
      <Component {...pageProps} />
    </Container>
  );
};

export default App;
