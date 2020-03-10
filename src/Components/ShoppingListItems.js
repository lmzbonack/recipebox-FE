import React from 'react'

import { ListGroup, ListGroupItem, Container } from "shards-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { Button, ButtonGroup, Modal, ModalBody, ModalHeader, Form, FormInput, FormGroup  } from 'shards-react'

import ConfirmDelete from './ConfirmDelete'

export default class ShoppingListItems extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      activeIndex: '',
      activeValue: '',
    };
    this.toggleModal = this.toggleModal.bind(this)
    this.openModal = this.openModal.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.loadDeleteIndex = this.loadDeleteIndex.bind(this)
  }

  componentDidMount() {
    this.props.closeModal(this.toggleModal)
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  toggleModal() {
    this.setState({
      open: !this.state.open,
      activeIndex: '',
      activeValue: ''
    });
  }

  openModal(index, value){
    this.setState({
      open: !this.state.open,
      activeIndex: index,
      activeValue: value
    });
  }

  loadDeleteIndex(index) {
    this.setState({
      activeIndex: index
    })
  }

  handleDelete() {
    const index = this.state.activeIndex
    this.props.onIngredientDelete(index)
    this.closeConfirmModal()
  }

  handleUpdate() {
    const payload = {
      index: this.state.activeIndex,
      newItem: this.state.activeValue
    }
    this.props.onIngredientUpdate(payload)
  }

  render() {
    const { open } = this.state
    return (
      <Container>
        <ListGroup>
          { this.props.ingredients.map( (ingredient, index) => (
            <ListGroupItem className="mt-1 mb-1" key={index}>
              { ingredient }
              <ButtonGroup className='ml-2 float-right'>
                <Button theme='secondary' onClick={ () => { this.openModal(index, ingredient) } }>
                  <FontAwesomeIcon className='ml-1' icon={faPencilAlt} />
                </Button>
                <Button theme='danger' className='ml-1' onClick={ () => { this.openConfirmModal(); this.loadDeleteIndex(index); } }>
                  <FontAwesomeIcon className='ml-1' icon={faTimes} />
                </Button>
              </ButtonGroup>
            </ListGroupItem>
          ))}
        </ListGroup>
        <ConfirmDelete title='Delete Ingredient?'
                       closeModal={close => this.closeConfirmModal = close}
                       openModal={open => this.openConfirmModal = open}
                       onDeleteConfirmation={this.handleDelete}/>

        <Modal open={open} toggle={this.toggleModal}>
            <ModalHeader>Edit Ingredient</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <label htmlFor="#activeValue">Ingredient</label>
                <FormInput name="activeValue"  value={this.state.activeValue} onChange={this.handleInputChange}/>
              </FormGroup>
              <ButtonGroup className='float-right'>
                <Button className='w-20' theme='secondary' onClick={ () => { this.handleUpdate() } }>
                  <FontAwesomeIcon className='ml-1' icon={faPencilAlt} />
                </Button>
                <Button theme='danger' className='ml-1' onClick={ () => { this.toggleModal() } }>
                  <FontAwesomeIcon className='ml-1' icon={faTimes} />
                </Button>
              </ButtonGroup>
            </Form>
          </ModalBody>
        </Modal>
      </Container>
    )
  }
}