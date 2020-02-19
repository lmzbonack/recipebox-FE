import React from "react"
import { Router } from "@reach/router"

import Recipes from '../pages/Recipes'
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'


function ExportRouter(props){
  return (
    <Router>
      {/* Maybe set this up to Redirect instead */}
      <Recipes path="/"/>
      <Recipes path="/recipes"/>
      <Login path='/login'/>
      <SignUp path='/signup'/>
    </Router>
  )
}

export default ExportRouter