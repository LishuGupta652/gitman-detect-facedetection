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
    <div>
      <Navbar />
      <div className="newPostCard">
        <div className="addPost">
          <img
            src="https://raw.githubusercontent.com/LishuGupta652/web-static-content/main/lishu%20gupta%20image%2002.jpg"
            alt=""
            className="avatar"
          />
          <div className="postForm">
            <input
              type="text"
              placeholder="What's in your mind"
              className="postInput"
            />
            <label htmlFor="file">
              <img
                className="addImg"
                src="https://cdn.icon-icons.com/icons2/564/PNG/512/Add_Image_icon-icons.com_54218.png"
                alt=""
              />
              <img
                className="addImg"
                src="https://icon-library.com/images/maps-icon-png/maps-icon-png-5.jpg"
                alt=""
              />
              <img
                className="addImg"
                src="https://d29fhpw069ctt2.cloudfront.net/icon/image/84451/preview.svg"
                alt=""
              />
              <button>send</button>
            </label>
            <input id="file" style={{ display: "none" }} type="file" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
