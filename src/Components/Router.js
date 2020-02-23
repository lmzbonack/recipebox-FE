import React from "react"
import { Router } from "@reach/router"

import Recipes from '../pages/Recipes'
import StarredRecipes from '../pages/StarredRecipes'
import ShoppingList from '../pages/ShoppingList'
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'


function ExportRouter(props){
  return (
    <Router>
      {/* Maybe set this up to Redirect instead */}
      <Recipes path="/"/>
      <Recipes path="/recipes"/>
      <StarredRecipes path="/starred-recipes"/>
      <ShoppingList path='/shopping-list'/>
      <Login path="/login"/>
      <SignUp path="/signup"/>
    </Router>
  )
}

export default ExportRouter
