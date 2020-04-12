import React from 'react'
import { Container, Modal, ModalBody, ModalHeader, ModalFooter } from 'shards-react'

import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'
import LengthRenderer from '../Components/renderers/LengthRenderer'

import RecipeContent from '../Components/RecipeContent'

import RecipeService from '../store/services/RecipeService';

export default class Recipes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
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
      recipes: null,
      activeRecipe: undefined,
      error: ''
    }
    this.toggleModal = this.toggleModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.viewRecipeDetails = this.viewRecipeDetails.bind(this)
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

  viewRecipeDetails(event) {
    this.setState({
      activeRecipe: event.data
    })
    this.toggleModal()
  }

  async retrieveRecipes() {
    try {
      let recipesResponse = await RecipeService.fetchAll()
      if (recipesResponse.status === 200) {
        this.setState({
          recipes: recipesResponse.data,
          error: ''
        })
      }
    } catch (error) {
      console.error(error)
      this.setState({
        error: error.recipes.data.message
      })
    }
  }

  async componentDidMount() {
    this.retrieveRecipes()
  }

  onGridReady = params => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  onFirstDataRendered = params => {
    params.api.sizeColumnsToFit();
  }

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
            <RecipeContent recipe={this.state.activeRecipe} />
          </ModalBody>
          <ModalFooter>
            <p>Placeholder</p>
          </ModalFooter>
        </Modal>
        <AgGridReact
          columnDefs={this.state.columnsDefs}
          rowData={this.state.recipes}
          rowSelection='single'
          onGridReady={this.onGridReady}
          onRowDoubleClicked={this.viewRecipeDetails}
          onFirstDataRendered={this.onFirstDataRendered.bind(this)}
          frameworkComponents={this.state.frameworkComponents}
        />
      </Container>
    )
  }
}
