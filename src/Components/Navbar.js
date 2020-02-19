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
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormInput,
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
    return (
      <Navbar theme="light" expand="md">
        <NavbarBrand href="#">Recipe Box</NavbarBrand>
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
                <DropdownItem href='#'>Add</DropdownItem>
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
                <DropdownItem href='/recipes'>Shopping List</DropdownItem>
                <DropdownItem href='#'>Created Recipes</DropdownItem>
                <DropdownItem href='#'>Starred Recipes</DropdownItem>
                <DropdownItem href='#'>Your Scraping Manifests</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Nav>

          <Nav navbar className="ml-auto">
            <NavItem>
              <NavLink href="/login">
                Login
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/signup">
                Sign Up
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    )
  }
}
