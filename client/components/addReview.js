import React from 'react'

class AddReview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      content: '',
      stars: '1'
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit() {
    this.props.addReview({
      title: this.state.title,
      content: this.state.content,
      stars: this.state.stars
    })
    this.setState({
      title: '',
      content: '',
      stars: '1'
    })
  }

  render() {
    return (
      <div className="addReview">
        <input
          type="text"
          placeholder="Title"
          name="title"
          value={this.state.title}
          onChange={this.handleChange}
        />
        <textarea
          placeholder="Content"
          name="content"
          minLength="12"
          value={this.state.content}
          onChange={this.handleChange}
        />
        <input
          type="number"
          min="1"
          max="5"
          name="stars"
          value={this.state.stars}
          onChange={this.handleChange}
        />
        <button
          type="button"
          disabled={
            this.state.content.length < 12 || this.state.title.length === 0
          }
          onClick={this.handleSubmit}
        >
          Add Review
        </button>
      </div>
    )
  }
}

export default AddReview
