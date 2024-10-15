import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import store, { persistor } from './redux/store';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Toaster } from 'sonner'
import { PersistGate } from 'redux-persist/integration/react';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
        {/* <GlobalModal /> */}
        <Toaster closeButton richColors expand={true} position="top-right" duration={4000} /> 
        </PersistGate>
    </Provider>
  </BrowserRouter>,
  </StrictMode>,
)
