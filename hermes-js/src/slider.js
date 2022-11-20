import React from "react";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

import pen from "./pen.png"
import target from "./target.png"
import scale from "./scale.png"
  
  export default function Slider(props) {
    console.log(props.slides)
    return (
      <div className="slide-container">
        <Fade>
          {props.slides.map(({source, media, citations, accuracy, impersonality}) => 
            <div key={source} className="slide">
              <p>{media}</p>
              <img src={source} className="slide-image"/>
              <p>{props.text}</p>
              <div>
                {[...Array(accuracy)].map((i) => <img src={pen} className="citations" />)}
                {[...Array(accuracy)].map((i) => <img src={target} className="accuracy"/>)}
                {[...Array(impersonality)].map((i) => <img src={scale} className="impersonality" />)}
              </div>
              
            </div>)}
        </Fade>
      </div>
    );
  }
  
