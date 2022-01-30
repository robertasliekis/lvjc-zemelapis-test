import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import activePoints from "./info/texts";

import "./App.css";
//"homepage":"https://robertasliekis.github.io/lvjc-zemelapis-test/",
//"homepage": "http://localhost:3000/",

function App() {
  const [clickedIcon, setClickedIcon] = useState(null);

  useEffect(() => {}, []);

  return (
    <div className="App">
      <div className="content-wrapper">
        <img className="map" src={require("./images/map_icons.jpg")} alt="" />
        <div className="icons-wrapper">
          {activePoints.map((activePoint, key) => (
            <img onClick={() => setClickedIcon(key)} className={`icon icon-${activePoint.image}`} key={key} src={require(`./images/icons/${activePoint.image}.png`)} alt="" />
          ))}
        </div>
        {clickedIcon !== null ? (
          <div className="info-window">
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
