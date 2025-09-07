import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/reset.scss'
import AppRoutes from './routes'

createRoot(document.getElementById('root')).render(
    <AppRoutes />
)
