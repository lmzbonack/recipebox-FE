import React from 'react'

import { Button,
         ButtonGroup,
         Container,
         Modal,
         ModalBody,
         ModalHeader,
         ModalFooter } from 'shards-react'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes, faPencilAlt, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"


import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'

import UserService from '../store/services/UserService'
import ScrapingManifestForm from '../Components/forms/ScrapingManifestForm'



export default class ScrapingManifests extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeManifest: {
        domain: null
      },
      editModalOpen: false,
      newModalOpen: false,
      columnsDefs: [
        {headerName: 'Domain', field: 'domain', sortable: true, filter: true, resizable: true},
      ],
      createdManifests: null,
      error: ''
    }
    this.toggleNewModal = this.toggleNewModal.bind(this)
    this.toggleEditModal = this.toggleEditModal.bind(this)
    this.viewSmanifestDetails = this.viewSmanifestDetails.bind(this)
    this.retrieveCreatedManifests = this.retrieveCreatedManifests.bind(this)
    this.handleSmanifestChangeCreate = this.handleSmanifestChangeCreate.bind(this)
    this.handleSmanifestChangeEdit = this.handleSmanifestChangeEdit.bind(this)
  }

  async componentDidMount() {
    await this.retrieveCreatedManifests()
  }

  async retrieveCreatedManifests() {
    try {
      let createdManifestsResponse = await UserService.fetchUserData('created-manifests')
      if (createdManifestsResponse.status === 200) {
        // console.log(createdManifestsResponse.data)
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

  viewSmanifestDetails(event) {
    this.setState({
      activeManifest: event.data
    })
    this.toggleEditModal()
  }

  toggleNewModal() {
    this.setState({
      newModalOpen: !this.state.newModalOpen,
    })
  }

  toggleEditModal() {
    this.setState({
      editModalOpen: !this.state.editModalOpen,
    })
  }

  onGridReady = params => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  onFirstDataRendered = params => {
    params.api.sizeColumnsToFit();
  }

  handleSmanifestChangeCreate() {
    this.retrieveCreatedManifests()
    this.toggleNewModal()
  }

  handleSmanifestChangeEdit() {
    this.retrieveCreatedManifests()
    this.toggleEditModal()
  }

  render() {
    const { editModalOpen, newModalOpen } = this.state
    return(
      <Container className='mt-3 ag-theme-balham w-100'
                 style={{
                  "height": 600
                 }}>
        <Button className='mb-2 mt-2' size='md' onClick={this.toggleNewModal}>Add
            <FontAwesomeIcon className='ml-1' icon={faPlus} />
        </Button>

        {/* New Modal */}
        <Modal size="lg"
               open={newModalOpen}
               toggle={this.toggleNewModal}>
          <ModalHeader>New Scraping Manifest</ModalHeader>
          <ModalBody style={{
              "overflowY": "auto",
              "height": "65vh"
              }}>
            <ScrapingManifestForm mode='create'
                                  setCreateSmanifest={createSmanifest => this.createSmanifestChild = createSmanifest}
                                  onSmanifestChangeTop={this.handleSmanifestChangeCreate}/>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup className='float-left'>
              <Button theme='danger' className='ml-1' onClick={ () => { this.toggleNewModal() } }>
                <FontAwesomeIcon className='ml-1' icon={faTimes} />
              </Button>
              <Button theme='secondary' className='ml-1' onClick={ () => this.createSmanifestChild() }>
                <FontAwesomeIcon className='ml-1' icon={faPencilAlt} />
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </Modal>

        {/* Edit Modal */}
        <Modal size="lg"
               open={editModalOpen}
               toggle={this.toggleEditModal}>
          <ModalHeader>{this.state.activeManifest.domain || ''} Manifest</ModalHeader>
          <ModalBody style={{
              "overflowY": "auto",
              "height": "65vh"
              }}>
            <ScrapingManifestForm mode='edit'
                                  smanifest={this.state.activeManifest}
                                  setEditSmanifest={editSmanifest => this.editSmanifestChild = editSmanifest}
                                  setDeleteSmanifest={deleteSmanifest => this.deleteSmanifestChild = deleteSmanifest}
                                  onSmanifestChangeTop={this.handleSmanifestChangeEdit}/>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup className='float-left'>
              <Button theme='danger' className='ml-1' onClick={ () => { this.deleteSmanifestChild() } }>
                <FontAwesomeIcon className='ml-1' icon={faTrash} />
              </Button>
              <Button theme='warning' className='ml-1' onClick={ () => { this.toggleEditModal() } }>
                <FontAwesomeIcon className='ml-1' icon={faTimes} />
              </Button>
              <Button theme='secondary' className='ml-1' onClick={ () => { this.editSmanifestChild() } }>
                <FontAwesomeIcon className='ml-1' icon={faPencilAlt} />
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </Modal>

        <AgGridReact
          columnDefs={this.state.columnsDefs}
          rowData={this.state.createdManifests}
          rowSelection='single'
          onGridReady={this.onGridReady}
          onRowDoubleClicked={this.viewSmanifestDetails}
          onFirstDataRendered={this.onFirstDataRendered.bind(this)}
          frameworkComponents={this.state.frameworkComponents}
        />
      </Container>
    )
  }

}
