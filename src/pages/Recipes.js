import React from 'react';
import axios from 'axios'
import { navigate } from "@reach/router"

import RecipeCard from '../Components/RecipeCard'

class Recipes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      recipes: [],
    }
  }

  retrieveAuthToken() {
    const itemStr = localStorage.getItem('authToken')
    // if the item doesn't exist, return null
    if (!itemStr) {
      return null
    }

    const item = JSON.parse(itemStr)
    const now = new Date()

    // compare the expiry time of the item with the current time
    if (now.getTime() > item.expiry) {
      // If the item is expired, delete the item from storage
      // and return null
      localStorage.removeItem('authToken')
      return null
    }
    return item.token
  }

  async componentDidMount() {
    let token = await this.retrieveAuthToken()
    
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
      <div>
        <h2>Recipes</h2>
          { this.state.recipes.map( (value, index) => {
              return <RecipeCard key={value._id.$oid}
                                 name={value.name}
                                 author={value.author}
                                 ingredients={value.ingredients}
                                 instructions={value.instructions}
               /> 
            })}
      </div>
    )
  }
}

export default Recipes