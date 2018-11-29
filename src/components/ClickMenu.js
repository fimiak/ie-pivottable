import React, { Component } from 'react';
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
              this.handleClick(undefined);
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
          <FontAwesomeIcon icon="arrow-alt-circle-right" /> Traffic To IP
        </Link>
        <Link
          to={'/source/' + this.props.filter}
          onClick={() => {
            this.props.filterList('source');
            this.handleClick('source');
          }}>
          <FontAwesomeIcon icon="arrow-alt-circle-right" /> Traffic From IP
        </Link>
      </div>
    );
  }
}

export default ClickMenu;
