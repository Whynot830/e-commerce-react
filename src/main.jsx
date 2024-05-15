import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.postcss'
import { AuthProvider } from './components/context/AuthContext.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './components/providers/ThemeProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Routes>
            <Route path='/*' element={<App />} />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
)
