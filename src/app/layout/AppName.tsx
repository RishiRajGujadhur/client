import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router-dom';
import Switch from '@mui/material/Switch/Switch';
import agent from '../api/agent';

interface AppNameProps {
  darkMode: boolean;
  handleThemeChange: () => void;
}

const AppName: React.FC<AppNameProps> = ({ darkMode, handleThemeChange }) => {
  const [appName, setAppName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await agent.GeneralSettings.getAppName(); 
        setAppName(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Typography
        variant='h6'
        component={NavLink}
        to='/'
        sx={{
          color: 'inherit',
          textDecoration: 'none',
          typography: 'h6',
          '&:hover': {
            color: 'grey.500'
          },
        }}
      >
        {appName}
      </Typography>
      <Switch checked={darkMode} onChange={handleThemeChange} />
    </>
  );
};

export default AppName;
