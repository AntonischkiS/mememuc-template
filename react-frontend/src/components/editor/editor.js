import "./editor.css"
import React from "react";
import { useEffect, useRef, useState } from "react";
import {/*redirect,*/ useNavigate} from "react-router-dom";
import { Modal, ModalHeader, ModalBody, FormGroup, Label, NavbarBrand } from "reactstrap";

const initialState = {
  topText: "",
  bottomText: "",
  isTopDragging: false,
  isBottomDragging: false,
  topY: "10%",
  topX: "50%",
  bottomX: "50%",
  bottomY: "90%"
}
const canvas = document.querySelector("#meme");
let templateImage

class MemeEditor extends React.Component {
  
    constructor() {
        super();
        this.state = {
          currentImage: 0,
          modalIsOpen: false,
          currentImagebase64: null,
          allMemeImgs: [],
          InputURL: 'http://i.imgflip.com/1bij.jpg',
          ...initialState
        };
      }
      updateMemeCanvas(canvas, image, topText, bottomText) {
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
   // On file select (from the pop up)
   onFileChange (event) {
    const imageDataUrl = URL.createObjectURL(event.target.files[0]);
    templateImage = new Image();
    templateImage.src = imageDataUrl;
    
    // Update the state
    //this.setState({ selectedFile: event.target.files[0] });
    templateImage.addEventListener(
        "load",
        () => {
          this.updateMemeCanvas(
            canvas,
            templateImage,
            this.state.toptext,
            this.state.bottomtext
          );
        },
        { once: true }
      );
  };

  componentDidMount() { //ensure that data is fetched at the beginning
    fetch("https://api.imgflip.com/get_memes") //call to URL
      .then(response => response.json()) //turn promise into JS object
      .then(response => {
    const { memes } = response.data //pull memes array from response.data
    console.log(memes[0]) // check data is present
    this.setState({ allMemeImgs: memes }) // set allMemeImgs state
  })
  }
  /*
  componentDidMount() {
     
    // Fetching data from the API
    fetch(InputURL)
      // Converting the promise received into JSON
      .then(response => response.json())
      .then(content =>
          // Updating state variables
        this.setState({
          allMemeImgs: content.data.memes
        })
      );
  };
*/

  
    changeText = (event) => {
        this.setState({
          [event.currentTarget.name]: event.currentTarget.value
        });
        this.updateMemeCanvas(canvas, templateImage, this.state.topText, this.state.bottomText)
    }

    RandomIMG = (event) => {
        event.preventDefault();
        const { allMemeImgs } = this.state;
        const rand =
          allMemeImgs[Math.floor(Math.random()
          * allMemeImgs.length)].url;
        this.setState({
          randomImg: rand
        });
      };
        
      convertSvgToImage = () => {
        const svg = this.svgRef;
        let svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement("canvas");
        canvas.setAttribute("id", "canvas");
        const svgSize = svg.getBoundingClientRect();
        canvas.width = svgSize.width;
        canvas.height = svgSize.height;
        const img = document.createElement("img");
        img.setAttribute("src", "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData))));
        img.onload = function() {
          canvas.getContext("2d").drawImage(img, 0, 0);
          const canvasdata = canvas.toDataURL("image/png");
          const a = document.createElement("a");
          a.download = "meme.png";
          a.href = canvasdata;
          document.body.appendChild(a);
          a.click();
        };
      }
    
    render() {
        var wrh = templateImage.width / templateImage.height;
        var newWidth = 600;
        var newHeight = newWidth / wrh;
        const textStyle = {
            fontFamily: "Impact",
            fontSize: "50px",
            textTransform: "uppercase",
            fill: "#FFF",
            stroke: "#000",
            userSelect: "none"
          }
      
        return (
            <>
        <Modal className="meme-gen-modal" isOpen={this.state.modalIsOpen}>
          <ModalHeader toggle={this.toggle}>Make-a-Meme</ModalHeader>
          <ModalBody>
            <svg
              width={newWidth}
              id="svg_ref"
              height={newHeight}
              ref={el => { this.svgRef = el }}
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink">
              <image
                ref={el => { this.imageRef = el }}
                xlinkHref={this.state.currentImagebase64}
                height={newHeight}
                width={newWidth}
              />
              <text
                style={{ ...textStyle, zIndex: this.state.isTopDragging ? 4 : 1 }}
                x={this.state.topX}
                y={this.state.topY}
                dominantBaseline="middle"
                textAnchor="middle"
                onMouseDown={event => this.handleMouseDown(event, 'top')}
                onMouseUp={event => this.handleMouseUp(event, 'top')}
              >
                  {this.state.toptext}
              </text>
              <text
                style={textStyle}
                dominantBaseline="middle"
                textAnchor="middle"
                x={this.state.bottomX}
                y={this.state.bottomY}
                onMouseDown={event => this.handleMouseDown(event, 'bottom')}
                onMouseUp={event => this.handleMouseUp(event, 'bottom')}
              >
                  {this.state.bottomtext}
              </text>
            </svg>
            <div className="meme-generator">
                <label>Select an Image</label>
                <input type="file" id="imageFileInput" ></input>
                <FormGroup>
                    <label>Top Text</label>
                    <input type="text" 
                    id="topTextInput"
                    placeholder="Add text to the top"
                    value={this.state.topText}
                    name="topText"
                    onChange={this.handleChange}>
                </input>
                </FormGroup>
                <FormGroup>
                    <label>Bottom Text</label>
                    <input type="text" 
                    id="bottomTextInput"
                    placeholder="Add text to the bottom"
                    value={this.state.bottomText}
                    name="bottomText"
                    onChange={this.handleChange}>
                    </input>
                </FormGroup>
                
                <canvas id="meme"></canvas>
                <button onClick={() => this.convertSvgToImage()} className="btn btn-primary">Download Meme!</button>
            </div>
            </ModalBody>
        </Modal>
        </>
        );
    }
}
  export default MemeEditor;
