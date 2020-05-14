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
import UserService from '../store/services/UserService'
import RecipeService from '../store/services/RecipeService'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar, faTimes } from "@fortawesome/free-solid-svg-icons"

import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'
import LengthRenderer from '../Components/renderers/LengthRenderer'

export default class StarredRecipes extends React.Component {
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
      starredRecipes: null,
      userData: null,
      activeRecipe: undefined,
    }
    this.displayToastNotification = this.displayToastNotification.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.viewRecipeDetails = this.viewRecipeDetails.bind(this)
    this.unstar = this.unstar.bind(this)
    this.handleRecipeUnstar = this.handleRecipeUnstar.bind(this)
  }

  toggleModal() {
    this.setState({
      open: !this.state.open,
    });
  }

  displayToastNotification(type, message) {
    if (type === "error") toast.error(message)
    else if (type === "success") toast.success(message)
    else {
      console.error('Umm we cannot send that message')
    }
  }

  handleRecipeUnstar() {
    this.toggleModal()
    this.retrieveStarredRecipes()
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

  async retrieveStarredRecipes() {
    try {
      let starredRecipesResponse = await UserService.fetchUserData('starred-recipes')
      if (starredRecipesResponse.status === 200) {
        this.setState({
          starredRecipes: starredRecipesResponse.data,
        })
      }
    } catch (error) {
        toast.error(error.response.data.message)
      }
  }

  async retrieveUserDetails() {
    try {
      let userDetailsReponse = await UserService.fetchUserOverview()
      if (userDetailsReponse) {
        this.setState({
          userData: userDetailsReponse.data,
        })
      }
    } catch (error) {
        toast.error(error.response.data.message)
    }
  }

  async unstar() {
    const rowData = this.gridApi.getSelectedRows()
    // Get first row only
    const id = rowData[0]._id['$oid']
    try {
      let unStarRecipeResponse = await RecipeService.unStar(id)
      if (unStarRecipeResponse.status === 200) {
        toast.success("Recipe Unstarred")
        this.retrieveStarredRecipes()
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  componentDidMount() {
    this.retrieveStarredRecipes()
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
    return(
      <Container className='mt-3 ag-theme-balham w-100'
                 style={{
                  "height": 600
                 }}>
        <Button theme='danger' className='mb-2 mt-2' size='md' onClick={this.unstar}>Unstar
            <FontAwesomeIcon className='ml-1' icon={faStar} />
        </Button>
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
                           mode = 'unstar'
                           setUnstarRecipe={unstarRecipe => this.unstarRecipeChild = unstarRecipe}
                           onRecipesStarredTop={this.handleRecipeUnstar}
                           relayToast={this.displayToastNotification}/>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup className='float-left'>
                <Button theme='danger' className='ml-1' onClick={ () => { this.toggleModal() } }>
                  <FontAwesomeIcon className='ml-1' icon={faTimes} />
                </Button>
                <Button theme='secondary' className='ml-1' onClick={ () => this.unstarRecipeChild() }>
                  <FontAwesomeIcon className='ml-1' icon={faStar} />
                </Button>
              </ButtonGroup>
          </ModalFooter>
        </Modal>
        <AgGridReact
          columnDefs={this.state.columnsDefs}
          rowData={this.state.starredRecipes}
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
