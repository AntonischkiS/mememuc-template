import "./editor.css"
import React from "react";
import React, { useEffect, useRef, useState } from "react";
import {/*redirect,*/ useNavigate} from "react-router-dom";

class MemeEditor extends React.Component {
  state = {
    topText: "",
    bottomText: "",
    templateUrl: "",
    allMemeImgs: [],
    randomImg: ""
  };
  const imageFileInput = document.querySelector("#imageFileInput");
  const canvas = document.querySelector("#meme");
  const topTextInput = document.querySelector("#topTextInput");
  const bottomTextInput = document.querySelector("#bottomTextInput");
  const templateImage = useState(new Image());
  //const canvasRef = useRef<HTMLCanvasElement>(null);

  imageFileInput.addEventListener("change", (e) => {
    const imageDataUrl = URL.createObjectURL(e.target.files[0]);

    templateImage.src = imageDataUrl;

    templateImage.addEventListener(
      "load",
      () => {
        updateMemeCanvas(
          canvas,
          image,
          topTextInput.value,
          bottomTextInput.value
        );
      },
      { once: true }
    );
  });

  function updateMemeCanvas(canvas, image, topText, bottomText) {
    const ctx = canvas.getContext("2d");
    const width = image.width;
    const height = image.height;
    const fontSize = Math.floor(width / 10);
    const yOffset = height / 25;
  
    // Update canvas background
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(image, 0, 0);
  
    // Prepare text
    ctx.strokeStyle = "black";
    ctx.lineWidth = Math.floor(fontSize / 4);
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.lineJoin = "round";
    ctx.font = `${fontSize}px sans-serif`;
  
    // Add top text
    ctx.textBaseline = "top";
    ctx.strokeText(topText, width / 2, yOffset);
    ctx.fillText(topText, width / 2, yOffset);
  
    // Add bottom text
    ctx.textBaseline = "bottom";
    ctx.strokeText(bottomText, width / 2, height - yOffset);
    ctx.fillText(bottomText, width / 2, height - yOffset);
  }
  
topTextInput.addEventListener("change", () => {
  updateMemeCanvas(canvas, templateImage, topTextInput.value, bottomTextInput.value);
});

bottomTextInput.addEventListener("change", () => {
  updateMemeCanvas(canvas, templateImage, topTextInput.value, bottomTextInput.value);
});
            
// hook to update template image if templateUrl changes
  useEffect(() => {
    // draw meme after image has been loaded
    templateImage.onload = () => {
      drawMeme();
    };
    templateImage.src = templateUrl;
  }, [templateUrl])

  componentDidMount() {
     
    // Fetching data from the API
    fetch("https://api.imgflip.com/get_memes")
      // Converting the promise received into JSON
      .then(response => response.json())
      .then(content =>
          // Updating state variables
        this.setState({
          allMemeImgs: content.data.memes
        })
      );
  }

  // Method to change the value of input fields
  handleChange = event => {
    // Destructuring the event. target object
    const { name, value } = event.target;
     
    // Updating the state variable
    this.setState({
      [name]: value
    });
  };

    return (
        <>
        <div className="meme-generator">
            <label>Select an Image</label>
            <input type="file" id="imageFileInput" onChange={this.onFileChange}></input>

            <label>Top Text</label>
            <input type="text" 
              id="topTextInput"
              placeholder="Enter Text"
              value={this.state.topText}
              name="topText"
              onChange={this.updateMemeCanvas(canvas, image, topTextInput.value, bottomTextInput.value)}>
            </input>

            <label>Bottom Text</label>
            <input type="text" 
              id="bottomTextInput"
              placeholder="Enter Text"
              value={this.state.bottomText}
              name="bottomText"
              onChange={this.updateMemeCanvas(canvas, image, topTextInput.value, bottomTextInput.value)}>
            </input>

            <canvas id="meme"></canvas>
        </div>
    </>
    );
  };
  export default MemeEditor;
