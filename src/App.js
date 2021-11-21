import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { UserStorage } from './UserContext'
import ProtectedRoute from './Components/Helper/ProtectedRoute'
import Header from './Components/Header'
import Footer from './Components/Footer'
import Home from './Components/Home'
import Login from './Components/Login/Login'
import User from './Components/User/User'
import Photo from './Components/Photo/Photo'
import UserProfile from './Components/User/UserProfile.js'
import NotFound from './Components/NotFound'

function App() {
  return (
    <BrowserRouter>
      <UserStorage>
        <Header />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='login/*' element={<Login />}/>
          <ProtectedRoute path='conta/*' element={<User />}/>
          <Route path='photo/:id' element={<Photo />}/>
          <Route path='profile/:user' element={<UserProfile />}/>
          <Route path='*' element={<NotFound />}/>
        </Routes>
        <Footer />
      </UserStorage>
    </BrowserRouter>
  )
}

export default App
 