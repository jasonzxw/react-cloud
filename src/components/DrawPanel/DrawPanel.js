/*
 * @author: jason_zuo
 * @LastEditors: jason_zuo
 * @LastEditTime: 2023-03-20 17:28:13
 * @FilePath: \react-cloud\src\components\DrawPanel\DrawPanel.js
 */
import { useEffect, useRef } from "react";
import "./DrawPanel.css";
import Download from "../DownLoad/Download";
import { getCurrentDate } from "../../Utils/date";
import Button from "../Button/Button";
const DrawPanel = ({ width = 100, height = 300 }) => {
  let colorRef = useRef();
  let backgroundColorRef = useRef()
  let canvasRef = useRef();
  let isDarwingRef = useRef(false);
  let isCleaningRef = useRef(false);
  let darwStartPosition = useRef();
  let drawLinwWidth = useRef(2.0) ;
  let cleanStarPosition = useRef();

  useEffect(() => {
    let drawContainerEl = document.getElementById("draw-container");
    let canvasEl = document.getElementById("draw-panel");
    let width = (canvasEl.width = drawContainerEl.clientWidth);
    let { height } = canvasEl.getBoundingClientRect();
    // 解决锯齿但是不明显
    const init = () => {
      const dlp = window.devicePixelRatio;
      const screenScale = window.screen.width / 750
      canvasEl.style.width = width + "px";
      canvasEl.style.height = height + "px";

      canvasEl.width = parseInt(screenScale * width) * dlp
      canvasEl.height = parseInt(screenScale * height) * dlp

    //   canvasEl.width = width * dlp;
    //   canvasEl.height = height * dlp;
      let ctx = canvasEl.getContext("2d");
      ctx.scale(devicePixelRatio * screenScale, devicePixelRatio * screenScale);
    };
    init();

    const drawStatrt = (e) => {
      if (!isCleaningRef.current) {
        isDarwingRef.current = true;
      }
      darwStartPosition.current = {
        x: e.offsetX,
        y: e.offsetY,
      };
      let canvasCtxRef = canvasRef.current.getContext("2d");
      canvasCtxRef.lineWidth  = drawLinwWidth.current;
      canvasCtxRef.strokeStyle = colorRef.current.value;
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
      if (isCleaningRef.current) {
        let ctx = canvasRef.current.getContext("2d");
        ctx.clearRect(e.offsetX, e.offsetY, 10, 10);
      }
    };

    const endDraw = () => {
      let canvasCtxRef = canvasRef.current.getContext("2d");
      isDarwingRef.current = false;
      canvasCtxRef.closePath();
    };

    const mobileDrawStatrt = (e) => {
      e.preventDefault();
      if (!isCleaningRef.current) {
        isDarwingRef.current = true;
      }
      const { left, top } = canvasEl.getBoundingClientRect();
      darwStartPosition.current = {
        x: e.touches[0].clientX - left,
        y: e.touches[0].clientY - top,
      };
      let canvasCtxRef = canvasRef.current.getContext("2d");
      canvasCtxRef.lineWidth  = drawLinwWidth.current;
      canvasCtxRef.strokeStyle = colorRef.current.value;
      canvasCtxRef.beginPath();
    };

    const mobileRemove = (e) => {
      e.preventDefault();
      if (isDarwingRef.current) {
        let ctx = canvasRef.current.getContext("2d");
        const { left, top } = canvasEl.getBoundingClientRect();
        ctx.moveTo(darwStartPosition.current.x, darwStartPosition.current.y);
        ctx.lineTo(e.touches[0].clientX - left, e.touches[0].clientY - top);
        ctx.stroke();
        darwStartPosition.current = {
          x: e.touches[0].clientX - left,
          y: e.touches[0].clientY - top,
        };
      }
      if (isCleaningRef.current) {
        let ctx = canvasRef.current.getContext("2d");
        const { left, top } = canvasEl.getBoundingClientRect();
        ctx.clearRect(
          e.touches[0].clientX - left,
          e.touches[0].clientY - top,
          10,
          10
        );
      }
    };

    const mobileEndDraw = (e) => {
      e.preventDefault();
      let canvasCtxRef = canvasRef.current.getContext("2d");
      isDarwingRef.current = false;
      canvasCtxRef.closePath();
    };

    canvasEl.addEventListener("mousedown", drawStatrt);
    canvasEl.addEventListener("mousemove", remove);
    canvasEl.addEventListener("mouseup", endDraw);
    canvasEl.addEventListener("mouseleave", endDraw);
    canvasEl.addEventListener("touchstart", mobileDrawStatrt);
    canvasEl.addEventListener("touchmove", mobileRemove);
    canvasEl.addEventListener("touchend", mobileEndDraw);
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



  const showColorExample = () => {
    // const el = document.getElementById("color-example");
    // el.style.display = "inline-block";
    // el.style.backgroundColor = colorRef.current.value;
    const btn = document.getElementById('btn_colorpen')
    btn.style.backgroundColor = colorRef.current.value;
    btn.style.borderColor = colorRef.current.value;
  };



  const showCanvasBackgroundColor = () => {
    const el = document.getElementById("draw-panel");
    el.style.borderColor = backgroundColorRef.current.value;
    el.style.borderWidth = '1px'
    el.style.backgroundColor = backgroundColorRef.current.value;

    // 解决canvas导出时背景色问题，设置style不工作
    let ctx = el.getContext("2d");
    ctx.fillStyle = backgroundColorRef.current.value;
    ctx.fillRect(0, 0, el.width, el.height);

    const btn = document.getElementById('btn_backgrouncolor');
    btn.style.backgroundColor = backgroundColorRef.current.value;
    btn.style.borderColor = backgroundColorRef.current.value;
  };

  const changeColor = (e) => {
    colorRef.current.click();
    actionAnimaton();
    e.target.classList.add('btn_active');
  };

  const changeBackgroundColor = (e) => {
    backgroundColorRef.current.click();
    actionAnimaton();
    e.target.classList.add('btn_active');
  };

  const enableCleaneStatus = (e) => {
    isDarwingRef.current = false;
    isCleaningRef.current = true;
    actionAnimaton();
    e.target.classList.add('btn_active');
  };

  const disableCleaneStatus = (e) => {
    isCleaningRef.current = false;
    actionAnimaton();
    e.target.classList.add('btn_active');
  };

  const expandLineWidth = (e) => {
    actionAnimaton();
    drawLinwWidth.current += 2.0
    e.target.classList.add('btn_active');

  }
  const cleanScreen = (e) => {
    actionAnimaton();
    let canvasCtxRef = canvasRef.current.getContext("2d");
    canvasCtxRef.clearRect(0,0,canvasRef.current.width,canvasRef.current.height)
    e.target.classList.add('btn_active');
  }

  const actionAnimaton = () => {
    const btn_ilst = ['btn_colorpen' ,'btn_colorclean','btn_draw' , 'btn_backgrouncolor','btn_linewidth','btn_clearscreen'];
    btn_ilst.forEach(id => {
        const el = document.getElementById(id);
        el.classList.remove('btn_active');
    })
  }


  return (
    <div className="draw-container" id="draw-container">
      <div className="draw-action">
        <div className="color-select">
          <Button text={"笔颜色"} click={changeColor} id='btn_colorpen'/>
          <span id="color-example" className="color-example"></span>
          <input type="color" ref={colorRef} onChange={showColorExample}/>
        </div>
        <div className="clean-select">
          <Button text={"橡皮擦"} click={enableCleaneStatus} id='btn_colorclean'/>
        </div>
        <div className="backgroundcolor-select">
          <Button text={"背景色"} click={changeBackgroundColor} id='btn_backgrouncolor'/>
          <input type="color" ref={backgroundColorRef} onChange={showCanvasBackgroundColor} />
        </div>
        <div className="draw-select">
          <Button text={"画画"} click={disableCleaneStatus} id='btn_draw'/>
        </div>
        <div className="linewidth-select">
          <Button text={"笔粗细"} click={expandLineWidth} id='btn_linewidth'/>
        </div>
        <div className="clearscreen-select">
          <Button text={"清屏"} click={cleanScreen} id='btn_clearscreen'/>
        </div>
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
