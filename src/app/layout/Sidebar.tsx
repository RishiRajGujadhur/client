import React from 'react';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import AppName from "./AppName";
import { Person, Favorite, ShoppingBasket, Loop } from '@mui/icons-material'; // Import the icons you want to use

const drawerWidth = '240px';

interface Props {
  darkMode: boolean;
  handleThemeChange: () => void;
}

export default function Sidebar({ handleThemeChange, darkMode }: Props) {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar>
        <AppName darkMode={darkMode} handleThemeChange={handleThemeChange} />
      </Toolbar>
      {/* This creates space for the Header */}
      <List>
        <ListItem key="Profile" disablePadding>
          <ListItemButton component={NavLink} to="/customer/create">
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItemButton>
        </ListItem>
        {/* Add other sidebar items as needed */}
        <ListItem key="Wishlist" disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Favorite />
            </ListItemIcon>
            <ListItemText primary="Wishlist" />
          </ListItemButton>
        </ListItem>
        <ListItem key="Orders" disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <ShoppingBasket />
            </ListItemIcon>
            <ListItemText primary="Orders" />
          </ListItemButton>
        </ListItem>
        <ListItem key="Returns" disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Loop />
            </ListItemIcon>
            <ListItemText primary="Returns" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}
