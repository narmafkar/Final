import React from "react";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
// import CoreStyles from "react-awesome-slider/src/core/styles.scss";
// import AnimationStyles from "react-awesome-slider/src/styled/cube-animation/cube-animation.scss";

const AutoplaySlider = withAutoplay(AwesomeSlider);

function App() {
  const slider = (
    <AutoplaySlider
      // animation="cubeAnimation"
      play={true}
      cancelOnInteraction={false}
      interval={4000}
      // cssModule={[CoreStyles, AnimationStyles]}
      fillParent={true}
      bullets={false}
    >
      <div style={{ backgroundColor: "#ff5722" }}>
        <img
          src={"/1.jpg"}
          style={{
            filter: "brightness(30%)",
            height: "100%",
            width: "100%",
            minHeight: "100%",
            minWidth: "100%",
            position: "fixed",
            top: "0",
            left: "0",
          }}
        />
      </div>
      <div style={{ backgroundColor: "#22caff" }}>
        <img
          src={"/2.jpg"}
          style={{
            filter: "brightness(30%)",
            height: "100%",
            width: "100%",
            minHeight: "100%",
            minWidth: "100%",
            position: "fixed",
            top: "0",
            left: "0",
          }}
        />
      </div>
      <div style={{ backgroundColor: "#ff5722" }}>
        <img
          src={"/3.jpg"}
          style={{
            filter: "brightness(30%)",
            height: "100%",
            width: "100%",
            minHeight: "100%",
            minWidth: "100%",
            position: "fixed",
            top: "0",
            left: "0",
          }}
        />
      </div>
      <div style={{ backgroundColor: "#22caff" }}>
        <img
          src={"/4.jpg"}
          style={{
            filter: "brightness(30%)",
            height: "100%",
            width: "100%",
            minHeight: "100%",
            minWidth: "100%",
            position: "fixed",
            top: "0",
            left: "0",
          }}
        />
      </div>
      <div style={{ backgroundColor: "#22caff" }}>
        <img
          src={"5.jpg"}
          style={{
            filter: "brightness(30%)",
            height: "100%",
            width: "100%",
            minHeight: "100%",
            minWidth: "100%",
            position: "fixed",
            top: "0",
            left: "0",
          }}
        />
      </div>
    </AutoplaySlider>
  );
  return <div>{slider}</div>;
}
export default App;
