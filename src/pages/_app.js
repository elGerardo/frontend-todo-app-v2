import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import "@/styles/global.css";
import { Container } from "react-bootstrap";

const App = ({ Component, pageProps }) => {
  return (
    <Container>
      <Component {...pageProps} />
    </Container>
  );
};

export default App;
