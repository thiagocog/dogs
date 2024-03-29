import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './UserPhotoPost.module.css'
import useForm from '../../Hooks/useForm'
import useFetch from '../../Hooks/useFetch'
import Input from '../Forms/Input'
import Button from '../Forms/Button'
import { PHOTO_POST } from '../../api'
import Error from '../Helper/Error'
import Head from '../Helper/Head'

const UserPhotoPost = () => {

  const nome = useForm()
  const peso = useForm('number')
  const idade = useForm('number')
  const [img, setImg] = React.useState({})
  const { data, error, loading, request } = useFetch()
  const navigate = useNavigate()

  React.useEffect(() => {
    if (data) navigate('/conta')
  }, [data, navigate])

  async function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData()
    formData.append('img', img.raw)
    formData.append('nome', nome.value)
    formData.append('peso', peso.value)
    formData.append('idade', idade.value)

    const token = localStorage.getItem('token')
    const { url, options } = PHOTO_POST(formData, token)
    await request(url, options)
  }

  function handleImgChange({ target }) {
    setImg({
      preview: URL.createObjectURL(target.files[0]),
      raw: target.files[0]
    })
  }

  return (
    <section className={`${styles.photoPost} animeLeft`}>
      <Head title='Photo Post' />
      <form onSubmit={handleSubmit}>
        <Input type='text' label='Nome' name='nome' {...nome} />
        <Input type='number' label='Peso' name='peso' {...peso} />
        <Input type='number' label='Idade' name='idade' {...idade} />
        <input
          type='file'
          name='img'
          id='img'
          className={styles.file}
          onChange={handleImgChange}
        />
        {loading ? <Button disabled>Sending...</Button> : <Button>Send</Button>}
        <Error error={error} />
      </form>
      <div>
        {img.preview && (
          <div
            className={styles.preview}
            style={{backgroundImage: `url('${img.preview}')`}}>
          </div>
        )}
      </div>
    </section>
  )
}

export default UserPhotoPost
