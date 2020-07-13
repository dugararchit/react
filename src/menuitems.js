import React from "react";
import NavBar from "./Navbar";
import About from "./About";
import { parse } from "query-string"



class Menuitems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuitems: [],
      finalData: {},
      rid: ""
    };
  }

  componentDidMount() {
    // const rid = this.props.match.params.rid;
    // console.log(rid);

    const searchParams = parse(this.props.location.search);
    const rid = searchParams.rid;
    console.log(rid);
    this.setState({
      rid: rid
    });
    const requestOptions = {
      method: "POST",
      body: JSON.stringify({
        rid: rid,
      }),
    };
    fetch(
      `https://gpmuk.com/restaurant_Apis/restaurant_cat.php`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // this.props.token = "QpwL5tke4Pnpja7X4";
        if (data.success === 1) {
          //this.props.history.push("/login");
          //   this.setState({
          //     operatorData: data.data,
          //   });

          var objectData = {};
          var results = data.data;
          results.forEach((element, key) => {
            if (objectData[element.cat] === undefined)
              objectData[element.cat] = [];
            objectData[element.cat].push({
              menuname: element.menuname,
              sd: element.sd,
              price: element.price,
            });
          });
          this.setState({
            finalData: objectData,
          });
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
        <NavBar></NavBar>
          {
            (this.state.rid !== "") ? <About rid={this.state.rid}></About>: null 
          }
          
          <div id="restaurant-menu">
            <div className="section-title text-center center">
              <div className="overlay">
                <h2>Menu</h2>
                <hr />
                <p>Providing you the best of things that we have,</p>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-xs-12 col-sm-6">
                  <div className="menu-section">
                    {Object.keys(this.state.finalData).length > 0 ? null : (
                      <p>Loading data...</p>
                    )}
                    {Object.keys(this.state.finalData).map((element, key) => {
                      return (
                        <div key={key}>
                          <h2 className="menu-section-title">{element}</h2>
                          <hr />
                          {this.state.finalData[element].map(
                            (datamenu, keymenu) => {
                              return (
                                <div className="menu-item" key={keymenu}>
                                  <div className="menu-item-name">
                                    {" "}
                                    {datamenu.menuname}{" "}
                                  </div>
                                  <div className="menu-item-price">
                                    {" "}
                                    Rs. {datamenu.price}{" "}
                                  </div>
                                  <div className="menu-item-description">
                                    {" "}
                                    {datamenu.sd}{" "}
                                  </div>
                                </div>
                              );
                            }
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        
      </div>
    );
  }
}

export default Menuitems;
