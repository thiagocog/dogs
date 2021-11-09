import React from 'react'
import { PHOTO_DELETE } from '../../api'
import useFetch from '../../Hooks/useFetch'
import styles from './PhotoDelete.module.css'

const PhotoDelete = ({ id }) => {

  const token = localStorage.getItem('token')
  const { request, error, loading } = useFetch()

  async function handleClick() {
    const confirm = window.confirm('Are you sure you want to delete this photo?')
    if (confirm) {
      const { url, options } = PHOTO_DELETE(id, token)
      const { response } = await request(url, options)
      if (response.ok) window.location.reload()
    }
  }

  return (
    <>
      {loading ? 
        <button className={styles.delete} disabled>Deleting...</button>
        :
        <button className={styles.delete} onClick={handleClick}>Delete</button>
      }
    </>
  )
}

export default PhotoDelete
