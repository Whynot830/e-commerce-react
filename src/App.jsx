import './App.css'
import { Route, Routes } from 'react-router-dom'
import PersistLogin from './components/PersistLogin'
import RequireAuth from './components/RequireAuth'
import Layout from './components/Layout'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Profile from './pages/Profile'
import Catalog from './pages/Catalog'
import Cart from './pages/Cart'
import ProductsByCategory from './pages/ProductsByCategory'
import Product from './pages/Product'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      
      <Route path='/' element={<Layout />}>  
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/catalog" element={< Catalog />} />
        <Route path="/catalog/:category" element={< ProductsByCategory />} />
        <Route path="/catalog/:category/:id" element={< Product />} />

        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="/profile" element={< Profile />} />
            <Route path="/cart" element={< Cart />} />
          </Route>
        </Route>

        <Route path='/404' element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
