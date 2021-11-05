import React from 'react'
import { useLocation } from 'react-router-dom'
import styles from './UserHeader.module.css'
import UserHeaderNav from './UserHeaderNav'

const UserHeader = () => {

  const [title, setTitle] = React.useState('')
  const { pathname } = useLocation()
  
  React.useEffect(() => {
    switch (pathname) {
      case '/conta':
        setTitle('Feed')
        break
      case '/conta/estatisticas':
        setTitle('Stats')
        break
      case '/conta/postar':
        setTitle('Add Photo')
        break
      default:
        setTitle('')
    }
  }, [pathname])

  return (
    <header className={styles.header}>
      <h1 className="title">{title}</h1>
      <UserHeaderNav />
    </header>
  )
}

export default UserHeader
