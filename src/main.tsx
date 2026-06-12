import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import routes from './AppRoutes'
import ScrollToTop from './components/ScrollToTop'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {
          routes.map(({ path, element }) => (

            <Route key={path} path={path} element={element} />
          ))
        }
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
