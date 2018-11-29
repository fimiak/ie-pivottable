import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Button extends Component {
  render() {
    return (
      <button className="table-button" onClick={this.props.onClick}>
        <FontAwesomeIcon icon={this.props.icon} />
      </button>
    );
  }
}

export default Button;
