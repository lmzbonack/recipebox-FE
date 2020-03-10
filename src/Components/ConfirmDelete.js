import React from 'react'

import { Button, ButtonGroup, Modal, ModalBody, ModalHeader, Form, FormInput, FormGroup, Container  } from 'shards-react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";


export default class ConfirmDelete extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
    };
    this.confirmDelete = this.confirmDelete.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
  }

  componentDidMount() {
    this.props.closeModal(this.toggleModal)
    this.props.openModal(this.toggleModal)
  }

  toggleModal() {
    this.setState({
      open: !this.state.open,
      activeIndex: '',
      activeValue: ''
    });
  }

  confirmDelete() {
    this.props.onDeleteConfirmation()
  }

  render() {
    const { open } = this.state
    return (
      <Modal className='w-25' open={open} toggle={this.toggleModal}>
        <Container className='mb-3'>
          <ModalHeader>{this.props.title}</ModalHeader>
          <ModalBody>
            <ButtonGroup className='float-left'>
              <Button className='w-20' theme='success' onClick={ () => { this.confirmDelete() } }>
                <FontAwesomeIcon className='ml-1' icon={faCheck} />
              </Button>
              <Button theme='danger' className='ml-1' onClick={ () => { this.toggleModal() } }>
                <FontAwesomeIcon className='ml-1' icon={faTimes} />
              </Button>
            </ButtonGroup>
          </ModalBody>
        </Container>
      </Modal>
    )
  }
}
