import React, { Component } from 'react';
import Button from './Button';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class ClickMenu extends Component {
  handleClick = type => {
    this.props.clickMenu(type);
  };

  render() {
    return (
      <div className="click-menu">
        <div className="click-header">
          IP Address &nbsp;
          {this.props.filter}
          <div
            className="click-close"
            onClick={() => {
              this.handleClick();
            }}>
            <FontAwesomeIcon icon="window-close" />
          </div>
        </div>
        <Link
          to={'/destination/' + this.props.filter}
          onClick={() => {
            this.props.filterList('destination');
            this.handleClick('destination');
          }}>
          Traffic To IP
          <Button icon="arrow-alt-circle-right" />
        </Link>
        <Link
          to={'/source/' + this.props.filter}
          onClick={() => {
            this.props.filterList('source');
            this.handleClick('source');
          }}>
          Traffic From IP
          <Button icon="arrow-alt-circle-right" />
        </Link>
      </div>
    );
  }
}

export default ClickMenu;
