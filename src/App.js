import React, { Component, Fragment } from "react";
import "./App.css";
import { Container, Row, Col, Button } from "reactstrap";
import VidNavbar from "./components/VidNavbar";
import PhotoContainer from "./components/PhotoContainer";
import VidSelector from "./components/VidSelector";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      constraints: {
        video: true,
        audio: false
      },
      stream: "",
      height: 0,
      width: 500,
      filter: "none",
      camStatus: false
    };

    this.videoRef = React.createRef();
    this.canvasRef = React.createRef();
    this.photoContainerRef = React.createRef();
  }

  componentDidMount = () => {
    if (this.hasGetUserMedia()) {
      this.vidOn();
    } else {
      alert("getUserMedia() is not supported by your browser");
    }
  };

  // Turns video on
  vidOn = () =>
    !this.state.camStatus
      ? navigator.mediaDevices
          .getUserMedia(this.state.constraints)
          .then(stream => {
            this.setState({ stream, camStatus: true }, () => {
              this.videoRef.current.srcObject = this.state.stream;
              this.videoRef.current.play();
            });
          })
          .catch(err => {
            console.log(err.name, err.message);
            console.log(
              "Possible cause: didn't connect your webcam with your pc"
            );
          })
      : alert("Video is already running");

  vidOff = () => {
    this.setState(prevState => ({
      stream: prevState.stream.getTracks().forEach(track => track.stop()),
      camStatus: false
    }));
  };

  // Check if browser supports this feature
  hasGetUserMedia = () =>
    !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);

  // Runs when video elem is playing
  handleCanPlay = () => {
    const height =
      this.videoRef.current.videoHeight /
      (this.videoRef.current.videoWidth / this.state.width);

    // Update the state and reflect it on video element's height
    this.setState({ height }, () => this.setCanvasAndVideoHeight());
  };

  // Sets canvas and video height
  setCanvasAndVideoHeight = () => {
    this.videoRef.current.setAttribute("height", this.state.height);
    this.canvasRef.current.setAttribute("height", this.state.height);
  };

  // Runs when take picture buton is clicked
  onClickHandler = () => {
    if (this.state.camStatus) {
      const context = this.canvasRef.current.getContext("2d");
      // Set canvas props
      this.canvasRef.current.width = this.state.width;
      this.canvasRef.current.height = this.state.height;
      // Draw an image to the video to the canvas
      context.drawImage(
        this.videoRef.current,
        0,
        0,
        this.state.width,
        this.state.height
      );
      // Create image from canvas
      const imgUrl = this.canvasRef.current.toDataURL("image/png");
      // Create image element
      const img = document.createElement("img");
      // Set image src
      img.src = imgUrl;
      // Set img class
      img.className = "img-fluid img-thumbnail mb-3";
      // Add filter to image
      img.style.filter = this.state.filter;
      // Create a div for column
      const col = document.createElement("div");
      // Set class to the column div
      col.className = "col-md-4";
      // Insert the image inside column
      col.appendChild(img);
      // Insert the column into photos container
      this.photoContainerRef.current.appendChild(col);
    } else {
      alert("Start camera first");
    }
  };

  // Handle filter change
  onChangeHandler = e =>
    this.setState({ filter: e.target.value }, () => this.setVideoFilter());

  // Sets video filter
  setVideoFilter = () =>
    (this.videoRef.current.style.filter = this.state.filter);

  // Sets video filter and empty photo container
  setVideoFilterAndClearImages = () => {
    this.setVideoFilter();
    this.photoContainerRef.current.innerHTML = "";
  };

  // Handle clearing everything
  onClearHandler = () =>
    this.setState({ filter: "none" }, () =>
      this.setVideoFilterAndClearImages()
    );

  render() {
    return (
      <Fragment>
        <VidNavbar />
        <main className="py-5">
          <section>
            <Container>
              <Row className="justify-content-center">
                <Col sm="6">
                  <video
                    autoPlay
                    ref={this.videoRef}
                    className="w-100 mb-4"
                    onCanPlay={this.handleCanPlay}
                  >
                    Video is not available...
                  </video>
                  {/* Button to take picture */}
                  <div className="px-3">
                    <Button
                      color="primary"
                      onClick={this.onClickHandler}
                      className="btn-block"
                    >
                      Take photo
                    </Button>
                    <Button
                      color="success"
                      className="btn-block mt-3"
                      onClick={this.onClearHandler}
                    >
                      Clear
                    </Button>
                    <Button
                      color={!this.state.camStatus ? "info" : "danger"}
                      className="btn-block mt-3"
                      onClick={!this.state.camStatus ? this.vidOn : this.vidOff}
                    >
                      {!this.state.camStatus ? "Start video" : "Stop video"}
                    </Button>
                    {/* Video filter selector */}
                    <VidSelector
                      onChangeHandler={this.onChangeHandler}
                      value={this.state.filter}
                    />
                  </div>
                  {/* Canvas elem */}
                  <canvas ref={this.canvasRef} className="d-none" />
                </Col>
              </Row>
            </Container>
          </section>
          <PhotoContainer ref={this.photoContainerRef} />
        </main>
      </Fragment>
    );
  }
}

export default App;
