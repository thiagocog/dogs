import React from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../Forms/Input'
import Button from '../Forms/Button'
import useForm from '../../Hooks/useForm'
import useFetch from '../../Hooks/useFetch'
import { PASSWORD_RESET } from '../../api'
import Error from '../Helper/Error'

const LoginPasswordReset = () => {

  const [login, setLogin] = React.useState('')
  const [key, setKey] = React.useState('')
  const password = useForm()
  const { loading, error, request } = useFetch()
  const navigate = useNavigate()

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const login = params.get('login')
    const key = params.get('key')
    if (key) setKey(key)
    if (login) setLogin(login)
  }, [])

  async function handleSubmit(event) {
    event.preventDefault()
    if (password.validate()) {
      const { url, options } = PASSWORD_RESET({
        login,
        key,
        password: password.value
      })
      const { response } = await request(url, options)
      if (response.ok) navigate('/login')
    }
  }

  return (
    <div>
      <h1 className='title'>Reset password</h1>
      <form onSubmit={handleSubmit}>
        <Input label='New password' type='password' name='password' {...password} />
        {loading ? <Button disabled>Reseting...</Button> : <Button>Reset Password</Button>}
      </form>
      <Error error={error} />
    </div>
  )
}

export default LoginPasswordReset
