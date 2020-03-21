import React from 'react'

import { Button, ButtonGroup, Container, Modal, ModalBody, ModalHeader, ModalFooter } from 'shards-react'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes, faPencilAlt } from "@fortawesome/free-solid-svg-icons"


import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'
import LengthRenderer from '../Components/renderers/LengthRenderer'

import UserService from '../store/services/UserService'
import RecipeForm from '../Components/forms/RecipeForm'


export default class CreatedRecipes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      activeRecipe: undefined,
      columnsDefs: [
        {headerName: 'Name', field: 'name', sortable: true, filter: true, resizable: true},
        {headerName: 'Author', field: 'author', sortable: true, filter: true, resizable: true},
        {headerName: '# of Ingredients', field: 'ingredients', sortable: true, filter: true, resizable: true, cellRenderer: 'lengthRenderer' },
        {headerName: '# of Instructions', field: 'instructions', sortable: true, filter: true, resizable: true, cellRenderer: 'lengthRenderer' },
        {headerName: 'Prep Time', field: 'prep_time', sortable: true, filter: true, resizable: true},
        {headerName: 'Cook Time', field: 'cook_time', sortable: true, filter: true, resizable: true},
      ],
      frameworkComponents: {
        lengthRenderer: LengthRenderer,
      },
      createdRecipes: null,
      error: ''
    }
    this.retrieveCreatedRecipes = this.retrieveCreatedRecipes.bind(this)
    this.editRecipe = this.editRecipe.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.handleRecipesChangeTop = this.handleRecipesChangeTop.bind(this)
  }

  async retrieveCreatedRecipes() {
    try {
      let createdRecipesResponse = await UserService.fetchUserData('created-recipes')
      if (createdRecipesResponse.status === 200) {
        this.setState({
          createdRecipes: createdRecipesResponse.data,
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

  handleRecipesChangeTop() {
    this.retrieveCreatedRecipes()
    this.toggleModal()
  }

  editRecipe(event) {
    this.setState({
      activeRecipe: event.data
    })
    this.toggleModal()
  }

  toggleModal() {
    this.setState({
      open: !this.state.open,
    });
  }

  closeModal(event) {
    this.setState({
      activeRecipe: undefined
    })
    this.toggleModal()
  }

  async componentDidMount() {
    await this.retrieveCreatedRecipes()
  }

  onGridReady = params => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  onFirstDataRendered = params => {
    params.api.sizeColumnsToFit();
  };

  render() {
    const { open } = this.state
    return (
      <Container className='mt-3 ag-theme-balham w-100'
                 style={{
                  "height": 600
                 }}>
        <Modal size="lg h-100"
               open={open}
               toggle={this.toggleModal}>
          <ModalHeader>Recipe Details</ModalHeader>
          <ModalBody style={{
              "overflowY": "auto",
              "height": "500px"
              }}>
            <RecipeForm recipe={this.state.activeRecipe}
                        setRecipeEdit={recipeEdit => this.recipeEditChild = recipeEdit}
                        onRecipesChangeTop={this.handleRecipesChangeTop}/>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup className='float-left'>
              <Button theme='secondary' className='ml-1' onClick={ () => this.recipeEditChild() }>
                <FontAwesomeIcon className='ml-1' icon={faPencilAlt} />
              </Button>
              <Button theme='danger' className='ml-1' onClick={ () => { this.toggleModal() } }>
                <FontAwesomeIcon className='ml-1' icon={faTimes} />
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </Modal>
        <AgGridReact
          columnDefs={this.state.columnsDefs}
          rowData={this.state.createdRecipes}
          rowSelection='single'
          onGridReady={this.onGridReady}
          onRowDoubleClicked={this.editRecipe}
          onFirstDataRendered={this.onFirstDataRendered.bind(this)}
          frameworkComponents={this.state.frameworkComponents}
        />
      </Container>
    )
  }
}
