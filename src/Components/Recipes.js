import React from 'react';
import axios from 'axios'

import RecipeCard from './RecipeCard'

class Recipes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      recipes: [],
      token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1ODE5MTQ4NjUsIm5iZiI6MTU4MTkxNDg2NSwianRpIjoiMTE3MzhhNDctNjVjZC00NjFhLTk5YjMtOTNlYzJlNmFmZjNmIiwiZXhwIjoxNTgyMDAxMjY1LCJpZGVudGl0eSI6IjVlMWQ0Yzk4MjJiMTIyMjZkYmQxYTNiYiIsImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyJ9.Ep66zaxI7NlNO9zrASyLxB5V9-6nWKkWklbyjJakHZg'
    }
  }

  componentDidMount() {
    console.log('Import the Recipes now')
    const config = {
      headers: { Authorization: `Bearer ${this.state.token}` }
    };
    
    axios.get( 
      'http://localhost:5000/api/recipes',
      config
    ).then((res) => {
      let holder = []
      res.data.forEach( (item) => holder.push(item))
      console.log(holder)
      this.setState({
        recipes: holder
      })
    })
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