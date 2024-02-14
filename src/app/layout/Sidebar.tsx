import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import { NavLink } from "react-router-dom";
import AppName from "./AppName";
import { Person, Favorite, ShoppingBasket, Loop, Collections, ThumbUp, SettingsApplications, Receipt, Reviews, CommentBank, Assistant, SupportAgent, ManageHistory, SavedSearch, Chat, Visibility, Summarize, Redeem, Loyalty } from '@mui/icons-material'; // Import the icons you want to use
import { useAppSelector } from "../store/configureStore";
const drawerWidth = '240px';

interface Props {
  darkMode: boolean;
  handleThemeChange: () => void;
}

export default function Sidebar({ handleThemeChange, darkMode }: Props) {
  const { user } = useAppSelector(state => state.account);

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
      {user && !user.roles?.includes('Admin') &&
        <List>
          <ListItem key="Summary" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Summarize />
              </ListItemIcon>
              <ListItemText primary="Summary" />
            </ListItemButton>
          </ListItem>
          <ListItem key="Profile" disablePadding>
            <ListItemButton component={NavLink} to="/customer/create">
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>
          <ListItem key="Wishlist" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Favorite />
              </ListItemIcon>
              <ListItemText primary="Wishlist" />
            </ListItemButton>
          </ListItem>
          <ListItem key="Purchases" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ShoppingBasket />
              </ListItemIcon>
              <ListItemText primary="Purchases" />
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
          <ListItem key="Collections" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Collections />
              </ListItemIcon>
              <ListItemText primary="Collections" />
            </ListItemButton>
          </ListItem>
          <ListItem key="Likes" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ThumbUp />
              </ListItemIcon>
              <ListItemText primary="Likes" />
            </ListItemButton>
          </ListItem>
          <ListItem key="Reviews" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Reviews />
              </ListItemIcon>
              <ListItemText primary="Reviews" />
            </ListItemButton>
          </ListItem>
          <ListItem key="Invoices" disablePadding>
            <ListItemButton component={NavLink} to="/my-invoices">
              <ListItemIcon>
                <Receipt />
              </ListItemIcon>
              <ListItemText primary="Invoices" />
            </ListItemButton>
          </ListItem>
          <ListItem key="Comments" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <CommentBank />
              </ListItemIcon>
              <ListItemText primary="Comments" />
            </ListItemButton>
          </ListItem>
          <ListItem key="Settings" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SettingsApplications />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
          <ListItem key="Support" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SupportAgent />
              </ListItemIcon>
              <ListItemText primary="Support" />
            </ListItemButton>
          </ListItem>
          <ListItem key="History" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ManageHistory />
              </ListItemIcon>
              <ListItemText primary="History" />
            </ListItemButton>
          </ListItem>
          <ListItem key="Saved Searches" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SavedSearch />
              </ListItemIcon>
              <ListItemText primary="Saved Searches" />
            </ListItemButton>
          </ListItem>
          <ListItem key="Messages" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Chat />
              </ListItemIcon>
              <ListItemText primary="Messages" />
            </ListItemButton>
          </ListItem>
          <ListItem key="Watch items" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Visibility />
              </ListItemIcon>
              <ListItemText primary="Watch items" />
            </ListItemButton>
          </ListItem>
          <ListItem key="Rewards" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Loyalty />
              </ListItemIcon>
              <ListItemText primary="Rewards" />
            </ListItemButton>
          </ListItem>
          <ListItem key="Gift cards" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Redeem />
              </ListItemIcon>
              <ListItemText primary="Gift cards" />
            </ListItemButton>
          </ListItem>
          <ListItem key="Recommendations" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Assistant />
              </ListItemIcon>
              <ListItemText primary="Recommendations" />
            </ListItemButton>
          </ListItem>
        </List>}

      {user && user.roles?.includes('Admin') &&
        <List>
          <ListItem key="Summary" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Summarize />
              </ListItemIcon>
              <ListItemText primary="Summary" />
            </ListItemButton>
          </ListItem>

          <ListItem key="Manage Orders" disablePadding>
            <ListItemButton component={NavLink} to="/manageOrders">
              <ListItemIcon>
                <Redeem />
              </ListItemIcon>
              <ListItemText primary="Manage Orders" />
            </ListItemButton>
          </ListItem>

          <ListItem key="Manage Users" disablePadding>
            <ListItemButton component={NavLink} to="/manageUsers">
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText primary="All Users" />
            </ListItemButton>
          </ListItem>

          <ListItem key="Invoice Settings" disablePadding>
            <ListItemButton component={NavLink} to="/invoiceSettings">
              <ListItemIcon>
                <SettingsApplications />
              </ListItemIcon>
              <ListItemText primary="Invoice Settings" />
            </ListItemButton>
          </ListItem>

          <ListItem key="Invoice Sender Profile" disablePadding>
            <ListItemButton component={NavLink} to="/invoiceSenderProfile">
              <ListItemIcon>
                <Redeem />
              </ListItemIcon>
              <ListItemText primary="Invoice Sender Profile" />
            </ListItemButton>
          </ListItem>
        </List>

      }
    </Drawer>
  );
}
