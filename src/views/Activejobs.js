import React from "react";

import { withRouter } from "react-router-dom";
import { Plugins, CameraResultType } from "@capacitor/core";
import { isMobile } from "react-device-detect";
const { Camera, Geolocation } = Plugins;
class Activejobs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      operatorData: [],
    };
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
    });
    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    var imageUrl = image;
    console.log(imageUrl);
    // console.log(imageUrl);
    // Can be set to the src of an image now
    // imageElement.src = imageUrl;
  }

  async getCurrentPosition() {
    try{
      const coordinates = await Geolocation.getCurrentPosition();
      console.log("Current", coordinates);
    }catch(err){
      console.log(err);
    }
  }

  componentDidMount() {
    const id = this.props.match.params.id;
  }

  render() {
    
    return (
      <>
        <div className="content">
          <button
            className="btn btn-primary"
            onClick={(e) => this.getCurrentPosition()}
          >
            Get Current locations
          </button>
          {isMobile ? (
            <button
              className="btn btn-primary"
              onClick={(e) => this.takePicture()}
            >
              Capture image
            </button>
          ) : null}
         
        </div>
      </>
    );
  }
}

export default withRouter(Activejobs);
