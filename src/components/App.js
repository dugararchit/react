import React, { Component } from 'react';
import '../css/App.css';
import AddAppointment from './AddAppointment';
import ListAppointment from './ListAppointment';
import SearchAppointment from './SearchAppointment';

class App extends Component {
  constructor() {
    super();
    this.state = {
      myAppointments: [],
      copyMyAppointment: [],
      showAddAppointment: false,
      showListAppointment: true,
      sortBy: '',
      sortOrder: '',
      sortValue: ''
    }

  }

  componentDidMount() {
    fetch('./data.json')
      .then(response => response.json())
      .then(result => {
        var tmpResult = this.changeSearching(result);
        this.setState({
          copyMyAppointment: tmpResult
        });
      })
  }

  changeSearching(result) {
    var tmpResult = result;
    tmpResult = result.sort((a, b) => {
      if (this.state.sortBy == '')
        return 1;
      else {
        if (this.state.sortOrder === 'asc') {
          if (a[this.state.sortBy].toLowerCase() > b[this.state.sortBy].toLowerCase())
            return 1;
          else
            return -1;
        } else {
          if (a[this.state.sortBy].toLowerCase() < b[this.state.sortBy].toLowerCase())
            return 1;
          else
            return -1;
        }
      }
    }).filter(item => {

      if (item.petName.toLowerCase().indexOf(this.state.sortValue.toLowerCase()) > -1 || item.ownerName.toLowerCase().indexOf(this.state.sortValue.toLowerCase()) > -1 || item.aptNotes.toLowerCase().indexOf(this.state.sortValue.toLowerCase()) > -1) {

        return item;
      }
    });
    this.setState({
      myAppointments: tmpResult
    });
    return tmpResult;
  }

  deleteList = (index) => {
    this.state.myAppointments.splice(index, 1);
    this.setState({
      myAppointments: this.state.myAppointments
    });
  }

  addAppointment = (data) => {
    var tmpAppointment = {
      petName: data.petName,
      ownerName: data.ownerName,
      aptNotes: data.aptNotes,
      aptDate: data.aptDate + " " + data.aptTime
    }
    console.log(tmpAppointment);
    this.state.myAppointments.unshift(tmpAppointment);
    this.setState({
      myAppointments: this.state.myAppointments,
      showAddAppointment: !this.state.showAddAppointment,
      showListAppointment: !this.state.showListAppointment
    });
  }

  searchingData = (data) => {

    this.setState({
      sortBy: data.sortBy,
      sortOrder: data.sortOrder,
      sortValue: data.sortValue,
    });
    setTimeout(() => {
      this.changeSearching(this.state.copyMyAppointment);
    }, 1000)

  }

  render() {
    var { showAddAppointment } = this.state;
    var { showListAppointment } = this.state;

    return (

      <main className="page bg-white" id="petratings">
        <div className="container">
          <div className="row">
            <div className="col-md-12 bg-white">
              <div className="container">
                <br></br>
                <button onClick={(e) => {
                  this.setState({ showAddAppointment: !this.state.showAddAppointment, showListAppointment: !this.state.showListAppointment })
                }} className='btn btn-primary'>Add Appointment</button>
                <SearchAppointment searchingdata={this.searchingData} />
                {showAddAppointment && (
                  <AddAppointment addAppointment={this.addAppointment} />
                )}
                {showListAppointment && (
                  <ListAppointment deleteList={this.deleteList} appointments={this.state.myAppointments} />
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default App;
