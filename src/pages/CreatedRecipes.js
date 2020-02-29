import React from 'react'

import UserService from '../store/services/UserService'
import { Container } from 'shards-react'

import RecipeCard from '../Components/RecipeCard'

export default class CreatedRecipes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      createdRecipes: [],
      error: ''
    }
  }

  async componentDidMount() {
    try {
      let createdRecipesResponse = await UserService.fetchUserData('created-recipes')
      if (createdRecipesResponse.status === 200) {
        this.setState({
          createdRecipes: createdRecipesResponse.data,
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

  render() {
    return(
      <Container>
        <h2>Created Recipes</h2>
        { this.state.createdRecipes.map( value => {
              return <RecipeCard key={value._id.$oid}
                                 name={value.name}
                                 author={value.author}
                                 ingredients={value.ingredients}
                                 instructions={value.instructions}
               />
            })}
      </Container>
    )
  }
}
