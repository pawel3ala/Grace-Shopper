import React from 'react'
import {Grid, Form, Rating} from 'semantic-ui-react'

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
    this.cancelEdit = this.cancelEdit.bind(this)
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
  cancelEdit() {
    this.setState({editMode: false})
  }
  handleChange(event, data) {
    if (data) {
      //This is so we can grab the data from react ui star value for ratings
      this.setState({
        [data.name]: data.rating
      })
    } else this.setState({[event.target.name]: event.target.value})
  }

  render() {
    return !this.state.editMode ? (
      <Grid.Column width={4} textAlign="center">
        <Grid.Row>{this.props.review.title}</Grid.Row>
        <Grid.Row>{this.props.review.content}</Grid.Row>
        <Grid.Row>
          <Rating
            rating={this.props.review.stars}
            icon="star"
            maxRating={5}
            disabled="true"
          />
        </Grid.Row>
        {//only the authed user who wrote that specific review can edit it
        this.props.review.userId === this.props.userId ? (
          <button
            type="button"
            name={this.props.review.id}
            onClick={this.changeToEdit}
          >
            Edit Review
          </button>
        ) : null}
      </Grid.Column>
    ) : (
      <Grid.Row>
        <Form>
          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
          />
          {this.state.title.length === 0 ? (
            <div>Title needs an input</div>
          ) : null}
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
          <Rating
            rating={this.state.stars}
            icon="star"
            maxRating={5}
            onRate={
              this
                .handleChange /*uses onRate instead of onChange and passes event,data instead of just event */
            }
            name="stars"
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
          <button type="button" onClick={this.cancelEdit}>
            Cancel
          </button>
        </Form>
      </Grid.Row>
    )
  }
}

export default SingleReview
