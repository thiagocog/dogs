import React from 'react'
import styles from './UserHeaderNav.module.css'
import { NavLink, useLocation } from 'react-router-dom'
import { UserContext } from '../../UserContext'
import { ReactComponent as MyPhotos } from '../../Assets/feed.svg'
import { ReactComponent as Stats } from '../../Assets/estatisticas.svg'
import { ReactComponent as AddPhoto } from '../../Assets/adicionar.svg'
import { ReactComponent as Logout } from '../../Assets/sair.svg'
import useMedia from '../../Hooks/useMedia'


const UserHeaderNav = () => {
  
  const [mobileMenu, setMobileMenu] = React.useState(false)
  const { userLogout } = React.useContext(UserContext)
  const mobile = useMedia('(max-width: 40rem)')

  const { pathname } = useLocation()

  React.useEffect(() => {
    setMobileMenu(false)
  }, [pathname])
  
  return (
    <>
      {mobile &&
        <button
        className={`${styles.mobileButton} ${mobileMenu && styles.mobileButtonActive}`}
        aria-label="Menu"
        onClick={() => setMobileMenu(!mobileMenu)}
        ></button>
      }
      <nav className={`${mobile ? styles.navMobile : styles.nav} ${mobileMenu && styles.navMobileActive}`}>
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
    </>
  )
}

export default UserHeaderNav
