import React from 'react'
import { useParams } from 'react-router-dom'
import Feed from '../Feed/Feed'

const UserProfile = () => {

  const [ok, setOk] = React.useState('')

  const { user } = useParams()

  return (
    <section className='container mainSection'>
      <h1 className='title'>
        {user}
      </h1>
      <Feed user={user} />
    </section>
  )
}

export default UserProfile