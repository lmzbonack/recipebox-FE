import React from 'react'
import axios from 'axios'
import { navigate } from "@reach/router"

import {
  Button,  
  Container, 
  Form, 
  FormInput, 
  FormGroup, 
} from 'shards-react'

export default class SignUp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      error: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  componentDidMount() {
    const listener = event => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        this.signUp()
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }

  async signUp() {
    const payload = {
      email: this.state.email,
      password: this.state.password
    }
    try {
      let signUpResponse = await axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, payload)
      if (signUpResponse.status === 201) {
        // Log them in to save them time
        let automaticSignIn = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, payload)
        if (signUpResponse.status === 201) {
          console.log(automaticSignIn.status)
          navigate('/recipes')
        }
      }
    } catch (error) {
      console.log(error)
      this.setState({
        email: '',
        password: '',
        error: error.response.data.message
      });
    }
  }

  render() { 
    return(
      <Container>
        <Form>
          <FormGroup>
            <label htmlFor="#email">Email</label>
            <FormInput name="email" placeholder="Email" value={this.state.email} onChange={this.handleInputChange}/>
          </FormGroup>
          <FormGroup>
            <label htmlFor="#password">Password</label>
            <FormInput name="password" type="password" placeholder="Password" value={this.state.password} onChange={this.handleInputChange} />
          </FormGroup>
        </Form>
        <Button outline
                theme="success"
                onClick={this.signUp}>Sign Up</Button>
        <p>{ this.state.error }</p>
      </Container>
    )
  }
}
