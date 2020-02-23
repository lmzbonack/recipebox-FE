// Component to render list of items in a single cart
import React from 'react'

import ShoppingListItems from '../Components/ShoppingListItems'

export default function ShoppingListItems(props) {
  return (
    <div>
      <h4>{ props.name }</h4>
      <ShoppingListEntry />
    </div>
  )
}
