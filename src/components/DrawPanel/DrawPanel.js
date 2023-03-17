/*
 * @author: jason_zuo
 * @LastEditors: jason_zuo
 * @LastEditTime: 2023-03-17 16:13:59
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
      darwStartPosition.current = {
        x: e.offsetX,
        y: e.offsetY,
      };
      let canvasCtxRef = canvasRef.current.getContext("2d");
      canvasCtxRef.strokeStyle  = colorRef.current.value;
      canvasCtxRef.beginPath();
    };
    const remove = (e) => {
      if (isDarwingRef.current) {
        let ctx = canvasRef.current.getContext("2d");
        ctx.moveTo(darwStartPosition.current.x, darwStartPosition.current.y);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        darwStartPosition.current = {
          x: e.offsetX,
          y: e.offsetY,
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
    canvasEl.addEventListener("touchstart", drawStatrt);
    canvasEl.addEventListener("touchmove", remove);
    canvasEl.addEventListener("touchend", endDraw);
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
