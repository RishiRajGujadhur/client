import { Outlet } from 'react-router-dom';
import Header from './Header';
import { Container } from '@mui/material';
import { useState } from 'react';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }

  return (
    <>
       <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
      <Container>
        <Outlet />
      </Container>
    </>
  );
}

export default App;
