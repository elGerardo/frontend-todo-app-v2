import 'bootstrap/dist/css/bootstrap.min.css';
import "../global.css";
import { Container } from 'react-bootstrap';

const App = ({ Component, pageProps }) => {
    return (
        <Container>
            <Component {...pageProps} />
        </Container>
    );
  };
  
  export default App;