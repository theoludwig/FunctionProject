import Link from 'next/link'
import { useEffect, useState, forwardRef, useContext } from 'react'
import date from 'date-and-time'
import htmlParser from 'html-react-parser'
import { UserContext } from '../../../contexts/UserContext'
import ReactMarkdown from 'react-markdown'
import CodeBlock from '../../CodeBlock'
import api, { API_URL } from '../../../utils/api'

const CommentCard = forwardRef((props, ref) => {
  const { isAuth, user } = useContext(UserContext)
  const [isEditing, setEditing] = useState(false)
  const [editInput, setEditInput] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    setEditInput(props.message)
  }, [])

  const deleteCommentById = async () => {
    props.manageComment.setLoadingComments(true)
    if (isAuth && user.token != null) {
      try {
        await api.delete(`/comments/${props.id}`, {
          headers: { Authorization: user.token }
        })
        const newCommentsData = { ...props.manageComment.commentsData }
        const commentIndex = newCommentsData.rows.findIndex(
          value => value.id === props.id
        )
        newCommentsData.rows.splice(commentIndex, 1)
        props.manageComment.setCommentsData({
          hasMore: props.manageComment.commentsData.hasMore,
          rows: newCommentsData.rows
        })
      } catch {}
    }
    props.manageComment.setLoadingComments(false)
  }

  const handleChange = event => {
    setEditInput(event.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault()
    api
      .put(
        `/comments/${props.id}`,
        { message: editInput },
        { headers: { Authorization: user.token } }
      )
      .then(_response => {
        setEditing(false)
      })
      .catch(error => {
        setMessage(
          `<p class="form-error"><b>Erreur:</b> ${error.response.data.message}</p>`
        )
      })
  }

  const editComment = () => {
    setEditing(true)
    setMessage('')
  }

  return (
    <div ref={ref} className='CommentCard col-24'>
      <div className='CommentCard__container'>
        <div className='row'>
          <Link href='/users/[name]' as={`/users/${props.user.name}`}>
            <img
              className='CommentCard__user-logo'
              src={API_URL + props.user.logo}
              alt={props.user.name}
            />
          </Link>
          <span className='CommentCard__message-info'>
            <Link href='/users/[name]' as={`/users/${props.user.name}`}>
              <a>{props.user.name}</a>
            </Link>
            &nbsp;-{' '}
            {date.format(
              new Date(props.createdAt),
              'DD/MM/YYYY à HH:mm',
              false
            )}
          </span>
        </div>
        <div className='row'>
          <div className='col-24'>
            {!isEditing
              ? (
                <>
                  <div className='CommentCard__message'>
                    <ReactMarkdown
                      source={editInput}
                      renderers={{ code: CodeBlock }}
                    />
                  </div>
                  {isAuth && user.name === props.user.name && (
                    <p
                      style={{
                        fontSize: '15px',
                        margin: '15px 0 0 0',
                        fontStyle: 'italic'
                      }}
                    >
                      <a onClick={deleteCommentById} href='#'>
                        supprimer
                      </a>
                    &nbsp;-&nbsp;
                      <a style={{ cursor: 'pointer' }} onClick={editComment}>
                        modifier
                      </a>
                    </p>
                  )}
                </>
                )
              : (
                <form onSubmit={handleSubmit}>
                  <div className='form-group FunctionComments__post-group'>
                    <label className='form-label' htmlFor='commentEdit'>
                      Modifier le commentaire :
                    </label>
                    <textarea
                      style={{ height: 'auto' }}
                      value={editInput}
                      onChange={handleChange}
                      name='commentEdit'
                      id='commentEdit'
                      className='form-control'
                      rows='5'
                      placeholder="Idée d'amélioration, avis, remarque, partage d'expérience personnel, ... (Markdown autorisé)"
                    />
                  </div>
                  <div className='form-group' style={{ marginTop: '0.7em' }}>
                    <button type='submit' className='btn btn-dark'>
                      Envoyer
                    </button>
                  </div>
                  <div className='text-center'>{htmlParser(message)}</div>
                </form>
                )}
          </div>
        </div>
      </div>
    </div>
  )
})

export default CommentCard
