// Component to render list of items in a single cart
import React from 'react'
import { Container, Button, Collapse } from 'shards-react'

import ShoppingListItems from './ShoppingListItems'

export default class SingleShoppingList extends React.Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.state = {
      collapse: false
    }
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse })
  }

  render () {
    return (
      <Container>
        <h4>{ this.props.name }</h4>
        <Button onClick={this.toggle}>Expand</Button>
        <Collapse open={ this.state.collapse }>
          <ShoppingListItems ingredients={this.props.ingredients}/>
        </Collapse>
      </Container>
    )
  }
}
