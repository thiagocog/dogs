import React from 'react'

const useFetch = () => {

  const [data, setData] = React.useState(null)
  const [error, setError] = React.useState(null)
  const [loading, setLoading] = React.useState(false)

  const request = React.useCallback(async (url, options) => {
    let response
    let resJson
    try {
      setError(null)
      setLoading(true)
      response = await fetch(url, options)
      resJson = await response.json()
      if(!response.ok) throw new Error(resJson.message)
    } catch(err) {
      resJson = null
      setError(err.message)
    } finally {
      setData(resJson)
      setLoading(false)
      return {
        response,
        resJson
      }
    }
  }, [])

  return {
    data,
    error,
    loading,
    request
  }
}

export default useFetch
