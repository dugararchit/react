import React from "react";

// react plugin used to create charts
import CountUp from "react-countup";
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      operatorData: [],
      jobscompletedlength: 0,
      revenueearner: 0,
      openNotesModal: false,
      notessection: "",
      notesid: "",
    };
  }

  componentDidMount() {
    const requestOptions = {
      method: "POST",
      body: JSON.stringify({
        email: localStorage.getItem("userEmail"),
      }),
      headers: { Authorization: `Bearer ${localStorage.getItem("userData")}` },
    };
    fetch(`https://gpmuk.com/loginreg/fieldoperatoractive.php`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.success === 1) {
          this.setState({
            operatorData: this.state.operatorData.concat(data.data),
          });
          console.log(this.state.operatorData);
        } else console.log("No Data or error", data);
      })
      .catch((err) => {
        console.log(err);
      });

    fetch(`https://gpmuk.com/loginreg/fieldoperatoractivep.php`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log("fieldoperatoractivep");
        if (data.success === 1) {
          this.setState({
            operatorData: this.state.operatorData.concat(data.data),
          });
        } else console.log("No Data or error", data);
      })
      .catch((err) => {
        console.log(err);
      });

    fetch(`https://gpmuk.com/loginreg/fieldoperator.php`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.success === 1) {
          var sum = 0;
          data.data.forEach((value) => {
            sum = sum + parseInt(value.finalamount);
          });
          this.setState({
            jobscompletedlength: data.data.length,
            revenueearner: sum,
          });
        } else console.log("No Data or error", data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleJobStatus = (issueId, status) => {
    const requestOptions = {
      method: "POST",
      body: JSON.stringify({
        email: localStorage.getItem("userEmail"),
        issueid: issueId,
        status: status,
      }),
      headers: { Authorization: `Bearer ${localStorage.getItem("userData")}` },
    };
    //=====
    
    fetch(`https://gpmuk.com/loginreg/updateaction.php`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.success === 1) {
          this.setState({
            operatorData: [],
          });
          this.componentDidMount();
        } else console.log("No Data or error", data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  updateNotes = (id) => {
    this.setState({
      openNotesModal: true,
      notesid: id,
    });
  };

  handleNotesSubmit = (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      body: JSON.stringify({
        email: localStorage.getItem("userEmail"),
        issueid: this.state.notesid,
        notes: this.state.notessection,
      }),
      headers: { Authorization: `Bearer ${localStorage.getItem("userData")}` },
    };
    fetch(`https://gpmuk.com/loginreg/addnotetenant.php`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.success === 1) {
          this.setState({
            openNotesModal: false,
            notessection: "",
            notesid: "",
          });
        } else console.log("No Data or error", data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleChangeNotes = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col lg="4" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-money-coins text-success" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Earning</p>
                        <CardTitle tag="p">
                          £ <CountUp end={this.state.revenueearner}></CountUp>
                        </CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col lg="4" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-vector text-danger" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Jobs Completed</p>
                        <CardTitle tag="p">
                          {this.state.jobscompletedlength}
                        </CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col lg="4" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-favourite-28 text-primary" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Ongoing Jobs</p>
                        <CardTitle tag="p">
                          {this.state.operatorData.length}
                        </CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <div className="content">
            <Row>
              <Col>
                <Card>
                  <CardHeader style={{ backgroundColor: "grey" }}>
                    <CardTitle tag="h4">Active jobs</CardTitle>
                  </CardHeader>
                </Card>
              </Col>
            </Row>
            {this.state.operatorData.length === 0 ? (
              <p>No Active jobs</p>
            ) : null}
            {this.state.operatorData.map((element, index) => {
              return (
                <div key={index} className="card">
                  <div className="card-body">
                    <h5 className="card-title">{element.description}</h5>
                    <p className="card-text">
                      {element.tenant_name}: {element.tenant_address}
                    </p>
                    <hr></hr>
                    <h6>{element.notes_on_completion}</h6>
                    <button className="btn btn-success ml-3">
                      Visited Date: {element.date_of_completion}
                    </button>
                    <button className="btn btn-danger ml-3">
                      Email: {element.tenant_email}
                    </button>
                    <button className="btn btn-warning ml-3">
                      Contact no.: {element.tenant_contact_no}
                    </button>
                  </div>
                  {element.status === "0" ? (
                    <div>
                      <button
                        onClick={(e) => this.handleJobStatus(element.id, 1)}
                        className="btn btn-primary ml-3"
                      >
                        Accept
                      </button>
                      <button
                        onClick={(e) => this.handleJobStatus(element.id, 3)}
                        className="btn btn-secondary ml-3"
                      >
                        Reject
                      </button>

                     
                    </div>
                  ) : null}

                  {element.status === "1" ? (
                    <div>
                      <button
                        onClick={(e) => this.updateNotes(element.id)}
                        className="btn btn-primary ml-3"
                      >
                        Notes
                      </button>

                      <button
                        onClick={(e) => this.updateCompletedStatus(element.id)}
                        className="btn btn-success ml-3"
                      >
                        Completed
                      </button>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
          <div>
            <Modal isOpen={this.state.openNotesModal}>
              <form>
                <ModalHeader>Update Notes</ModalHeader>
                <ModalBody>
                  <div className="form-group">
                    <label htmlFor="exampleFormControlTextarea1">
                      Enter Description
                    </label>
                    <textarea
                      className="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      required
                      name="notessection"
                      onChange={(e) => this.handleChangeNotes(e)}
                    ></textarea>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button type="button" color="primary" onClick={e => this.handleNotesSubmit(e)}>Save</Button>
                  <Button
                    color="secondary"
                    onClick={(e) => this.setState({ openNotesModal: false })}
                  >
                    Close
                  </Button>
                </ModalFooter>
              </form>
            </Modal>
          </div>
        </div>
      </>
    );
  }
}

export default Dashboard;
