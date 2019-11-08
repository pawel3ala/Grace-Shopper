import React from 'react'

class SingleReview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editMode: false,
      title: '',
      content: '',
      stars: ''
    }
    this.changeToEdit = this.changeToEdit.bind(this)
    this.changeToNoEdit = this.changeToNoEdit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  changeToEdit() {
    this.setState({
      editMode: true,
      title: this.props.review.title,
      content: this.props.review.content,
      stars: this.props.review.stars
    })
  }
  async changeToNoEdit() {
    await this.props.editReview({
      id: this.props.review.id,
      title: this.state.title,
      content: this.state.content,
      stars: this.state.stars
    })
    await this.props.fetchProduct(this.props.productId)
    this.setState({editMode: false})
  }
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  render() {
    return !this.state.editMode ? (
      <div>
        <div>{this.props.review.title}</div>
        <div>{this.props.review.content}</div>
        <div>{this.props.review.stars}</div>
        <button
          type="button"
          name={this.props.review.id}
          onClick={this.changeToEdit}
        >
          Edit Review
        </button>
      </div>
    ) : (
      <div>
        <input
          type="text"
          name="title"
          value={this.state.title}
          onChange={this.handleChange}
        />
        {this.state.title.length === 0 ? <div>Title needs an input</div> : null}
        <textarea
          type="text"
          name="content"
          value={this.state.content}
          onChange={this.handleChange}
        />
        {this.state.content.length < 12 ? (
          <div>Content needs to be more than 12 characters</div>
        ) : null //give user an idea on what is needed
        }
        <input
          type="number"
          name="stars"
          min="0"
          max="5"
          value={this.state.stars}
          onChange={this.handleChange}
        />
        {/*cant send a review with less than 12 characters or will fail sequelize validation*/}
        <button
          type="button"
          onClick={this.changeToNoEdit}
          disabled={
            this.state.content.length < 12 || this.state.title.length === 0
          }
        >
          Done
        </button>
      </div>
    )
  }
}

export default SingleReview
