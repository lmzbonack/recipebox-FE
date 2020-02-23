import React from 'react'

export default function ShoppingListEntry(props) {
  return (
    <div>
      { props.ingredients.map( (ingredient, index) => (
        <li key={index}>
          { ingredient }
        </li>
      ))}
    </div>
  )
}
