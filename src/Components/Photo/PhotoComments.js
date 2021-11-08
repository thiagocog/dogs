import React from 'react'
import styles from './PhotoComments.module.css'
import { UserContext } from '../../UserContext'
import PhotoCommentsForm from './PhotoCommentsForm'

const PhotoComments = ({ id, comments }) => {

  const [commentsList, setCommentsList] = React.useState(() => comments)
  const { login } = React.useContext(UserContext)

  return (
    <>
      <ul className={styles.comments}>
        {commentsList.map(comment => (
          <li key={comment.comment_ID}>
            <b>{comment.comment_author}: </b>
            <span>{comment.comment_content}</span>
          </li>
        ))}
      </ul>
      {login && <PhotoCommentsForm id={id} setCommentsList={setCommentsList} />}
    </>
  )
}

export default PhotoComments
