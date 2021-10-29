import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { UserStorage } from './UserContext'
import ProtectedRoute from './Components/Helper/ProtectedRoute'
import Header from './Components/Header'
import Footer from './Components/Footer'
import Home from './Components/Home'
import Login from './Components/Login/Login'
import User from './Components/User/User'

function App() {
  return (
    <BrowserRouter>
      <UserStorage>
        <Header />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='login/*' element={<Login />}/>
          <ProtectedRoute path='conta/*' element={<User />}/>
        </Routes>
        <Footer />
      </UserStorage>
    </BrowserRouter>
  )
}

export default App
 