import React from "react";

function LoadingBox() {
  return (
    <div className="wrap">
      <div className="loading">
        <div className="bounceball"></div>
        <div className="text">در حال بارگزاری </div>
      </div>
    </div>
  );
}

export default LoadingBox;
