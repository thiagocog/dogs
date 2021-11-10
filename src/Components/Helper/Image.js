import React from 'react'
import styles from './Image.module.css'

const Image = ({ alt, ...props }) => {

  const [skeleton, setSkeleton] = React.useState(true)

  function handleLoad({ target }) {
    target.style.opacity = 1
    setSkeleton(false)
  }

  return (
    <div className={styles.wrapper}>
      {skeleton && <div className={styles.skeleton}></div>}
      <img {...props} alt={alt} className={styles.img} onLoad={handleLoad}/>
    </div>
  )
}

export default Image
