import React from 'react'
import {Grid, Rating, Form, Input, Label, TextArea} from 'semantic-ui-react'

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

  handleChange(event, data) {
    if (data) {
      //This is so we can grab the data from react ui star value for ratings
      this.setState({
        [data.name]: data.rating
      })
    } else
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
      <Grid.Row>
        <Form>
          <input
            type="text"
            placeholder="What's most important to know?"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
          />
          <textarea
            placeholder="Write your review!"
            name="content"
            minLength="12"
            value={this.state.content}
            onChange={this.handleChange}
          />
          <Rating
            rating={this.state.stars}
            icon="star"
            maxRating={5}
            onRate={this.handleChange}
            name="stars"
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
        </Form>
      </Grid.Row>
    )
  }
}

export default AddReview
