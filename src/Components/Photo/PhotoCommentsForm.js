import React from 'react'
import styles from './PhotoCommentsForm.module.css'
import useFetch from '../../Hooks/useFetch'
import { COMMENT_POST } from '../../api'
import { ReactComponent as Enviar } from '../../Assets/enviar.svg'
import Error from '../Helper/Error'

const PhotoCommentsForm = ({ id, setCommentsList, single }) => {

  const token = localStorage.getItem('token')
  const [comment, setComment] = React.useState('')
  const { error, request } = useFetch()

  async function handleSubmit(event) {
    event.preventDefault()
    const { url, options } = COMMENT_POST(id, token, { comment })
    const { response, resJson } = await request(url, options)
    if (response.ok) {
      setComment('')
      setCommentsList(commentsList => [
        ...commentsList,
        resJson
      ])
    } 
  }

  return (
    <form onSubmit={handleSubmit} className={`${styles.form} ${single ? styles.single : ''}`}>
      <textarea
        id='comment'
        name='comment'
        className={styles.textarea}
        placeholder='Make your comment'
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      />
      <button className={styles.button}>
        <Enviar />
      </button>
      <Error error={error} />
    </form>
  )
}

export default PhotoCommentsForm
