import React from 'react'

import UserService from '../store/services/UserService'
// import ShoppingListService from '../store/services/ShoppingListService'
import { Container } from 'shards-react'

import SingleShoppingList from '../Components/SingleShoppingList'

export default class ShoppingList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      shoppingLists: [],
      error: ''
    }
    this.handleIngredientChangeTop = this.handleIngredientChangeTop.bind(this)
  }

  componentDidMount() {
     this.retrieveShoppingLists()
  }

  handleIngredientChangeTop(payload) {
    // For now this is fine eventually we will want to just fetch and pass into state the one list that changes
    // const updatedList= await ShoppingListService.fetchOne(payload.id)
    console.log(this.state)
    this.retrieveShoppingLists()
  }

  async retrieveShoppingLists() {
    try {
      let shoppingListResponse = await UserService.fetchUserData('shopping-list')
      if (shoppingListResponse.status === 200) {
        this.setState({
          shoppingLists: shoppingListResponse.data,
          error: ''
        })
      }
    } catch (error) {
      if (error.response) {
        this.setState({
          error: error.response.data.message
        })
      } else {
        console.error(error)
      }
    }
  }

  render() {
    return(
      <Container className="mt-3">
        { this.state.shoppingLists.map( value => {
          return (
            <SingleShoppingList key={value._id.$oid}
                                id={value._id.$oid}
                                name={value.name}
                                ingredients={value.ingredients}
                                onIngredientChangeTop={this.handleIngredientChangeTop}/>
          )
          })}
      </Container>
    )
  }
}
