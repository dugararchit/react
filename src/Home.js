// Import React
import React, { Component } from 'react';
import Camera, { FACING_MODES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import Header from './Header';
import { geolocated } from "react-geolocated";
import firebase from "./firebase";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      //clientName: "",
      clientOptions: [],
      usersOptions: [],
      //yourName: "",
      client_id: "",
      user_id: "",
      openCamera: false,
      shopimageuri: "",
      productimageuri: [],
      image: '',
      authorization: ""
    }
  }
  handleTakePhoto = (dataUri) => {
    // Do stuff with the photo...
    console.log(this.state.image);
    if (this.state.image === 'shop') {
      this.setState({
        shopimageuri: dataUri,
        openCamera: false,
        image: ''
      });
    } else {
      var productImageUri = [...this.state.productimageuri, dataUri];
      this.setState({
        productimageuri: productImageUri,
        openCamera: false,
        image: ''
      });
    }

  }

  takeImage = () => {
    this.setState({
      image: 'shop',
      openCamera: true
    });
  }

  takeproductImage = () => {
    this.setState({
      image: 'product',
      openCamera: true
    });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  componentDidMount() {
    if (localStorage.getItem("authorization") != null) {
      
      this.setState({
        authorization: localStorage.getItem("authorization")
      });
      
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': this.state.authorization }
      };
      fetch('http://localhost/loginreg/getusers.php', requestOptions)
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            this.setState({
              usersOptions: data.data
            })
          } else {
            alert(data.message);
          }
        })
        .catch(error => console.log(error));

      fetch('http://localhost/loginreg/getclients.php', requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          if (data.success) {
            this.setState({
              clientOptions: data.data
            })
          } else {
            alert(data.message);
          }
        })
        .catch(error => console.log(error));
    } else {
      alert("You Are not authorized user");
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    var bearerToken = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3RcL3BocF9hdXRoX2FwaVwvIiwiYXVkIjoiaHR0cDpcL1wvbG9jYWxob3N0XC9waHBfYXV0aF9hcGlcLyIsImlhdCI6MTU5MDkyMjg1NiwiZXhwIjoxNTkwOTI2NDU2LCJkYXRhIjp7InVzZXJfaWQiOiIzIn19.0HSTjS18uX6AcRopJVO_yMxX6HbTl2-YQrqn2PE1Lco';
    // let ref = firebase.database().ref('supertelecom/' + this.state.yourName);
    // var result = {
    //   clientName: this.state.clientName,
    //   shopimageuri: this.state.shopimageuri,
    //   productimageuri: this.state.productimageuri,
    //   latitude: this.props.coords.latitude,
    //   longitude: this.props.coords.longitude,
    //   created_at: new Date().getTime()
    // };
    // console.log(result);
    // ref.push(result);
    // this.setState({
    //   clientName: "",
    //   yourName: "",
    //   openCamera: false,
    //   shopimageuri: "",
    //   productimageuri: "",
    //   image: ''
    // });
    // Simple POST request with a JSON body using fetch
    var result = {
      // clientName: this.state.clientName,
      client_id: this.state.client_id,
      user_id: this.state.user_id,
      shopimage: this.state.shopimageuri,
      productimage: this.state.productimageuri,
      latitude: this.props.coords.latitude,
      longitude: this.props.coords.longitude
    };
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': bearerToken },
      body: JSON.stringify(result)
    };
    fetch('http://localhost/loginreg/addvisit.php', requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.success) {
          alert("Thank you for submitting the data.");
          this.setState({
            client_id: "",
            user_id: "",
            openCamera: false,
            shopimageuri: "",
            productimageuri: [],
            image: ''
          });
        } else {
          alert("Error while processing your data. Please try after sometime")
        }
      })
      .catch(error => console.log(error));
  }

  deleteImage = (index) => {
    console.log(index);
    var prodImageUri = this.state.productimageuri;
    prodImageUri.splice(index, 1);

    this.setState({
      productImageUri: prodImageUri
    })
  }

  render() {

    return !this.props.isGeolocationAvailable ? (
      <div>Your browser does not support Geolocation</div>
    ) : !this.props.isGeolocationEnabled ? (
      <div>Geolocation is not enabled</div>
    ) : this.props.coords ? (
      <div>
        <Header heading="Visitor Information!"></Header>
        <div className="container">
          <div className="col-md-10">
            <h2>Shop Data Form</h2>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <select required className="form-control form-control-sm" onChange={this.handleChange} name="client_id" value={this.state.clientName}>
                  <option value="">Client Name</option>
                  {
                    this.state.clientOptions.map((ele, index) => {
                      return <option value={ele.id} key={index}>{ele.name}</option>
                    })
                  }
                </select>
              </div>

              <div className="form-group">
                <select required className="form-control form-control-sm" onChange={this.handleChange} name="user_id" value={this.state.yourName}>
                  <option value="">Select Your name</option>
                  {
                    this.state.usersOptions.map((ele, index) => {
                      return <option value={ele.id} key={index}>{ele.name}</option>
                    })
                  }
                </select>
              </div>
              <div className="form-row hide">
                <div className="col">
                  <input type="text" readOnly className="form-control" placeholder="Latitude" value={this.props.coords.latitude} />
                </div>
                <div className="col">
                  <input type="text" readOnly className="form-control" placeholder="Longitude" value={this.props.coords.longitude} />
                </div>
              </div>
              <br />
              <div className="form-group">
                <input required type="text" className="form-control" id="shopimage" placeholder="Capture shop image by clicking on button below" name="shopimageuri" value={this.state.shopimageuri} />
                <a onClick={this.takeImage} className="btn btn-sm btn-warning">Capture shop image</a>
                {this.state.shopimageuri !== "" ? <img className="ml-2"
                  src={this.state.shopimageuri} alt="Camera" width="75px" height="75px"
                /> : ""}
              </div>

              <div className="form-group">
                <input type="text" required className="form-control" id="productimage" placeholder="Capture Product image by clicking on button below" name="productimage" value={this.state.productimageuri} />
                <a onClick={this.takeproductImage} className="btn btn-sm btn-warning">Capture product image</a>
                {
                  this.state.productimageuri.length > 0 ?
                    this.state.productimageuri.map((ele, index) => {
                      return (
                        <span>
                          <img className="ml-2"
                            src={ele} alt="Camera" width="75px" height="75px"
                          />
                          <span onClick={e => this.deleteImage(index)} style={{ "cursor": "pointer", "color": "red", "fontWeight": "bold", "position": "absolute", "marginLeft": "-15px" }}>X</span>
                        </span>)
                    })
                    : ""}

              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
          <div>
            <div className="row">
              {this.state.openCamera ?
                <Camera idealFacingMode={FACING_MODES.ENVIRONMENT}
                  isImageMirror={false}
                  isSilentMode={false}
                  isFullscreen={false}
                  sizeFactor={0.5}
                  idealResolution={{ width: 640, height: 480 }}
                  isMaxResolution={false}
                  onTakePhoto={(dataUri) => { this.handleTakePhoto(dataUri); }}
                /> : ""}

            </div>
          </div>
        </div>
      </div>
    ) : (
            <div>Getting the location data&hellip; </div>
          );
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(Home);
