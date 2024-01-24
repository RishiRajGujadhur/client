import React from 'react';
import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router-dom';
import Switch from '@mui/material/Switch/Switch';


interface AppNameProps {
  darkMode: boolean;
  handleThemeChange: () => void;
}

const AppName: React.FC<AppNameProps> = ({ darkMode, handleThemeChange }) => {
  return (
    <React.Fragment>
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
        Store
      </Typography>
      <Switch checked={darkMode} onChange={handleThemeChange} />
    </React.Fragment>
  );
};

export default AppName;
