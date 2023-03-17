/*
 * @author: jason_zuo
 * @LastEditors: jason_zuo
 * @LastEditTime: 2023-03-17 17:04:55
 * @FilePath: \react-cloud\src\components\DrawPanel\DrawPanel.js
 */
import { useEffect, useRef } from "react";
import "./DrawPanel.css";
import Download from "../DownLoad/Download";
import { getCurrentDate } from "../../Utils/date";
const DrawPanel = ({ width = 100, height = 300 }) => {
  let colorRef = useRef();
  let canvasRef = useRef();
  let isDarwingRef = useRef(false);
  let darwStartPosition = useRef();

  useEffect(() => {
    let drawContainerEl = document.getElementById("draw-container");
    let canvasEl = document.getElementById("draw-panel");
    canvasEl.width = drawContainerEl.clientWidth;

    const drawStatrt = (e) => {
      isDarwingRef.current = true;
      const isTouch = e instanceof TouchEvent ;
      const {left,top} = canvasEl.getBoundingClientRect();
      darwStartPosition.current = {
        x: isTouch?  e.touches[0].clientX - left: e.offsetX,
        y: isTouch?  e.touches[0].clientY -top : e.offsetY,
      };
      let canvasCtxRef = canvasRef.current.getContext("2d");
      canvasCtxRef.strokeStyle  = colorRef.current.value;
      canvasCtxRef.beginPath();
    };
    const remove = (e) => {
      if (isDarwingRef.current) {
        const isTouch = e instanceof TouchEvent ;
        let ctx = canvasRef.current.getContext("2d");
        const {left,top} = canvasEl.getBoundingClientRect();
        ctx.moveTo(darwStartPosition.current.x, darwStartPosition.current.y);
        isTouch? ctx.lineTo(e.touches[0].clientX -left ,e.touches[0].clientY - top ) : ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        darwStartPosition.current = {
            x: isTouch?  e.touches[0].clientX - left: e.offsetX,
            y: isTouch?  e.touches[0].clientY -top: e.offsetY,
        };
      }
    };

    const endDraw = () => {
      let canvasCtxRef = canvasRef.current.getContext("2d");
      isDarwingRef.current = false;
      canvasCtxRef.closePath();
    };
    canvasEl.addEventListener("mousedown", drawStatrt);
    canvasEl.addEventListener("mousemove", remove);
    canvasEl.addEventListener("mouseup", endDraw);
    canvasEl.addEventListener("mouseleave", endDraw);
    canvasEl.addEventListener("touchstart", (e)=> {
        e.preventDefault()
        drawStatrt(e)
    });
    canvasEl.addEventListener("touchmove", (e) => {
        e.preventDefault()
        remove(e)
    });
    canvasEl.addEventListener("touchend", (e) =>{
        e.preventDefault()
        endDraw(e)
    });
  }, []);

  const generateUrl = () => {
    let el = document.getElementById("draw-panel");
    let url = el.toDataURL("image/png", 1);
    return url;
  };

  const generateFileName = (fileName) => {
    const { year, month, day } = getCurrentDate();
    return fileName + "-" + year + "-" + month + "-" + day;
  };

  const changeColor = () => {
    console.log(colorRef.current.value)
  }
  
  return (
    <div className="draw-container" id="draw-container">
      <div className="color-select">
        <label>Choose color &nbsp;&nbsp;&nbsp;</label>
        <input type="color" ref={colorRef} onChange={changeColor}/>
      </div>
      <canvas
        className="draw-panel"
        id="draw-panel"
        width={width}
        height={height}
        ref={canvasRef}
      >
        hi
      </canvas>
      <Download
        fileName={() => generateFileName("art")}
        generateUrl={generateUrl}
        btnName={"Export"}
      />
    </div>
  );
};

export default DrawPanel;
