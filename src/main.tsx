import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import OfertixEcommerceApp from './OfertixEcommerceApp'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <OfertixEcommerceApp />
  </StrictMode>,
)
