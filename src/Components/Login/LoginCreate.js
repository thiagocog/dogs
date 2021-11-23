import React from 'react'
import { USER_POST } from '../../api'
import useForm from '../../Hooks/useForm'
import useFetch from '../../Hooks/useFetch'
import { UserContext } from '../../UserContext'
import Button from '../Forms/Button'
import Input from '../Forms/Input'
import Error from '../Helper/Error'
import Head from '../Helper/Head'

const LoginCreate = () => {

  const username = useForm()
  const email = useForm('email')
  const password = useForm()
  const { userLogin } = React.useContext(UserContext)
  const { loading, error, request } = useFetch()

  async function handleSubmit(event) {
    event.preventDefault()
    if (username.validate() && email.validate() && password.validate()) {
      const { url, options } = USER_POST({
        username: username.value,
        email: email.value,
        password: password.value,
      })
      const { response } = await request(url, options)
      if (response.ok) userLogin(username.value, password.value)
    }
  }

  return (
    <section className="animeLeft">
      <Head title='Create Account' />
      <h1 className='title'>Cadastre-se</h1>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          label="Usuário"
          name="username"
          {...username}
        />
        <Input
          type="email"
          label="E-mail"
          name="email"
          {...email}
        />
        <Input
          type="password"
          label="Senha"
          name="password"
          {...password}
        />
        {loading ? <Button disabled>Cadastrando...</Button> : <Button>Cadastrar</Button>}
        <Error error={error} />
      </form>
    </section>
    
  )
}

export default LoginCreate
