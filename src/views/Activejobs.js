import React from "react";

import { withRouter } from "react-router-dom";
import { Plugins, CameraResultType } from "@capacitor/core";
import { isMobile } from "react-device-detect";

const { Camera, Geolocation } = Plugins;
class Activejobs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      availableId: "",
      completednotes: "",
      capturedImage: "",
      latitude: "",
      longitude: "",
      msg: "",
      isDisabled: false
    };
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 50,
      allowEditing: false,
      resultType: CameraResultType.Base64,
    });
    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    var imageUrl = image;
    console.log(imageUrl);
    this.setState({
      capturedImage: imageUrl,
    });
    // console.log(imageUrl);
    // Can be set to the src of an image now
    // imageElement.src = imageUrl;
  }

  async getCurrentPosition() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      console.log("Current", coordinates.coords.latitude);
      this.setState({
        latitude: coordinates.coords.latitude,
        longitude: coordinates.coords.longitude,
      });
    } catch (err) {
      console.log(err);
    }
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.setState({
      availableId: id,
    });
    this.getCurrentPosition();
  }

  handleChangeNotes = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  completedJobStatus = () => {
    const requestOptions = {
      method: "POST",
      body: JSON.stringify({
        email: localStorage.getItem("userEmail"),
        issueid: this.state.availableId,
        notes: this.state.completednotes,
        status: 2,
        siteimage: this.state.capturedImage,
        latitude: this.state.latitude,
        longitude: this.state.longitude
      }),
      headers: { Authorization: `Bearer ${localStorage.getItem("userData")}` },
    };
    this.setState({
      isDisabled: true
    })
    fetch(`https://gpmuk.com/loginreg/updatecompletionstatus.php`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          isDisabled: false
        })
        this.props.history.push("/admin/dashboard");
        if (data.success === 1) {
          console.log("Status Updated");
        } else console.log("No Data or error", data);
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          isDisabled: false
        })
        this.setState({
          msg: "Error while processing request, please try after sometime"
        });
      });
  };

  render() {
    return (
      <>
        <div className="content">
          <form>
            <div className="form-group">
              <label htmlFor="exampleFormControlTextarea1">
                Enter Notes of completion
              </label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                required
                name="completednotes"
                onChange={(e) => this.handleChangeNotes(e)}
              ></textarea>
              {isMobile ? (
                <button
                  className="btn btn-primary" type="button"
                  onClick={(e) => this.takePicture()}
                >
                  Capture image
                </button>
              ) : null}
              <button
                className="btn btn-primary"
                onClick={(e) => this.completedJobStatus()}
                type="button"
                disabled={this.state.isDisabled}
              >
                Completed
              </button>
              
            </div>

          </form>
              <span>{this.state.msg}</span>
          {/* <button
            className="btn btn-primary"
            
          >
            Get Current locations
          </button> */}
        </div>
      </>
    );
  }
}

export default withRouter(Activejobs);
