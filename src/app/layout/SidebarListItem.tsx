import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { FeatureSettings } from '../../models/settings/featureSettings/featureSettings';
import { getIcon } from '../util/getIcon';

interface Props {
    featureSettings: FeatureSettings[];
    isAdmin: boolean;
}

export default function SidebarListItem(featureSettings: Props) {
    return (
        <List>
            {featureSettings.featureSettings
                .filter((setting) => setting.adminFeature !== featureSettings.isAdmin 
                && setting.isFeatureEnabled == true)
                .map((setting) => (
                    <ListItem key={setting.id} disablePadding>
                        <ListItemButton component={NavLink} to={setting.featureRoute}>
                            <ListItemIcon>
                                {getIcon(setting.featureIcon)}
                            </ListItemIcon>
                            <ListItemText primary={setting.featureName} />
                        </ListItemButton>
                    </ListItem>
                ))}
        </List>
    )
}