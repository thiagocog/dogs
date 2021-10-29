import React from 'react'
import { Link } from 'react-router-dom'
import styles from './LoginForm.module.css'
import stylesBtn from '../Forms/Button.module.css'
import useForm from '../../Hooks/useForm'
import Input from '../Forms/Input'
import Button from '../Forms/Button'
import { UserContext } from '../../UserContext'
import Error from '../Helper/Error'

const LoginForm = () => {

  const username = useForm()
  const password = useForm()
  const { userLogin, error, loading } = React.useContext(UserContext)

  async function handleSubmit(event) {
    event.preventDefault()
    if (username.validate() && password.validate()) {
      userLogin(username.value, password.value)
    }
  }

  return (
    <section className='animeLeft'>
      <h1 className='title'>Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
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
        {loading ? <Button disabled>Carregando...</Button> : <Button>Entrar</Button>}
        <Error error={error} />
      </form>
      <Link to='/login/perdeu' className={styles.perdeu}>Perdeu a senha?</Link>
      <div className={styles.cadastro}>
        <h2 className={styles.subtitle}>Cadastre-se</h2>
        <p>Ainda não possui conta? Cadastre-se no site.</p>
        <Link to='/login/criar' className={stylesBtn.button}>Cadastro</Link>
      </div>
    </section>
  )
}

export default LoginForm
