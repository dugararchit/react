import React, { Component } from 'react';

class ListAppointment extends Component {

  constructor() {
    super();
    this.state = {
      searchingData: {
        sortBy: '',
        sortOrder: '',
        sortValue: ''
      }
    }
  }
  sortBy = (sortby, e) => {
    document.querySelectorAll(".sortby").forEach(e => {
      e.classList.remove("active");
    })
    this.state.searchingData.sortBy = sortby;
    this.props.searchingdata(this.state.searchingData);
    e.target.classList.add('active')
  }

  sortOrder = (sortorder, e) => {
    document.querySelectorAll(".sortorder").forEach(e => {
      e.classList.remove("active");
    })
    this.state.searchingData.sortOrder = sortorder;
    this.props.searchingdata(this.state.searchingData);
    e.target.classList.add('active')
  }

  listSearch = (e) => {
    var targetvalue = e.target.value;
    this.state.searchingData.sortValue = targetvalue;
    this.props.searchingdata(this.state.searchingData);
  }

  render() {
    return (
      <div className="search-appointments row justify-content-center my-4">
        <div className="col-md-6">
          <div className="input-group">
            <input
              id="SearchApts"
              type="text"
              className="form-control"
              aria-label="Search Appointments"
              onChange={(e) => this.listSearch(e)}
            />
            <div className="input-group-append">
              <button
                type="button"
                className="btn btn-primary dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Sort by: <span className="caret" />
              </button>

              <div className="sort-menu dropdown-menu dropdown-menu-right">
                <button className="sort-by dropdown-item sortby" href="#" onClick={(e) => this.sortBy('petName', e)}>
                  Pet Name
              </button>
                <button className="sort-by dropdown-item sortby" href="#" onClick={(e) => this.sortBy('aptDate', e)}>
                  Date
              </button>
                <button className="sort-by dropdown-item sortby" href="#" onClick={(e) => this.sortBy('ownerName', e)}>
                  Owner
              </button>
                <div role="separator" className="dropdown-divider" />
                <button className="sort-by dropdown-item sortorder" href="#" onClick={(e) => this.sortOrder('asc', e)}>
                  Asc
              </button>
                <button className="sort-by dropdown-item sortorder" href="#" onClick={(e) => this.sortOrder('desc', e)}>
                  Desc
              </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ListAppointment;
