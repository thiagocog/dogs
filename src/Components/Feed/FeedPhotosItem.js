import React from 'react'
import Image from '../Helper/Image'
import styles from './FeedPhotosItem.module.css'

const FeedPhotosItem = ({ photo, setModalPhoto }) => {

  function handleClick(event) {
    event.preventDefault()
    setModalPhoto(photo)
  }

  return (
    <li className={styles.photo} onClick={handleClick}>
      <Image src={photo.src} alt={photo.title} />
      {/* <img src={photo.src} alt={photo.title} /> */}
      <span className={styles.visualization}>{photo.acessos}</span>
    </li>
  )
}

export default FeedPhotosItem
