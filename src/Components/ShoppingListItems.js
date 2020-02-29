import React from 'react'

import { ListGroup, ListGroupItem } from "shards-react";

export default function ShoppingListItems(props) {
  return (
    <ListGroup>
      { props.ingredients.map( (ingredient, index) => (
        <ListGroupItem className="mt-1 mb-1" key={index}>
          { ingredient }
        </ListGroupItem>
      ))}
    </ListGroup>
  )
}
