import React from 'react'
import Head from '../Helper/Head'
import useFetch from '../../Hooks/useFetch'
import Loading from '../Helper/Loading'
import Error from '../Helper/Error'
import UserStatsGraphs from './UserStatsGraphs'
import { STATS_GET } from '../../api'

const UserStats = () => {

  const { data, loading, error, request } = useFetch()

  React.useEffect(() => {
    async function getData() {
      const token = localStorage.getItem('token')
      const { url, options } = STATS_GET(token)
      await request(url, options)
    }
    getData()
  }, [request])

  if (loading) return <Loading />
  if (error) return <Error error={error} />
  if (data) {
    return (
      <div>
        <Head title='Stats' />
        <UserStatsGraphs data={data} />
      </div>
    )
  }
  return null
}

export default UserStats
