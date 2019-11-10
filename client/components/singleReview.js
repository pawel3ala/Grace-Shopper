import React, {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {editReview} from '../store/singleProduct'

const SingleReview = ({review, userId, productId}) => {
  const [editMode, setEditMode] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [stars, setStars] = useState(0)
  const dispatch = useDispatch()

  useEffect(() => {
    setTitle(review.title)
    setContent(review.content)
    setStars(review.stars)
  }, [])

  const changeToEdit = () => {
    setEditMode(true)
  }

  const changeToNoEdit = () => {
    dispatch(
      editReview(
        {
          id: review.id,
          title,
          content,
          stars
        },
        productId
      )
    )
    setEditMode(false)
  }
  const handleChange = event => {
    const {target: {name, value}} = event
    switch (name) {
      case 'title':
        setTitle(value)
        break
      case 'content':
        setContent(value)
        break
      case 'stars':
        setStars(+value)
        break
      default:
        throw new Error('Event target not valid')
    }
  }

  return !editMode ? (
    <div>
      <div>{review.title}</div>
      <div>{review.content}</div>
      <div>{review.stars}</div>
      {//only the authed user who wrote that specific review can edit it
      review.userId === userId ? (
        <button type="button" name={review.id} onClick={changeToEdit}>
          Edit Review
        </button>
      ) : null}
    </div>
  ) : (
    <div>
      <input type="text" name="title" value={title} onChange={handleChange} />
      {title.length === 0 ? <div>Title needs an input</div> : null}
      <textarea
        type="text"
        name="content"
        value={content}
        onChange={handleChange}
      />
      {content.length < 12 ? (
        <div>Content needs to be more than 12 characters</div>
      ) : null //give user an idea on what is needed
      }
      <input
        type="number"
        name="stars"
        min={0}
        max={5}
        value={stars}
        onChange={handleChange}
      />
      {/*cant send a review with less than 12 characters or will fail sequelize validation*/}
      <button
        type="button"
        onClick={changeToNoEdit}
        disabled={
          content.length < 12 || title.length === 0 || stars < 0 || stars > 5
        }
      >
        Done
      </button>
    </div>
  )
}

export default SingleReview
