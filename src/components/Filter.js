import React, { Component } from 'react';
import Button from './Button';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Filter extends Component {
  render() {
    return (
      <tr>
        <td colSpan="3" className="table-search">
          <div className="table-title">
            {this.props.alteredList && this.props.alteredList.length === this.props.defaultList.length
              ? 'Click an IP Address for more options'
              : this.props.filterBy === 'dest'
              ? 'Bytes sent to ' + this.props.filterHistory
              : 'Bytes sent from ' + this.props.filterHistory}

            <Link to="/">
              <Button icon="arrow-left" onClick={() => this.props.props.history.goBack()} />
              <Button icon="sync" onClick={this.props.reset} />
            </Link>
          </div>
        </td>
      </tr>
    );
  }
}

export default Filter;
