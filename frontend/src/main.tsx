import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import StoreProvider from './app/provider/StoreProvider.tsx'
import { App } from './app/App.tsx'
import './app/ui/styles.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </StrictMode>,
)
