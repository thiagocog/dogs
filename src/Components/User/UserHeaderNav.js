import React from 'react'
import styles from './UserHeaderNav.module.css'
import { NavLink } from 'react-router-dom'
import { UserContext } from '../../UserContext'
import { ReactComponent as MyPhotos } from '../../Assets/feed.svg'
import { ReactComponent as Stats } from '../../Assets/estatisticas.svg'
import { ReactComponent as AddPhoto } from '../../Assets/adicionar.svg'
import { ReactComponent as Logout } from '../../Assets/sair.svg'


const UserHeaderNav = () => {

  const [mobile, setMobile] = React.useState(false)
  const { userLogout } = React.useContext(UserContext)
  
  return (
    <nav className={styles.nav}>
      <NavLink to='/conta' end>
        <MyPhotos />
        {mobile && 'My Photos'}
      </NavLink>
      <NavLink to='/conta/estatisticas'>
        <Stats />
        {mobile && 'Stats'}
      </NavLink>
      <NavLink to='/conta/postar'>
        <AddPhoto />
        {mobile && 'Add Photo'}
      </NavLink>
      <button onClick={userLogout}>
        <Logout />
        {mobile && 'Logout'}
      </button>
    </nav>
  )
}

export default UserHeaderNav
