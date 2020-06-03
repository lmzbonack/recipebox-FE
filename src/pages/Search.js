import React from 'react'
import SearchAutoSuggest from '../Components/SearchAutoSuggest'
import { Container, Modal, ModalBody, ModalFooter } from 'shards-react'


export default class Search extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      temp: ''
    }
  }

  render(){
    const { open } = this.state
    return(
      <Container>
        <h2>Search</h2>
        <SearchAutoSuggest />
      </Container>
    )
  }
}
