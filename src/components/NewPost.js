import { useRef, useEffect, useState } from "react";
import * as faceapi from "face-api.js";

const NewPost = ({ image }) => {
  const { url, width, height } = image;
  const [faces, setFaces] = useState([]);
  const imgRef = useRef();
  const canvasRef = useRef();

  const handleImage = async () => {
    const detections = await faceapi.detectAllFaces(
      imgRef.current,
      new faceapi.TinyFaceDetectorOptions()
    );
    setFaces(detections.map((d) => Object.values(d.box)));

    console.log(detections);
    //   .withFaceLandmarks()
    //   .withFaceExpressions();

    // canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(imgRef.current);
    // faceapi.matchDimensions(canvasRef.current, {
    //   width: width,
    //   height: height,
    // });
    // const resizedVersion = faceapi.resizeResults(detections, {
    //   width: width,
    //   height: height,
    // });
    // faceapi.draw.drawDetections(canvasRef.current, resizedVersion);
    // faceapi.draw.drawFaceExpressions(canvasRef.current, resizedVersion);
    // faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedVersion);
    // faceapi.draw.drawContour(canvasRef.current, resizedVersion);
    // console.log(detections);
  };

  const enter = () => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.lineWidth = 5;
    ctx.strokeStyle = "green";
    faces.map((face) => {
      ctx.strokeRect(...face);
    });
  };

  console.log(faces);
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
    <div className="container">
      <div className="left" style={{ width, height }}>
        <img crossOrigin="anonymous" ref={imgRef} src={url} />
        <canvas
          onMouseEnter={enter}
          width={width}
          height={height}
          ref={canvasRef}
        />
      </div>
      <div className="right">
        <h1>Share your post</h1>
        <input
          type="text"
          placeholder="What's on your mind"
          className="rightInput "
        />
        <button className="rightButton">Send</button>
      </div>
    </div>
  );
};

export default NewPost;
