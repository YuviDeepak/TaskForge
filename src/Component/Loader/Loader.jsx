import React from "react";

import '../Loader/Loader.css'

const Loader = () => {
  return (
    <div className="loader-container">

      <div className="glow"></div>

      <div className="loader-box">

        {/* Rotating Ring */}
        {/* <div className="ring">
          <div className="inner-box">TF</div>
        </div> */}

        {/* Text */}
        <h1 className="title">TaskForge</h1>

        {/* Dots */}
        <div className="dots">
          <span></span>
          <span></span>
          <span></span>
        </div>

        <p className="subtitle">Forging productivity...</p>

      </div>
    </div>
  );
};

export default Loader;