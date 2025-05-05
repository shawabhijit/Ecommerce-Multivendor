import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import store from './app/Store.ts'

createRoot(document.getElementById('root')!).render(

      <App />

)
