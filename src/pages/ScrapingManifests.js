import React from 'react'

import UserService from '../store/services/UserService'
import { Container } from 'shards-react'

import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'

export default class ScrapingManifests extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeManifest: undefined,
      columnsDefs: [
        {headerName: 'Domain', field: 'domain', sortable: true, filter: true, resizable: true},
      ],
      createdManifests: null,
      error: ''
    }
    this.retrieveCreatedManifests = this.retrieveCreatedManifests.bind(this)
  }

  async retrieveCreatedManifests() {
    try {
      let createdManifestsResponse = await UserService.fetchUserData('created-manifests')
      if (createdManifestsResponse.status === 200) {
        this.setState({
          createdManifests: createdManifestsResponse.data,
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
    await this.retrieveCreatedManifests()
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
          rowData={this.state.createdManifests}
          rowSelection='single'
          onGridReady={this.onGridReady}
          onFirstDataRendered={this.onFirstDataRendered.bind(this)}
          frameworkComponents={this.state.frameworkComponents}
        />
      </Container>
    )
  }

}
