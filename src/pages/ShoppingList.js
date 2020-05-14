import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Container } from 'shards-react'

import UserService from '../store/services/UserService'
import SingleShoppingList from '../Components/SingleShoppingList'

export default class ShoppingList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      shoppingLists: [],
    }
    this.handleIngredientChangeTop = this.handleIngredientChangeTop.bind(this)
    this.displayToastNotification = this.displayToastNotification.bind(this)
  }

  componentDidMount() {
     this.retrieveShoppingLists()
  }

  handleIngredientChangeTop(payload) {
    // For now this is fine eventually we will want to just fetch and pass into state the one list that changes
    // const updatedList= await ShoppingListService.fetchOne(payload.id)
    this.retrieveShoppingLists()
  }

  displayToastNotification(type, message) {
    if (type === "error") toast.error(message)
    else if (type === "success") toast.success(message)
    else {
      console.error('Umm we cannot send that message')
    }
  }

  async retrieveShoppingLists() {
    try {
      let shoppingListResponse = await UserService.fetchUserData('shopping-list')
      if (shoppingListResponse.status === 200) {
        this.setState({
          shoppingLists: shoppingListResponse.data,
        })
      }
    } catch (error) {
        toast.error(error.response.data.message)
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
                                onIngredientChangeTop={this.handleIngredientChangeTop}
                                relayToast={this.displayToastNotification}/>
          )
          })}
        <ToastContainer/>
      </Container>
    )
  }
}
