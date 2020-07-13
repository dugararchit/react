import React from "react";
import "./App.css";
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { navigate } from "@reach/router";
//===in app browser


class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      encodedText: "1",
      encodeData: "",
      textToEncode: "",
    };
  }

  handleChange = (event) => {
    const { value, name } = event.target;
    console.log(value, name);
    this.setState({ [name]: value });
  };

  render() {
    const scanCode = async () => {
      try {
        const data = await BarcodeScanner.scan();
        //navigate(`/menuitems/${data.text}`)
        // navigate(`https://practical-wing-3c9658.netlify.app/menuitems/?rid=${data.text}`)
        navigate(`${data.text}`)
        this.setState({ encodedText: data.text });
      } catch (err) {
          alert("Error while processing the reques, please try after sometime");
      }
    };

    const generateCode = () => {
      BarcodeScanner.encode(
        BarcodeScanner.Encode.TEXT_TYPE,
        this.state.encodeData
      ).then(
        (data) => {
          console.log(data);
          //this.setState({ textToEncode: encodedData });
        },
        (err) => {
          console.log("Error occured : " + err);
        }
      );
    };

  
    return (
      <div>
        <header id="header">
          <div className="intro">
            <div className="overlay">
              <div className="container">
                <div className="row">
                  <div className="intro-text">
                    <h1>Scan It</h1>
                    <p>New world/ New Digital Menu</p>
                    <button
                      onClick={scanCode}
                      className="btn btn-success page-scroll"
                    >
                      Just Scan
                    </button>{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        {/* <div className="container">
          <p>Click to scan barcode</p>
          <button className="btn btn-primary" onClick={scanCode}>
            Scan
          </button>
          <button className="btn btn-primary" onClick={gotolink}>
            Go to link
          </button>
          <p>Click to create barcode</p>
            <input
              type="text"
              name="encodeData"
              value={this.state.encodeData}
              onChange={(e) => this.handleChange(e)}
            />
          
          <button className="btn btn-primary" onClick={generateCode}>
            Create
          </button>
        </div> */}
        <input
          type="text"
          name="encodeData"
          value={this.state.encodeData}
          onChange={(e) => this.handleChange(e)}
          autocomplete="off"
        />

        <button className="btn btn-primary" onClick={generateCode}>
          Generate Code
        </button>
      </div>
    );
  }
}

export default Home;
