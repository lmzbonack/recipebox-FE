import React from 'react';

import { Button, Collapse, Container } from 'shards-react'

export default class ManifestDetails extends React.Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.state = {
      collapse:false
    }
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse })
  }

  render() {
    return (
      <Container>
        <Button onClick={this.toggle} className="mt-3">{ this.props.domain }</Button>
        <Collapse open={ this.state.collapse }>
          <div className="p-3 mt-3 border rounded">
            <h5>😍 Now you see me!</h5>
            <span>
              Scraping Manifest details form coming soon
            </span>
          </div>
        </Collapse>
      </Container>
    )
  }
}
