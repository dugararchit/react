import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

class FieldOperator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      operatorData: [],
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
    fetch(`https://gpmuk.com/loginreg/fieldoperator.php`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // this.props.token = "QpwL5tke4Pnpja7X4";
        if (data.success === 1) {
          //this.props.history.push("/login");
          this.setState({
            operatorData: data.data,
          });
          this.props.checkDashboardData(data.data);
        } else console.log("No Data or error", data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  
  render() {
    
    return (
      <>
        <div className="content">
          <Row>
            <Col>
              <Card>
                <CardHeader style={{ backgroundColor: "grey" }}>
                  <CardTitle tag="h4">Jobs Completed</CardTitle>
                </CardHeader>
              </Card>
            </Col>
          </Row>
          {this.state.operatorData.length === 0 ? (
            <p>No Data Available</p>
          ) : null}
          {this.state.operatorData.map((element, index) => {
            return (
              <div className="card" key={index}>
                <div className="card-body">
                  <h5 className="card-title">{element.description}</h5>
                  <p className="card-text">
                    {element.tenant_name}: {element.tenant_address}
                  </p>
                  <hr />
                  <h6>{element.notes_on_completion}</h6>
                  <button className="btn btn-success ml-3">
                    Completion Date: {element.date_of_completion}
                  </button>
                  <button className="btn btn-danger ml-3">
                    Email: {element.tenant_email}
                  </button>
                  <button className="btn btn-warning ml-3">
                    Amount: {element.finalamount} £
                  </button>
                  
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

export default FieldOperator;
