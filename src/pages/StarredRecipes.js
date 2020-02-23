import React from 'react'

import UserService from '../store/services/UserService'
import { Container } from 'shards-react'

import RecipeCard from '../Components/RecipeCard'

export default class StarredRecipes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      starredRecipes: [],
      error: ''
    }
  }

  async componentDidMount() {
    try {
      let starredRecipesResponse = await UserService.fetchUserData('starred-recipes')
      if (starredRecipesResponse.status === 200){
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

  render() {
    return(
      <Container>
        <h2>Starred Recipes</h2>
        { this.state.starredRecipes.map( value => {
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
