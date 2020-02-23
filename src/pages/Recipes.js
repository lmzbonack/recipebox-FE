import React from 'react';
import axios from 'axios'
import { navigate } from "@reach/router"
import { Container } from 'shards-react'

import utils from '../store/services/utils'
import RecipeCard from '../Components/RecipeCard'

class Recipes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      recipes: [],
    }
  }

  async componentDidMount() {
    let token = await utils.retrieveAuthToken()

    if (token === null){
      navigate('/login')
    } else {
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      let result = await axios.get(`${process.env.REACT_APP_API_URL}/recipes`, config)
      let holder = []
      result.data.forEach( item => {
        holder.push(item)
        this.setState({
          recipes: holder
        })
      })
    }
  }

  render() {
    return (
      <Container>
        <h2>Recipes</h2>
          { this.state.recipes.map( value => {
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

export default Recipes
