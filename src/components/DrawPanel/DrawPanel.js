/*
 * @author: jason_zuo
 * @LastEditors: jason_zuo
 * @LastEditTime: 2023-03-17 14:34:08
 * @FilePath: \react-cloud\src\components\DrawPanel\DrawPanel.js
 */
import { useEffect, useRef, useState } from "react";
import "./DrawPanel.css";
import Download from "../DownLoad/Download";
import { getCurrentDate } from "../../Utils/date";
const DrawPanel = ({ width = 100, height = 300 }) => {
  const [canvasEl, setCanvasEl] = useState(null);
  const [ctx, setCtx] = useState(null);
  let colorRef = useRef();
  let shapeRef = useRef();
  let canvasRef = useRef();
  let canvasCtxRef = useRef();
  let isDarwingRef = useRef(false);
  let darwStartPosition = useRef();

  const drawShape = ({ type = "default" }) => {};

  const drawRectangle = ({ stroke = true, x, y, width, height }) => {
    if (stroke) {
      ctx.strokeRect(x, y, width, height);
    } else {
      ctx.fillRect(x, y, width, height);
    }
  };

  useEffect(() => {
    let drawContainerEl = document.getElementById("draw-container");
    let canvasEl = (canvasRef = document.getElementById("draw-panel"));
    canvasCtxRef = canvasEl.getContext("2d");
    setCtx(canvasEl.getContext("2d"));
    setCanvasEl(canvasEl);
    canvasEl.width = drawContainerEl.clientWidth;

    const drawStatrt = (e) => {
      isDarwingRef.current = true;
      darwStartPosition.current = {
        x: e.offsetX,
        y: e.offsetY,
      };
      canvasCtxRef.strokeStyle  = colorRef.current.value;
      canvasCtxRef.beginPath();
    };
    const remove = (e) => {
      if (isDarwingRef.current) {
        let ctx = canvasCtxRef;
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
