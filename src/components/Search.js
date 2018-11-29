import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Search extends Component {
  render() {
    return (
      <tr>
        <td colSpan="3" className="table-search">
          <div className="table-title">
            {this.props.alteredList.length === this.props.defaultList.length
              ? 'Click an IP Address for more options'
              : this.props.filterBy === 'dest'
              ? 'Bytes sent to ' + this.props.filterHistory
              : 'Bytes sent from ' + this.props.filterHistory}

            <Link to="/">
              <button className="table-button" onClick={this.props.reset}>
                <FontAwesomeIcon icon="sync" /> &nbsp;Reset
              </button>
              <button className="table-button" onClick={() => this.props.props.history.goBack()}>
                <FontAwesomeIcon icon="arrow-left" /> &nbsp;Back
              </button>
            </Link>
          </div>
        </td>
      </tr>
    );
  }
}

export default Search;
