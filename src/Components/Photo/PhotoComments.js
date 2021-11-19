import React from 'react'
import styles from './PhotoComments.module.css'
import { UserContext } from '../../UserContext'
import PhotoCommentsForm from './PhotoCommentsForm'

const PhotoComments = ({ id, comments, single }) => {

  const [commentsList, setCommentsList] = React.useState(() => comments)
  const commentsSection = React.useRef(null)
  const { login } = React.useContext(UserContext)

  React.useEffect(() => {
    commentsSection.current.scrollTop = commentsSection.current.scrollHeight
  }, [commentsList])

  return (
    <>
      <ul ref={commentsSection} className={`${styles.comments} ${single ? styles.single : ''}`}>
        {commentsList.map(comment => (
          <li key={comment.comment_ID}>
            <b>{comment.comment_author}: </b>
            <span>{comment.comment_content}</span>
          </li>
        ))}
      </ul>
      {login && <PhotoCommentsForm id={id} setCommentsList={setCommentsList} single={single} />}
    </>
  )
}

export default PhotoComments
