import React from 'react'

import { Button,
         InputGroup,
         Form,
         FormInput,
         FormGroup } from 'shards-react'

import ScrapingManifestService from '../../store/services/ScrapingManifestService'

export default class ScrapingManifestForm extends React.Component {
  constructor(props) {
    super(props)
    if (props.mode === 'edit') {
      this.state = {
        error: '',
        id: this.props.smanifest._id.$oid,
        domain: this.props.smanifest.domain,
        name_path: this.props.smanifest.name_path,
        author_path: this.props.smanifest.author_path,
        prep_time_path: this.props.smanifest.prep_time_path[0],
        prep_time_path_units: this.props.smanifest.prep_time_path[1],
        cook_time_path: this.props.smanifest.cook_time_path[0],
        cook_time_path_units: this.props.smanifest.cook_time_path[1],
        ingredients_path: this.props.smanifest.ingredients_path,
        instructions_path: this.props.smanifest.instructions_path
      }
    } else {
      this.state = {
        error: '',
        id: null,
        domain: null,
        name_path: null,
        author_path: null,
        prep_time_path: null,
        prep_time_path_units: null,
        cook_time_path: null,
        cook_time_path_units: null,
        ingredients_path: null,
        instructions_path: null
      }
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.submitCreatedSmanifest = this.submitCreatedSmanifest.bind(this)
    this.submitEditedSmanifest = this.submitEditedSmanifest.bind(this)
    this.deleteSmanifest = this.deleteSmanifest.bind(this)
  }

  componentDidMount() {
    if (this.props.mode === 'edit') {
      this.props.setEditSmanifest(this.submitEditedSmanifest)
      this.props.setDeleteSmanifest(this.deleteSmanifest)
    }
    if (this.props.mode === 'create') this.props.setCreateSmanifest(this.submitCreatedSmanifest)
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  async submitCreatedSmanifest() {
    let aggregatedPrepTime = [this.state.prep_time_path, this.state.prep_time_path_units]
    let aggregatedCookTime = [this.state.cook_time_path, this.state.cook_time_path_units]
    const payload = {
      domain: this.state.domain,
      name_path:this.state.name_path,
      author_path: this.state.author_path,
      prep_time_path: aggregatedPrepTime,
      cook_time_path: aggregatedCookTime,
      ingredients_path: this.state.ingredients_path,
      instructions_path: this.state.instructions_path,
    }
    try {
      let newSmanifestResponse = await ScrapingManifestService.create(payload)
      if(newSmanifestResponse.status === 201){
        const payload = {
          id: this.props.id
        }
        this.props.onSmanifestChangeTop(payload)
      }
    } catch (error) {
      console.error(error)
    }
  }

  async submitEditedSmanifest() {
    let aggregatedPrepTime = [this.state.prep_time_path, this.state.prep_time_path_units]
    let aggregatedCookTime = [this.state.cook_time_path, this.state.cook_time_path_units]
    const payload = {
      domain: this.state.domain,
      name_path:this.state.name_path,
      author_path: this.state.author_path,
      prep_time_path: aggregatedPrepTime,
      cook_time_path: aggregatedCookTime,
      ingredients_path: this.state.ingredients_path,
      instructions_path: this.state.instructions_path,
    }
    try {
      let editSmanifestResponse = await ScrapingManifestService.update(this.state.id, payload)
      if(editSmanifestResponse.status === 200){
        const payload = {
          id: this.props.id
        }
        this.props.onSmanifestChangeTop(payload)
      }
    } catch (error) {
      console.error(error)
    }
  }

  async deleteSmanifest() {
    try {
      let deleteSmanifestResponse = await ScrapingManifestService.delete(this.state.id)
      if (deleteSmanifestResponse.status === 204) {
        const payload = {
          id: this.props.id
        }
        this.props.onSmanifestChangeTop(payload)
      }
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    return (
      <Form>
        <FormGroup>
          <label htmlFor="#domain">Domain</label>
          <FormInput name="domain"
                     id="#domain"
                     placeholder="Domain"
                     value={this.state.domain || ''}
                     onChange={this.handleInputChange}/>
        </FormGroup>
        <FormGroup>
          <label htmlFor="#authorPath">Author Path</label>
          <FormInput name="author_path"
                     id="#authorPath"
                     placeholder="Author Path"
                     value={this.state.author_path || ''}
                     onChange={this.handleInputChange}/>
        </FormGroup>
        <FormGroup>
          <label htmlFor="#namePath">Name Path</label>
          <FormInput name="name_path"
                     id="#namePath"
                     placeholder="Name Path"
                     value={this.state.name_path || ''}
                     onChange={this.handleInputChange}/>
        </FormGroup>

        <div className="form-row">
          <FormGroup className="col">
            <label htmlFor="#prepTimePath">Prep Time Path</label>
            <FormInput name="prep_time_path"
                       id="#prepTimePath"
                       placeholder="Prep Time Path"
                       value={this.state.prep_time_path || ''}
                       onChange={this.handleInputChange}/>
          </FormGroup>
          <FormGroup className="col">
            <label htmlFor="#prepTimePathUnits">Prep Time Path Units</label>
            <FormInput name="prep_time_path_units"
                       id="#prepTimePathUnits"
                       placeholder="Prep Time Path Units"
                       value={this.state.prep_time_path_units || ''}
                       onChange={this.handleInputChange}/>
          </FormGroup>
        </div>

        <div className="form-row">
          <FormGroup className="col">
            <label htmlFor="#cookTimePath">Cook Time Path</label>
            <FormInput name="cook_time_path"
                       id="#cookTimePath"
                       placeholder="Cook Time Path"
                       value={this.state.cook_time_path || ''}
                       onChange={this.handleInputChange}/>
          </FormGroup>
          <FormGroup className="col">
            <label htmlFor="#cookTimePathUnits">Cook Time Path Units</label>
            <FormInput name="cook_time_path_units"
                       id="#cookTimePathUnits"
                       placeholder="Cook Time Path Units"
                       value={this.state.cook_time_path_units || ''}
                       onChange={this.handleInputChange}/>
          </FormGroup>
        </div>
        <FormGroup>
          <label htmlFor="#ingredientsPath">Ingredients Path</label>
          <FormInput name="ingredients_path"
                     id="#ingredientsPath"
                     placeholder="Ingredients Path"
                     value={this.state.ingredients_path || ''}
                     onChange={this.handleInputChange}/>
        </FormGroup>
        <FormGroup>
          <label htmlFor="#instructionsPath">Instructions Path</label>
          <FormInput name="instructions_path"
                     id="#instructionsPath"
                     placeholder="Instructions Path"
                     value={this.state.instructions_path || ''}
                     onChange={this.handleInputChange}/>
        </FormGroup>
      </Form>
    )
  }
}
