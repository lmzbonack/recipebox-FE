import React from 'react'

import { Button,
         Container,
         ButtonGroup,
         ListGroup,
         ListGroupItem } from "shards-react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"

import RecipeService from '../store/services/RecipeService'

import ConfirmDelete from './ConfirmDelete'

export default class ShoppingListRecipes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeId: '',
      activeName: '',
      recipes: []
    }
    this.fetchRecipeName = this.fetchRecipeName.bind(this)
    this.loadDeleteInfo = this.loadDeleteInfo.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  async componentDidMount() {
    let localRecipes = []
    for (let element of this.props.addedRecipes) {
      let item = {}
      item['name'] = await this.fetchRecipeName(element.$oid)
      item['id'] = element.$oid
      localRecipes.push(item)
    }
    this.setState({
      recipes: localRecipes
    })
  }

  async fetchRecipeName(id) {
    try {
      let recipeResponse = await RecipeService.fetchOne(id)
      if (recipeResponse.status === 200) {
        return recipeResponse.data.name
      }
    } catch(error) {
      this.props.relayToast("error", error.response.data.message)
    }
  }

  loadDeleteInfo(id, name) {
    this.setState({
      activeId: id,
      activeName: name
    })
  }

  handleDelete() {
    const payload = {
      "id": this.state.activeId,
      "name": this.state.activeName
    }
    this.props.relayToast("success", "Recipe removed")
    this.props.onRecipeDelete(payload)
    this.closeConfirmModal()
  }

  render() {
    return (
      <Container>
        <ListGroup>
          { this.state.recipes.map( (recipe, index) => (
            <ListGroupItem className="mt-1 mb-1" key={index}>
              { recipe.name }
              <ButtonGroup className='ml-2 float-right'>
                <Button theme='danger' className='ml-1' onClick={ () => { this.openConfirmModal(); this.loadDeleteInfo(recipe.id, recipe.name) } }>
                  <FontAwesomeIcon className='ml-1' icon={faTimes} />
                </Button>
              </ButtonGroup>
            </ListGroupItem>
          ))}
        </ListGroup>
        <ConfirmDelete title='Remove recipe from list?'
                      closeModal={close => this.closeConfirmModal = close}
                      openModal={open => this.openConfirmModal = open}
                      onDeleteConfirmation={this.handleDelete}/>
      </Container>
    )
  }
}
