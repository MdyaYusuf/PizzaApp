import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './contexts/ThemeContext.jsx'
import { CartProvider } from './contexts/CartContext.jsx'
import { UIContextProvider } from './contexts/UIContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UIContextProvider>
      <ThemeProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </ThemeProvider>
    </UIContextProvider>
  </StrictMode>
)
