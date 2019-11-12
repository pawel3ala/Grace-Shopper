import React from 'react'
import {Form} from 'semantic-ui-react'

class EditProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.name,
      price: this.props.price,
      quantity: this.props.quantity,
      description: this.props.description
    }
  }
  render() {
    console.log(this.state)
    return (
      <Form>
        <label>Product Name</label>
        <input placeholder="Product name" value={this.state.name} />

        <label>Price</label>
        <input type="number" value={this.state.price} />

        <label>Quantity</label>
        <input type="number" value={this.state.quantity} />

        <label>Description</label>
        <textarea placeholder="Description" value={this.state.description} />
      </Form>
    )
  }
}

export default EditProduct
