import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Button,
         ButtonGroup,
         Container,
         Modal,
         ModalBody,
         ModalHeader,
         ModalFooter } from 'shards-react'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes, faPencilAlt, faPlus } from "@fortawesome/free-solid-svg-icons"

import ShoppingListForm from '../Components/forms/ShoppingListForm'
import UserService from '../store/services/UserService'
import SingleShoppingList from '../Components/SingleShoppingList'

export default class ShoppingList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      shoppingLists: [],
    }
    this.handleIngredientChangeTop = this.handleIngredientChangeTop.bind(this)
    this.handleShoppingListChangeCreate = this.handleShoppingListChangeCreate.bind(this)
    this.displayToastNotification = this.displayToastNotification.bind(this)
    this.toggleRecipeModal = this.toggleRecipeModal.bind(this)
  }

  componentDidMount() {
     this.retrieveShoppingLists()
  }

  handleIngredientChangeTop(payload) {
    // For now this is fine eventually we will want to just fetch and pass into state the one list that changes
    // const updatedList= await ShoppingListService.fetchOne(payload.id)
    this.retrieveShoppingLists()
  }

  handleShoppingListChangeCreate(payload) {
    this.toggleRecipeModal()
    this.retrieveShoppingLists()
  }

  toggleRecipeModal() {
    this.setState({
      open: !this.state.open,
    })
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
    const { open } = this.state
    return(
      <Container className="mt-3">
        <Button className='ml-3 mb-2 mt-2' size='md' onClick={this.toggleRecipeModal}>Add
            <FontAwesomeIcon className='ml-1' icon={faPlus} />
        </Button>
        { this.state.shoppingLists.map( value => {
          return (
            <SingleShoppingList key={value._id.$oid}
                                id={value._id.$oid}
                                name={value.name}
                                ingredients={value.ingredients}
                                addedRecipes={value.added_recipes}
                                onIngredientChangeTop={this.handleIngredientChangeTop}
                                relayToast={this.displayToastNotification}/>
          )
          })}
        <ToastContainer/>
          <Modal size="lg"
                 open={open}
                 toggle={this.toggleRecipeModal}>
          <ModalHeader>New Shopping List</ModalHeader>
          <ModalBody style={{
              "overflowY": "auto",
              "height": "25vh"
              }}>
            <ShoppingListForm setCreateShoppingList={createShoppingList => this.createShoppingListChild = createShoppingList}
                              onShoppingListChangeTop={this.handleShoppingListChangeCreate}
                              relayToast={this.displayToastNotification}/>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup className='float-left'>
              <Button theme='warning' className='ml-1' onClick={ () => { this.toggleRecipeModal() } }>
                <FontAwesomeIcon className='ml-1' icon={faTimes} />
              </Button>
              <Button theme='secondary' className='ml-1' onClick={ () => this.createShoppingListChild() }>
                <FontAwesomeIcon className='ml-1' icon={faPencilAlt} />
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </Modal>
      </Container>
    )
  }
}
