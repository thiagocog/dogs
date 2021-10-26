import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { UserStorage } from './UserContext'
import Header from './Components/Header'
import Footer from './Components/Footer'
import Home from './Components/Home'
import Login from './Components/Login/Login'

function App() {
  return (
    <BrowserRouter>
      <UserStorage>
        <Header />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/login/*' element={<Login />}/>
        </Routes>
        <Footer />
      </UserStorage>
    </BrowserRouter>
  )
}

export default App
