import React from 'react'
import Input from '../Forms/Input'
import Button from '../Forms/Button'
import useForm from '../../Hooks/useForm'
import useFetch from '../../Hooks/useFetch'
import { PASSWORD_LOST } from '../../api'
import Error from '../Helper/Error'
import Head from '../Helper/Head'

const LoginPasswordLost = () => {

  const login = useForm()
  const { data, loading, error, request } = useFetch()

  async function handleSubmit(event) {
    event.preventDefault()
    if (login.validate()) {
      const { href } = window.location
      const { url, options } = PASSWORD_LOST({
        login: login.value,
        url: href.replace('perdeu', 'resetar')
      })
      const { resJson } = await request(url, options)
    }
  }

  return (
    <section>
      <Head title='Lost Password' />
      <h1 className='title'>Lost your password?</h1>
      {data ? 
        <p style={{color: '#4c1'}}>{data}</p> : 
        <form onSubmit={handleSubmit}>
          <Input
            label='Email / User'
            type='text'
            name='login'
            {...login}
          />
          {loading ? <Button disabled>Sending...</Button> : <Button>Send Email</Button>}
        </form>
      }
      <Error error={error} />
    </section>
  )
}

export default LoginPasswordLost
