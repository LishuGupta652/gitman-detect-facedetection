import "./App.css";
import { useRef } from "react";

function App() {
  const imgRef = useRef();
  const canvasRef = useRef();
  return (
    <div className="App">
      <img
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
