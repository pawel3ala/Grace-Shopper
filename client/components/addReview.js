import React, {useState} from 'react'

const AddReview = ({addReview}) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [stars, setStars] = useState(1)

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
        setStars(value)
        break
      default:
        throw new Error('Event target not valid')
    }
  }

  const handleSubmit = () => {
    addReview({
      title,
      content,
      stars
    })
    setTitle('')
    setContent('')
    setStars(1)
  }

  return (
    <div className="addReview">
      <input
        type="text"
        placeholder="Title"
        name="title"
        value={title}
        onChange={handleChange}
      />
      <textarea
        placeholder="Content"
        name="content"
        minLength="12"
        value={content}
        onChange={handleChange}
      />
      <input
        type="number"
        min="1"
        max="5"
        name="stars"
        value={stars}
        onChange={handleChange}
      />
      <button
        type="button"
        disabled={
          content.length < 12 || title.length === 0 || stars < 0 || stars > 5
        }
        onClick={handleSubmit}
      >
        Add Review
      </button>
    </div>
  )
}

export default AddReview
