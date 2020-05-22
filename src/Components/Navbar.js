import React from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse
} from "shards-react";

export default class NavExample extends React.Component {
  constructor(props) {
    super(props);

    this.toggleRecipeDropdown = this.toggleRecipeDropdown.bind(this);
    this.toggleProfileDropdown = this.toggleProfileDropdown.bind(this);

    this.toggleNavbar = this.toggleNavbar.bind(this);

    this.state = {
      recipeDropdownOpen: false,
      profileDropdownOpen: false,
      collapseOpen: false
    };
  }

  toggleRecipeDropdown() {
    this.setState({
      ...this.state,
      ...{
        recipeDropdownOpen: !this.state.recipeDropdownOpen
      }
    });
  }

  toggleProfileDropdown() {
    this.setState({
      ...this.state,
      ...{
        profileDropdownOpen: !this.state.profileDropdownOpen
      }
    });
  }

  toggleNavbar() {
    this.setState({
      ...this.state,
      ...{
        collapseOpen: !this.state.collapseOpen
      }
    });
  }

  render() {
    let isloggedIn = localStorage.getItem('authToken')
    return (
      <Navbar theme="light" expand="md">
        <NavbarBrand href="/recipes">Recipe Box</NavbarBrand>
        <NavbarToggler onClick={this.toggleNavbar} />
        <Collapse open={this.state.collapseOpen} navbar>
          <Nav navbar>
            <Dropdown
              open={this.state.recipeDropdownOpen}
              toggle={this.toggleRecipeDropdown}
            >
              <DropdownToggle nav caret>
                Recipes
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem href='/recipes'>Search</DropdownItem>
              </DropdownMenu>
            </Dropdown>

            <Dropdown
              open={this.state.profileDropdownOpen}
              toggle={this.toggleProfileDropdown}
            >
              <DropdownToggle nav caret>
                Profile
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem href='/shopping-list'>Shopping Lists</DropdownItem>
                <DropdownItem href='/created-recipes'>Created Recipes</DropdownItem>
                <DropdownItem href='/starred-recipes'>Starred Recipes</DropdownItem>
                <DropdownItem href='/created-manifests'>Scraping Manifests</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Nav>

          <Nav navbar className="ml-auto">
            {isloggedIn === null &&
            <NavItem>
              <NavLink href="/login">
                Login
              </NavLink>
            </NavItem>
            }
            {isloggedIn !== null &&
            <NavItem>
              <NavLink href="/login" onClick={() => {localStorage.removeItem('authToken')}}>
                Logout
              </NavLink>
            </NavItem>
            }
            {isloggedIn === null &&
            <NavItem>
              <NavLink href="/signup">
                Sign Up
              </NavLink>
            </NavItem>
            }
          </Nav>
        </Collapse>
      </Navbar>
    )
  }
}
