import React, { Component } from 'react';

class AddAppointment extends Component {


  constructor() {
    super();
    this.state = {
      'petName': 'petName',
      'ownerName': 'ownerName',
      'aptDate': '2020-02-15',
      'aptTime': '10:22',
      'aptNotes': 'aptnotes'
    }
    this.handleChange = this.handleChange.bind(this);
  }


  addAppointment(e) {
    e.preventDefault();
    this.props.addAppointment(this.state);
    this.setState({
      'petName': '',
      'ownerName': '',
      'aptDate': '',
      'aptTime': '',
      'aptNotes': ''
    });
  }

  handleChange(event) {
    var targetName = event.target.name;
    var targetValue = event.target.value;

    this.setState({
      [targetName]: targetValue
    });
    //this.setState({[this.props.addAppointment[event.target.name]]: event.target.value});
  }

  render() {
    return (
      <div className="card textcenter mt-3">
        <div className="apt-addheading card-header bg-primary text-white">
          Add Appointment
          </div>
        
        <div className="card-body">
          <form id="aptForm" noValidate>
            <div className="form-group form-row">
              <label
                className="col-md-2 col-form-label text-md-right"
                htmlFor="petName"
              >
                Pet Name
                </label>
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control"
                  name="petName"
                  placeholder="Pet's Name"
                  onChange={this.handleChange}
                  value={this.state.petName}
                />
              </div>
            </div>

            <div className="form-group form-row">
              <label
                className="col-md-2 col-form-label text-md-right"
                htmlFor="ownerName"
              >
                Pet Owner
                </label>
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control"
                  name="ownerName"
                  placeholder="Owner's Name"
                  onChange={this.handleChange}
                  value={this.state.ownerName}
                />
              </div>
            </div>

            <div className="form-group form-row">
              <label
                className="col-md-2 col-form-label text-md-right"
                htmlFor="aptDate"
              >
                Date
                </label>
              <div className="col-md-4">
                <input
                  type="date"
                  className="form-control"
                  name="aptDate"
                  id="aptDate"
                  onChange={this.handleChange}
                  value={this.state.aptDate}
                />
              </div>
              <label
                className="col-md-2 col-form-label text-md-right"
                htmlFor="aptTime"
              >
                Time
                </label>
              <div className="col-md-4">
                <input
                  type="time"
                  className="form-control"
                  name="aptTime"
                  id="aptTime"
                  onChange={this.handleChange}
                  value={this.state.aptTime}
                />
              </div>
            </div>

            <div className="form-group form-row">
              <label className="col-md-2 text-md-right" htmlFor="aptNotes">
                Apt. Notes
                </label>
              <div className="col-md-10">
                <textarea
                  className="form-control"
                  rows="4"
                  cols="50"
                  name="aptNotes"
                  id="aptNotes"
                  placeholder="Appointment Notes"
                  onChange={this.handleChange}
                  value={this.state.aptNotes}
                />
              </div>
            </div>

            <div className="form-group form-row mb-0">
              <div className="offset-md-2 col-md-10">
                <button
                  onClick={(e) => this.addAppointment(e)}
                  type="submit"
                  className="btn btn-primary d-block ml-auto"
                >
                  Add Appointment
                  </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AddAppointment;
