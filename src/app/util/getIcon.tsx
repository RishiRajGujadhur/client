import { Person, Favorite, ShoppingBasket, Loop, Collections, ThumbUp, SettingsApplications, Receipt, Reviews, CommentBank, Assistant, SupportAgent, ManageHistory, SavedSearch, Chat, Visibility, Summarize, Redeem, Loyalty, AccountBox, Settings } from '@mui/icons-material';

export const getIcon = (featureIcon: string) => {
  switch (featureIcon) {
    case 'Person':
      return <Person />;
    case 'Favorite':
      return <Favorite />;
    case 'ShoppingBasket':
      return <ShoppingBasket />;
    case 'Loop':
      return <Loop />;
    case 'Collections':
      return <Collections />;
    case 'ThumbUp':
      return <ThumbUp />;
    case 'SettingsApplications':
      return <SettingsApplications />;
    case 'Receipt':
      return <Receipt />;
    case 'Reviews':
      return <Reviews />;
    case 'CommentBank':
      return <CommentBank />;
    case 'Assistant':
      return <Assistant />;
    case 'SupportAgent':
      return <SupportAgent />;
    case 'ManageHistory':
      return <ManageHistory />;
    case 'SavedSearch':
      return <SavedSearch />;
    case 'Chat':
      return <Chat />;
    case 'Visibility':
      return <Visibility />;
    case 'Summarize':
      return <Summarize />;
    case 'Redeem':
      return <Redeem />;
    case 'Loyalty':
      return <Loyalty />;
    case 'AccountBox':
      return <AccountBox />;
    case 'Settings':
      return <Settings />;
    default:
      return null;
  }
};