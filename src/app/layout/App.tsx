import { Box, Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Header from './Header';
import { useCallback, useEffect, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { useAppDispatch, useAppSelector } from '../store/configureStore';
import { fetchBasketAsync } from '../../features/basket/basketSlice';
import { fetchCurrentUser } from '../../features/account/accountSlice'; 
import Sidebar from './Sidebar';
import DisplayLoading from './DisplayLoading'; 


function App() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
      await dispatch(fetchBasketAsync());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, [initApp])

  const initialDarkModeStatus = useMemo(() => {
    return localStorage.getItem('darkMode') === 'true';
  }, []);

  const [darkMode, setDarkMode] = useState(initialDarkModeStatus);
  const palleteType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode: palleteType,
      background: {
        default: (palleteType === 'light') ? '#eaeaea' : '#121212'
      }
    }
  })
  const { user } = useAppSelector(state => state.account);
  function handleThemeChange() {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', (!darkMode).toString());
  }

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position='bottom-right' hideProgressBar theme='colored' />
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
      {
        user ?
          <Container sx={{ display: 'flex', flexGrow: 1 }}>
            <Sidebar darkMode={darkMode} handleThemeChange={handleThemeChange} />
            <Box sx={{ flexGrow: 1, padding: '20px' }}>
              <DisplayLoading loading={loading} locationPathname={location.pathname} />
            </Box>
          </Container>
          : (<Container sx={{ mt: 4 }}>
            <DisplayLoading loading={loading} locationPathname={location.pathname} />
          </Container>)
      }
    </ThemeProvider>
  );
}

export default App;