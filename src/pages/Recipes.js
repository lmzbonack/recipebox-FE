import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Button,
         ButtonGroup,
         Container,
         Modal,
         ModalBody,
         ModalFooter } from 'shards-react'

import RecipeContent from '../Components/RecipeContent'
import DynamicModalHeader from '../Components/DynamicModalHeader'
import RecipeService from '../store/services/RecipeService'
import UserService from '../store/services/UserService'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes, faStar } from "@fortawesome/free-solid-svg-icons"

import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'
import LengthRenderer from '../Components/renderers/LengthRenderer'

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
      userData: null,
      activeRecipe: undefined,
      error: ''
    }
    this.toggleModal = this.toggleModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.viewRecipeDetails = this.viewRecipeDetails.bind(this)
    this.handleRecipeStar = this.handleRecipeStar.bind(this)
    this.displayToastNotification = this.displayToastNotification.bind(this)
  }

  displayToastNotification(type, message) {
    if (type === "error") toast.error(message)
    else if (type === "success") toast.success(message)
    else {
      console.error('Umm we cannot send that message')
    }
  }

  toggleModal() {
    this.setState({
      open: !this.state.open,
    });
  }

  handleRecipeStar() {
    this.toggleModal()
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

  async retrieveUserDetails() {
    try {
      let userDetailsReponse = await UserService.fetchUserOverview()
      if (userDetailsReponse) {
        this.setState({
          userData: userDetailsReponse.data,
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

  componentDidMount() {
    this.retrieveRecipes()
    this.retrieveUserDetails()
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
          <DynamicModalHeader recipe={this.state.activeRecipe}
                              userData={this.state.userData}/>
          <ModalBody style={{
              "overflowY": "auto",
              "height": "65vh"
              }}>
            <RecipeContent recipe={this.state.activeRecipe}
                           mode = 'star'
                           setStarRecipe={starRecipe => this.starRecipeChild = starRecipe}
                           onRecipesStarredTop={this.handleRecipeStar}
                           relayToast={this.displayToastNotification}/>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup className='float-left'>
                <Button theme='danger' className='ml-1' onClick={ () => { this.toggleModal() } }>
                  <FontAwesomeIcon className='ml-1' icon={faTimes} />
                </Button>
                <Button theme='secondary' className='ml-1' onClick={ () => this.starRecipeChild() }>
                  <FontAwesomeIcon className='ml-1' icon={faStar} />
                </Button>
              </ButtonGroup>
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
        <ToastContainer/>
      </Container>
    )
  }
}
