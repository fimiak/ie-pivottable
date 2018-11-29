import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Button from './Button';
import ClickMenu from './ClickMenu';
import Filter from './Filter';
import data from '.././data/traffic_bytes.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Table extends Component {
  constructor(props) {
    super(props);
    this.defaultList = data.slice(0);
    this.alteredList = this.defaultList.slice(0);

    this.orderDataCopy = () => {
      // adds order key number to list
      for (let i = 0; i < this.defaultList.length; i++) {
        this.defaultList[i].order = i;
      }

      this.orderDataCopy();
    };
    this.regex = /[^/]+/g;
    if (props.location) {
      this.regip = props.location.pathname !== '/' ? props.location.pathname.match(this.regex)[1] : ''; // Filters for IP in URL
      this.regtype = props.location.pathname !== '/' ? props.location.pathname.match(this.regex)[0] : ''; // Filters for type in URL
    }
    this.state = {
      clickmenu: false, // Tracking whether the clickmenu is open or closed
      filter: this.regip,
      filterBy: this.regtype,
      list: this.defaultList, // Pulls incoming JSON into state
      sortByte: false, // Translates to 'ascending' for true, 'descending' for false
      sortDest: false,
      sortSrc: false,
      sortType: '', // Will be set to category of sort performed
      mouseX: 0, // For click menu opening position
      mouseY: 0
    };

    document.addEventListener('mousemove', e => {
      this.mouseX = e.pageX;
      this.mouseY = e.pageY;
    });

    this.filterList = this.filterList.bind(this);
    this.clickMenu = this.clickMenu.bind(this);
  }

  sortIP(str) {
    let arr = [];
    for (let char of str) {
      if (char !== '.') {
        arr.push(char);
      }
    }
    console.log(arr.join(''));
    return arr.join('');
  }

  sortByBytes = () => {
    this.state.sortByte === false
      ? this.alteredList.sort((a, b) => Number(b.result['sum_bytes']) - Number(a.result['sum_bytes']))
      : this.alteredList.sort((a, b) => Number(a.result['sum_bytes']) - Number(b.result['sum_bytes'])); // sorts list by bytes, alternating ascending/descending
    this.setState(() => ({
      list: this.alteredList,
      sortByte: !this.state.sortByte,
      sortType: 'bytes'
    }));
  };

  sortByDest = () => {
    this.state.sortDest === false
      ? this.alteredList.sort(
          (a, b) => this.sortIP(b.result['All_Traffic.dest']) - this.sortIP(a.result['All_Traffic.dest'])
        )
      : this.alteredList.sort(
          (a, b) => this.sortIP(a.result['All_Traffic.dest']) - this.sortIP(b.result['All_Traffic.dest'])
        );
    this.setState(() => ({
      list: this.alteredList,
      sortDest: !this.state.sortDest,
      sortType: 'dest'
    }));
  };

  sortBySource = () => {
    this.state.sortSrc === false
      ? this.alteredList.sort(
          (a, b) => this.sortIP(b.result['All_Traffic.src']) - this.sortIP(a.result['All_Traffic.src'])
        )
      : this.alteredList.sort(
          (a, b) => this.sortIP(a.result['All_Traffic.src']) - this.sortIP(b.result['All_Traffic.src'])
        );
    this.setState(() => ({
      list: this.alteredList,
      sortSrc: !this.state.sortSrc,
      sortType: 'source'
    }));
  };

  clickMenu(ip) {
    const menu = document.getElementsByClassName('click-menu')[0];
    if (ip === undefined) {
      if (menu) {
        menu.classList.remove('click-show');
      } // Check that menu exists
      this.setState(prevState => ({
        // Reset mouse position and clickmenu state
        clickmenu: false,
        mouseX: 0,
        mouseY: 0
      }));
    } else {
      menu.style.left = this.mouseX - 135 + 'px';
      menu.style.top = this.mouseY + 'px';
      menu.classList.add('click-show');
      this.setState(prevState => ({
        clickmenu: true,
        filter: ip
      }));
    }
  } // Opens menu, sets ip address

  list() {
    if (this.state.list.length === 0) {
      return (
        <tr>
          <td colSpan="3" className="table-nodata">
            <Link to="/" onClick={() => this.resetList()}>
              No Data found. Click to reset.
            </Link>
          </td>
        </tr>
      );
    }
    const tableItems = this.state.list.map((dataItem, index) => (
      <tr key={index}>
        <td onClick={() => this.clickMenu(dataItem.result['All_Traffic.src'])}>{dataItem.result['All_Traffic.src']}</td>
        <td onClick={() => this.clickMenu(dataItem.result['All_Traffic.dest'])}>
          {dataItem.result['All_Traffic.dest']}
        </td>
        <td>{dataItem.result['sum_bytes']}</td>
      </tr>
    ));
    return tableItems;
  } // Maps out each table row based on app state

  filterList(type) {
    type === 'destination'
      ? (this.alteredList = this.defaultList.filter(item => {
          return item.result['All_Traffic.dest'].search(this.state.filter) !== -1;
        }))
      : (this.alteredList = this.defaultList.filter(item => {
          return item.result['All_Traffic.src'].search(this.state.filter) !== -1;
        }));

    this.setState(prevState => ({
      filterHistory: this.state.filter,
      filterBy: type,
      list: this.alteredList
    }));
  }

  componentWillMount() {
    // Filters list before mounting table to prevent late CSS changes
    this.filterList(this.state.filterBy);
  }

  componentDidMount() {
    this.clickMenu();
  }

  resetList() {
    this.alteredList = this.defaultList.slice(0);
    document.getElementsByClassName('click-menu')[0].classList.remove('click-show'); // remove CSS from click menu
    this.setState(prevState => ({
      clickmenu: false,
      filter: '',
      filterBy: '',
      list: this.defaultList,
      sort: false,
      sortType: ''
    }));

    this.list();
  } // resets the list using a shallow copy of the default list

  render() {
    return (
      <div className="container">
        <ClickMenu
          filter={this.state.filter}
          filterHistory={this.state.filterHistory}
          clickMenu={() => this.clickMenu()}
          filterList={this.filterList}
        />
        <table className="table">
          <thead className="table-head">
            <Filter
              alteredList={this.alteredList}
              clickmenu={this.state.clickmenu}
              reset={() => this.resetList()}
              filterList={() => this.filterList()}
              filterHistory={this.state.filterHistory}
              filterBy={this.state.filterBy}
              defaultList={this.defaultList}
              props={this.props}
            />
            <tr>
              <td>
                <span>Source IP</span>
                <Button
                  icon={this.state.sortType === 'source' && this.state.sortSrc ? 'caret-down' : 'caret-up'}
                  onClick={() => this.sortBySource()}
                />
              </td>
              <td>
                <span>Destination IP</span>
                <Button
                  icon={this.state.sortType === 'dest' && this.state.sortDest ? 'caret-down' : 'caret-up'}
                  onClick={() => this.sortByDest()}
                />
              </td>
              <td>
                <span>Bytes Transferred</span>
                <Button
                  icon={this.state.sortType === 'bytes' && this.state.sortByte ? 'caret-down' : 'caret-up'}
                  onClick={() => this.sortByBytes()}
                />
              </td>
            </tr>
          </thead>
          <tbody>{this.list()}</tbody>
        </table>
      </div>
    );
  }
}

export default Table;
