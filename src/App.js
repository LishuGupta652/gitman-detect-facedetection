import "./App.css";
import { useRef, useEffect } from "react";
import * as faceapi from "face-api.js";
import Navbar from "./components/Navbar";

function App() {
  const imgRef = useRef();
  const canvasRef = useRef();

  const handleImage = async () => {
    const detections = await faceapi
      .detectAllFaces(imgRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions();

    canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(imgRef.current);
    faceapi.matchDimensions(canvasRef.current, {
      width: 940,
      height: 650,
    });
    const resizedVersion = faceapi.resizeResults(detections, {
      width: 940,
      height: 650,
    });
    faceapi.draw.drawDetections(canvasRef.current, resizedVersion);
    faceapi.draw.drawFaceExpressions(canvasRef.current, resizedVersion);
    faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedVersion);
    faceapi.draw.drawContour(canvasRef.current, resizedVersion);
    console.log(detections);
  };
  useEffect(() => {
    const loadModels = () => {
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
        faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
        faceapi.nets.faceExpressionNet.loadFromUri("/models"),
      ])
        .then(handleImage)
        .catch((e) => console.log(e));
    };
    imgRef.current && loadModels();
  }, []);
  return (
    <div className="App">
      <Navbar />
      <img
        crossOrigin="anonymous"
        ref={imgRef}
        src="https://raw.githubusercontent.com/LishuGupta652/web-static-content/main/lishu%20gupta%20image%2002.jpg"
        alt="test image"
        width="940"
        height="650"
      />
      <canvas width="940" height="650" ref={canvasRef} />
    </div>
  );
}

export default App;
