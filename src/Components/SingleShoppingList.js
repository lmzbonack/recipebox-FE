// Component to render list of items in a single cart
import React from 'react'
import {
  Container,
  Button,
  Collapse,
  InputGroup,
  FormInput,
  FormGroup} from 'shards-react'
import { faArrowDown, faArrowUp, faTimes, faPencilAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ConfirmDelete from './ConfirmDelete'
import ShoppingListItems from './ShoppingListItems'

import ShoppingListService from '../store/services/ShoppingListService'


export default class SingleShoppingList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      collapse: false,
      name: '',
      newIngredient: '',
      error: ''
    }
    this.toggle = this.toggle.bind(this)
    this.handleIngredientDelete = this.handleIngredientDelete.bind(this)
    this.handleIngredientUpdate = this.handleIngredientUpdate.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.updateName = this.updateName.bind(this)
    this.deleteShoppingList = this.deleteShoppingList.bind(this)
    this.addIngredient = this.addIngredient.bind(this)
  }

  componentDidMount() {
    this.setState( (state, props) => ({
      collapse: this.state.collapse,
      name: this.props.name,
      newIngredient: ''
    }))
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse })
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  async addIngredient() {
    let newIngredients = this.props.ingredients
    if (this.state.newIngredient.length === 0) {
      this.setState({
        error: 'Cannot add blank ingredient'
      })
      return
    }
    newIngredients.unshift(this.state.newIngredient)
    const requestPayload = {
      name: this.props.name,
      ingredients: newIngredients
    }
    try {
      let addIngredientResponse = await ShoppingListService.update(this.props.id, requestPayload)
      if (addIngredientResponse.status === 200) {
        const payload = {
          id: this.props.id
        }
        this.props.onIngredientChangeTop(payload)
        this.setState({
          newIngredient: ''
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  async updateName(name) {
    const requestPayload = {
      name: name,
      ingredients: this.props.ingredients
    }
    try {
      let updateNameResponse = await ShoppingListService.update(this.props.id, requestPayload)
      if (updateNameResponse.status === 200) {
        const payload = {
          id: this.props.id
        }
        this.props.onIngredientChangeTop(payload)
      }
    } catch (error) {
      // Handle that error elegantly and pop it into state
      console.error(error)
    }
  }

  async deleteShoppingList() {
    try {
      let deleteRecipeResponse = await ShoppingListService.delete(this.props.id)
      if (deleteRecipeResponse.status === 204) {
        const payload = {
          id: this.props.id
        }
        this.props.onIngredientChangeTop(payload)
      }
    } catch (error) {
      // Handle that error elegantly and pop it into state
      console.error(error)
    }
  }

  async handleIngredientDelete(index) {
    // Make changes using API
    let changedIngredients = this.props.ingredients
    changedIngredients.splice(index, 1)

    const requestPayload = {
      name: this.props.name,
      ingredients: changedIngredients
    }
    try {
      let deleteIngredientResponse = await ShoppingListService.update(this.props.id, requestPayload)
      if (deleteIngredientResponse.status === 200) {
        const payload = {
          index: index,
          id: this.props.id
        }
        this.props.onIngredientChangeTop(payload)
      }
    } catch (error) {
      // Handle that error elegantly and pop it into state
      console.error(error)
    }
  }

  async handleIngredientUpdate(payload) {
    let changedIngredients = this.props.ingredients
    changedIngredients[payload.index] = payload.newItem

    const requestPayload = {
      name: this.props.name,
      ingredients: changedIngredients
    }
    try {
      let updateIngredientResponse = await ShoppingListService.update(this.props.id, requestPayload)
      if (updateIngredientResponse.status === 200) {
        this.closeChildModal()
        const parentsPayload = {
          id: this.props.id
        }
        this.props.onIngredientChangeTop(parentsPayload)
      }
    } catch (error) {
      // Handle that error elegantly and pop it into state
      console.error(error)
    }
  }

  render() {
    return (
      <Container>
        <ConfirmDelete title='Delete List?'
                       closeModal={close => this.closeConfirmModal = close}
                       openModal={open => this.openConfirmModal = open}
                       onDeleteConfirmation={this.deleteShoppingList}/>
        <Button className='mb-2' outline onClick={this.toggle}>{ this.props.name }
          <FontAwesomeIcon className='ml-1' icon = { this.state.collapse ? faArrowUp : faArrowDown } />
        </Button>
        { this.state.collapse &&
          <FormGroup>
            <InputGroup className='w-50 mb-2'>
              <FormInput name='name' value={this.state.name} onChange={this.handleInputChange}/>
              <Button className='ml-1' theme="secondary" onClick={ () => { this.updateName(this.state.name) } }>
                <FontAwesomeIcon className='ml-1' icon={faPencilAlt} />
              </Button>
              <Button className='ml-1' theme="danger" onClick={ () => { this.openConfirmModal() } }>
                <FontAwesomeIcon className='ml-1' icon={faTimes} />
              </Button>
            </InputGroup>
            <InputGroup className='w-50'>
              <FormInput placeholder= 'add ingredient' name='newIngredient' value={this.state.newIngredient} onChange={this.handleInputChange}/>
              <Button className='ml-1' theme="success" onClick={ () => { this.addIngredient() } }>
                <FontAwesomeIcon className='ml-1' icon={faPlus} />
              </Button>
            </InputGroup>
            <p>{ this.state.error }</p>
          </FormGroup>
        }
        <Collapse open={ this.state.collapse }>
          <ShoppingListItems ingredients={this.props.ingredients}
                             onIngredientDelete={this.handleIngredientDelete}
                             onIngredientUpdate={this.handleIngredientUpdate}
                             closeModal={close => this.closeChildModal = close}/>
        </Collapse>
      </Container>
    )
  }
}
