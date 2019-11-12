import React from 'react'
import {Form, Button} from 'semantic-ui-react'

class EditProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.productId,
      name: this.props.name,
      price: this.props.price,
      quantity: this.props.quantity,
      description: this.props.description,
      image: this.props.image
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.editProduct(this.state)
    this.props.changeEditProductMode()
  }

  render() {
    return (
      <Form>
        <label>Product Name</label>
        <input
          placeholder="Product name"
          value={this.state.name}
          name="name"
          onChange={this.handleChange}
        />

        <label>Price</label>
        <input
          type="number"
          value={this.state.price}
          name="price"
          onChange={this.handleChange}
        />

        <label>Quantity</label>
        <input
          type="number"
          value={this.state.quantity}
          name="quantity"
          onChange={this.handleChange}
        />

        <label>Description</label>
        <textarea
          placeholder="Description"
          value={this.state.description}
          name="description"
          onChange={this.handleChange}
        />

        <label>Image Url</label>
        <input
          type="text"
          placeholder="Image Url"
          value={this.state.image}
          name="image"
          onChange={this.handleChange}
        />
        <Button
          type="button"
          color="blue"
          style={{marginTop: '1em'}}
          onClick={this.handleSubmit}
        >
          Submit Changes
        </Button>
      </Form>
    )
  }
}

export default EditProduct
