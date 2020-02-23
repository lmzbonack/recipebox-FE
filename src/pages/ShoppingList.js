import React from 'react'

import UserService from '../store/services/UserService'
import { Container } from 'shards-react'

import ShoppingListEntry from '../Components/ShoppingListEntry'

export default class ShoppingList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      shoppingList: [],
      error: ''
    }
  }

  async componentDidMount() {
    try {
      let shoppingListResponse = await UserService.fetchUserData('shopping-list')
      if (shoppingListResponse.status === 200){
        this.setState({
          shoppingList: shoppingListResponse.data,
          error: ''
        })
        console.log(this.state.shoppingList)
      }
    } catch (error) {
      console.error(error)
      this.setState({
        error: error.response.data.message
      })
    }
  }

  render() {
    return(
      <Container>
        <h2>Shopping List</h2>
        { this.state.shoppingList.map( value => {
          return (
            <ShoppingListEntry key={value._id.$oid}
                               name={value.name}
                               ingredients={value.ingredients}/>
          )
          })}
      </Container>
    )
  }
}
