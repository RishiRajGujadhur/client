import ReactDOM from 'react-dom/client'
import './app/layout/index.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/router/Routes';
import { Provider } from 'react-redux';
import { store } from './app/store/configureStore';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
  </>,
)