import { Drawer, Toolbar } from "@mui/material";
import AppName from "./AppName";
import { useAppSelector } from "../store/configureStore";
import { FeatureSettings } from "../../models/settings/featureSettings/featureSettings";
import agent from "../api/agent";
import { useEffect, useState } from "react";
import SidebarListItem from "./SidebarListItem";

const drawerWidth = '240px';

interface Props {
  darkMode: boolean;
  handleThemeChange: () => void;
}

export default function Sidebar({ handleThemeChange, darkMode }: Props) {
  const { user } = useAppSelector(state => state.account);
  const [featureSettings, setFeatureSettings] = useState<FeatureSettings[]>([]);

  useEffect(() => {
    const fetchFeatureSettings = async () => {
      try {
        const settings = await agent.FeatureConfigs.list();
        setFeatureSettings(settings);
      } catch (error) {
        console.error("Error fetching feature settings:", error);
      }
    };

    fetchFeatureSettings();
  }, []);

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
      {user &&
        <SidebarListItem featureSettings={featureSettings} isAdmin={!user.roles?.includes('Admin')} />
      }
    </Drawer>
  );
}
