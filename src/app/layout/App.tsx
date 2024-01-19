import Catalog from '../../features/catalogue/Catalogue';
import Header from './Header';
import { Container } from '@mui/material';

function App() {

  return (
    <>
      <Header />
      <Container>
        <Catalog />
      </Container>
    </>
  );
}

export default App;
