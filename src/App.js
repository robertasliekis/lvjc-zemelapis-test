import React, { useState, useEffect, useRef } from "react";

import { connect } from "react-redux";
import activePoints from "./info/texts";

import "./App.css";
//"homepage":"https://robertasliekis.github.io/lvjc-zemelapis-test/",
//"homepage": "http://localhost:3000/",

function App() {
  const [clickedIcon, setClickedIcon] = useState(null);
  const [infoWindowTop, setInfoWindowTop] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);

  const iconRef = useRef([]);
  const contentRef = useRef();

  useEffect(() => {}, []);

  const selectIcon = (key) => {
    const position = window.getComputedStyle(iconRef.current[key]).getPropertyValue("top");
    const screenWidth = contentRef.current.getBoundingClientRect().width;

    setContentWidth(screenWidth);

    const iconTopPosition = parseInt(position.substring(0, position.length - 2));

    if (key === 10) {
      if (screenWidth > 1000) {
        setInfoWindowTop(window.innerHeight / 1.3);
      } else if (screenWidth > 800) {
        setInfoWindowTop(window.innerHeight / 2);
      } else if (screenWidth > 600) {
        setInfoWindowTop(window.innerHeight / 2.5);
      } else {
        setInfoWindowTop(50);
      }
    } else {
      setInfoWindowTop(iconTopPosition);
    }

    setClickedIcon(key);
  };

  return (
    <div className="App">
      <div className="content-wrapper" ref={contentRef}>
        <img className="map" src={require("./images/map_icons.jpg")} alt="" />
        <div className="icons-wrapper">
          {activePoints.map((activePoint, key) => (
            <img
              onClick={() => selectIcon(key)}
              ref={(ref) => (iconRef.current[key] = ref)}
              className={`icon icon-${activePoint.image}`}
              key={key}
              src={require(`./images/icons/${activePoint.image}.png`)}
              alt=""
            />
          ))}
        </div>
        {clickedIcon !== null ? (
          <div className="info-window" style={{ top: contentWidth > 420 ? infoWindowTop : "10px" }}>
            <div onClick={() => setClickedIcon(null)} className="btn-close"></div>
            <div className="text">
              <h3>{activePoints[clickedIcon].title}</h3>
              {activePoints[clickedIcon].description.map((text, key) =>
                typeof text === "string" ? (
                  <p key={key}>{text}</p>
                ) : (
                  <ul key={key}>
                    {text.map((listItem, listItemKey) => (
                      <li key={listItemKey} dangerouslySetInnerHTML={{ __html: `<div></div>${listItem}` }}></li>
                    ))}
                  </ul>
                )
              )}
            </div>
          </div>
        ) : null}
        <img className="flag-board" src={require("./images/flag_board.png")} alt="" />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    pageNumber: state.changePageNumber.pageNumber,
  };
};

export default connect(mapStateToProps)(App);
