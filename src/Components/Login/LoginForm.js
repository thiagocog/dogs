import React from 'react'
import { Link } from 'react-router-dom'
import useForm from '../../Hooks/useForm'
import Input from '../Forms/Input'
import Button from '../Forms/Button'

const LoginForm = () => {

  const username = useForm()
  const password = useForm()

  function handleSubmit(event) {
    event.preventDefault()
    if (username.validate() && password.validate()) {
      fetch('https://dogsapi.origamid.dev/json/jwt-auth/v1/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username.value,
          password: password.value,
        })
      }).then(response => {
        console.log(response)
        return response.json()
      }).then(resJson => {
        console.log(resJson)
      })
    }
  }

  return (
    <section>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          label="Usuário"
          name="username"
          {...username}
        />
        <Input
          type="password"
          label="Senha"
          name="password"
          {...password}
        />
        <Button>Entrar</Button>

        {/* <input
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        /> */}

      </form>
      <Link to='/login/criar'>Cadastro</Link>
    </section>
  )
}

export default LoginForm
