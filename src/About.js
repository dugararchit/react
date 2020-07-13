import React from "react";
import "./App.css";

class About extends React.Component {
  constructor() {
    super();
    this.state = {
      logo: "/img/about.jpg",
      name: "Our Restaurant",
      description: `Hotel Description loading.....`,
    };
  }

  componentDidMount() {
    console.log(this.props);
    const requestOptions = {
      method: "POST",
      body: JSON.stringify({
        rid: this.props.rid,
      }),
    };
    fetch(`https://gpmuk.com/restaurant_Apis/restaurant_details.php`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success === 1) {
            this.setState({
                logo: data.data[0]["rlogo"],
                name: data.data[0]["rname"],
                description: data.data[0]["rdesc"]
            })
        } else {
          console.log("error", data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        {" "}
        <div id="about">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-6 ">
                <div className="about-img">
                  <img src={this.state.logo} className="img-fluid" alt="" />
                </div>
              </div>
              <div className="col-xs-12 col-md-6">
                <div className="about-text">
                  <h2>{this.state.name}</h2>
                  <hr />
                  <p>{this.state.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
