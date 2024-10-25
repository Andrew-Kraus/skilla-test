import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './shared/styles/nullstyle.css'
import './assets/fonts/index.css'
import './shared/styles/commonStyles.css'
import App from './app/App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
