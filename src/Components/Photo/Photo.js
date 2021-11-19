import React from 'react';
import { useParams } from "react-router-dom"
import { PHOTO_GET } from '../../api';
import useFetch from "../../Hooks/useFetch"
import Error from '../Helper/Error';
import Loading from '../Helper/Loading';
import PhotoContent from './PhotoContent';

const Photo = () => {

  const { id } = useParams()
  const { data, loading, error, request } = useFetch()

  React.useEffect(() => {
    async function fetchPhoto() {
      const { url, options } = PHOTO_GET(id)
      const { response, resJson } = await request(url, options)
      console.log(response)
      console.log(resJson)
    }
    fetchPhoto()
  }, [id, request])

  if (error) return <Error error={error} />
  if (loading) return <Loading />
  if (data)
  return (
    <section className='container mainContainer'>
      <PhotoContent data={data} single={true} />
    </section>
  )
  return null
}

export default Photo
