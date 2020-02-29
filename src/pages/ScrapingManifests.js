import React from 'react'

import UserService from '../store/services/UserService'
import ManifestDetails from '../Components/ManifestDetails'
import { Container } from 'shards-react'

export default class ScrapingManifests extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      createdManifestsResponse: [],
      error: ''
    }
  }

  async componentDidMount() {
    try {
      let createdManifestsResponse = await UserService.fetchUserData('created-manifests')
      if (createdManifestsResponse.status === 200) {
        this.setState({
          createdManifestsResponse: createdManifestsResponse.data,
          error: ''
        })
        console.log(this.state.createdManifestsResponse[0])
      }
    } catch (error) {
      console.error(error)
      this.setState({
        error: error.response.data.message
      })
    }
  }

  render() {
    return(
      <Container>
        <h2>Created Manifests</h2>
        { this.state.createdManifestsResponse.map( value => {
          return <ManifestDetails key={value._id.$oid}
                                  domain={value.domain}/>
        })}
      </Container>
    )
  }

}
