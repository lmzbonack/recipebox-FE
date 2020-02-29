import React from 'react'

import UserService from '../store/services/UserService'
import { Container } from 'shards-react'

import SingleShoppingList from '../Components/SingleShoppingList'

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
      <Container className="mt-3">
        { this.state.shoppingList.map( value => {
          return (
            <SingleShoppingList key={value._id.$oid}
                                name={value.name}
                                ingredients={value.ingredients}/>
          )
          })}
      </Container>
    )
  }
}
