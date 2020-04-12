import React from 'react'

import {
  Container,
  Button } from 'shards-react'

import RecipeService from '../store/services/RecipeService'

export default class RecipeContent extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Container>
        <a href={this.props.recipe.external_link} target="_blank">
          <h3>{ this.props.recipe.name }</h3>
        </a>
        <p className='mb-1'>Author: { this.props.recipe.author }</p>
        <p className='mb-1'>Prep Time: { this.props.recipe.prep_time }</p>
        <p className='mb-1'>Cook Time: { this.props.recipe.cook_time }</p>
        <p className='mb-1'>Ingredients</p>
        <ul>
          { this.props.recipe.ingredients.map( ingredient  => (
            <li>{ingredient}</li>
          ))}
        </ul>
        <p className='mb-1'>Instructions</p>
        <ol>
          { this.props.recipe.instructions.map( ingredient  => (
            <li>{ingredient}</li>
          ))}
        </ol>
      </Container>
    )
  }
}
