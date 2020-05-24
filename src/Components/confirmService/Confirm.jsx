import React, { Component } from 'react';
import { render } from 'react-dom';

import { Button,
         ButtonGroup,
         Popover,
         PopoverBody,
         PopoverHeader } from 'shards-react'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes, faCheck } from "@fortawesome/free-solid-svg-icons"


let resolve;
const defaultProps = {
  title: 'Confirmation',
  target: 'body'
};

class Confirm extends Component {
  static create(props = {}) {
    const containerElement = document.createElement('div');
    document.body.appendChild(containerElement);
    return render(<Confirm createConfirmProps={props} />, containerElement);
  }

  constructor() {
    super();

    this.state = {
      isOpen: false,
      showConfirmProps: {},
    };

    this.handleCancel = this.handleCancel.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.show = this.show.bind(this);
  }

  handleCancel() {
    this.setState({ isOpen: false });
    resolve(false);
  }

  handleConfirm() {
    this.setState({ isOpen: false });
    resolve(true);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  show(props = {}) {
    console.log('show function')
    console.log(props)
    const showConfirmProps = { ...this.props.createConfirmProps, ...props };
    this.setState({ isOpen: true, showConfirmProps });
    return new Promise((res) => {
      resolve = res;
    });
  }

  render() {
    const { isOpen, showConfirmProps } = this.state;
    const { title, target, ...rest } = showConfirmProps;
    return (
      <Popover placement="top"
               open={isOpen}
               toggle = {this.toggle }
               target = { target || defaultProps.target }>
        <PopoverHeader>{ title || defaultProps.title }</PopoverHeader>
        <PopoverBody>
          <ButtonGroup className='float-left'>
            <Button className='w-20' theme='success' onClick={ this.handleConfirm }>
              <FontAwesomeIcon className='ml-1' icon={faCheck} />
            </Button>
            <Button theme='danger' className='ml-1' onClick= { this.handleCancel }>
              <FontAwesomeIcon className='ml-1' icon={faTimes} />
            </Button>
          </ButtonGroup>
        </PopoverBody>
      </Popover>
    );
  }
}

export default Confirm;