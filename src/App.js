import "./App.css";
import { useRef, useEffect, useState } from "react";
import * as faceapi from "face-api.js";
import Navbar from "./components/Navbar";

function App() {
  const [file, setFile] = useState();
  const [image, setImage] = useState();

  useEffect(() => {
    const getImage = () => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      file && console.log();
    };
  }, [file]);

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
            <input
              onChange={(e) => setFile(e.target.files[0])}
              id="file"
              style={{ display: "none" }}
              type="file"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
