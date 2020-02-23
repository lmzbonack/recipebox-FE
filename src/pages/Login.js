import React from 'react'
import { navigate } from "@reach/router"

import UserService from '../store/services/UserService'

import {
  Button,
  Container,
  Form,
  FormInput,
  FormGroup,
} from 'shards-react'

export default class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      error: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.login = this.login.bind(this);
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
        this.login()
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }

  async login() {
    const now = new Date()
    const payload = {
      email: this.state.email,
      password: this.state.password
    }
    try {
      let loginResponse = await UserService.login(payload)
      if (loginResponse.status === 201) {
        const localStoragePayload = {
          token: loginResponse.data.token,
          expiry: now.getTime() + 1000*60*60*24
        }
        localStorage.setItem('authToken', JSON.stringify(localStoragePayload))
        navigate('/recipes')
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
                onClick={this.login}>Login</Button>
        <p>{ this.state.error }</p>
      </Container>
    )
  }
}
