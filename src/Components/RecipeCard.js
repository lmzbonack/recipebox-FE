import React from 'react';

function RecipeCard(props){
  return (
    <div className="card">
      <p>{ props.name }</p>
      <p>Author: { props.author }</p>
      <p>{props.ingredients.length} ingredients</p>
      <p>{props.instructions.length} steps </p>
      <p>External Link: </p>
    </div>
  )
}

export default RecipeCard