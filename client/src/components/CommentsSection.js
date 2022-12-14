import axios from 'axios'
import { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { getToken, isAuthenticated } from '../helpers/auth'
import { unixTimestamp } from '../helpers/general'
import Comment from './Comment'
import CommentForm from './CommentForm'

const CommentsSection = ({ item, model, itemId, setRefresh, refresh ,setShow }) => {
  const [commentError, setCommentError] = useState(false)
  const [toEdit, setToEdit] = useState(false)
  const [commentFields, setCommentFields] = useState({
    text: '',
    [model.slice(0, -1)]: [itemId][0],
  })

  //submit brand new comment
  async function handleCommentSubmit(e) {
    try {
      e.preventDefault()
      if (!isAuthenticated()) return setShow(true)
      if (commentFields.text.length > 300) throw new Error('Character limit exceeded')
      console.log(commentFields)
      const { data } = await axios.post('/api/comments/', commentFields, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      console.log(data)
      setRefresh(!refresh)
      setCommentFields({ ...commentFields, text: '' })
    } catch (err) {
      setCommentError(err.message ? err.message : err.response.data.message)
    }
  }


  return (
    <Row className='my-4 mb-5 pb-5'>
      <Col style={{ maxWidth: '800px', margin: '0 auto' }} className="px-1">
        <CommentForm commentFields={commentFields} setCommentFields={setCommentFields} commentError={commentError} setCommentError={setCommentError} handleCommentSubmit={handleCommentSubmit}  />
        {item && item.comments && item.comments.sort((a, b) => (unixTimestamp(a.created_at) > unixTimestamp(b.created_at) ? -1 : 1)).map(comment => {
          const { id: commentId } = comment
          return (
            <Comment key={commentId} commentId={commentId} comment={comment} setRefresh={setRefresh} refresh={refresh} />
          )
        })}
        
      </Col>
    </Row>
  )
}
export default CommentsSection