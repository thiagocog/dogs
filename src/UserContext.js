import React from 'react'
import { useNavigate } from 'react-router-dom'
import { TOKEN_POST, USER_GET, TOKEN_VALIDATE_POST } from './api'

export const UserContext = React.createContext()

export const UserStorage = ({ children }) => {

  const [data, setData] = React.useState(null)
  const [login, setLogin] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(false)
  const navigate = useNavigate()

  const userLogout = React.useCallback(async function() {
    setData(null)
    setError(null)
    setLoading(false)
    setLogin(false)
    localStorage.removeItem('token')
    navigate('/login')
  }, [navigate])
  
  const getUser = React.useCallback(async function(token) {
    const { url, options } = USER_GET(token)
    const response = await fetch(url, options)
    const resJson = await response.json()
    setData(resJson)
    setLogin(true)
    // navigate('/conta')
    // console.log(resJson)
  }, [navigate])
  
  async function userLogin(username, password) {
    try {
      setError(null)
      setLoading(true)
      const { url, options } = TOKEN_POST({username, password})
      const response = await fetch(url, options)
      if (!response.ok) {
        // console.log(response)
        throw new Error('Error: Invalid user')
      }
      const { token } = await response.json()
      localStorage.setItem('token', token)
      await getUser(token)
      navigate('/')
    } catch(err) {
      setError(err.message)
      setLogin(false)
    } finally {
      setLoading(false)
    }
  }

  // async function createUser(username, email, password) {
  //   try {
  //     setError(null)
  //     setLoading(true)
  //     const { url, options } = USER_POST({username, email, password})
  //     const response = await fetch(url, options)
  //     if (!response.ok) {
  //       console.log(response)
  //       throw new Error('Error: Não foi possível realizar o cadastro')
  //     }
  //     const { token } = await response.json()
  //     localStorage.setItem('token', token)
  //     await getUser(token)
  //   } catch(err) {
  //     setError(err.message)
  //     setLogin(false)
  //   } finally {
  //     setLoading(false)
  //   }
  // }
  
  React.useEffect(() => {
    async function autoLogin() {
      const token = localStorage.getItem('token')
      if (token) {
        try {
          setError(null)
          setLoading(true)
          const { url, options } = TOKEN_VALIDATE_POST(token)
          const response = await fetch(url, options)
          if (!response.ok) throw new Error('Invalid Token')
          await getUser(token)
        } catch (err) {
          userLogout()
        } finally {
          setLoading(false)
        }
      }
    }
    autoLogin()
  }, [userLogout, getUser])

  return (
    <UserContext.Provider value={{ userLogin, userLogout, data, error, loading, login }}>
      {children}
    </UserContext.Provider>
  )
}
