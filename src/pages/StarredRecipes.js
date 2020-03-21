import React from 'react'

import UserService from '../store/services/UserService'
import { Container } from 'shards-react'

import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'
import LengthRenderer from '../Components/renderers/LengthRenderer'

export default class StarredRecipes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
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
      starredRecipes: null,
      error: ''
    }
    this.retrieveStarredRecipes = this.retrieveStarredRecipes.bind(this)
  }

  async retrieveStarredRecipes() {
    try {
      let starredRecipesResponse = await UserService.fetchUserData('starred-recipes')
      if (starredRecipesResponse.status === 200) {
        this.setState({
          starredRecipes: starredRecipesResponse.data,
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

  async componentDidMount() {
    await this.retrieveStarredRecipes()
  }

  onGridReady = params => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  onFirstDataRendered = params => {
    params.api.sizeColumnsToFit();
  };

  render() {
    return(
      <Container className='mt-3 ag-theme-balham w-100'
                 style={{
                  "height": 600
                 }}>
        <AgGridReact
          columnDefs={this.state.columnsDefs}
          rowData={this.state.starredRecipes}
          rowSelection='single'
          onGridReady={this.onGridReady}
          onFirstDataRendered={this.onFirstDataRendered.bind(this)}
          frameworkComponents={this.state.frameworkComponents}
        />
      </Container>
    )
  }
}
