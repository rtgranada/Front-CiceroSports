import React from "react";
import "./loading.scss";
import { ColorRing } from "react-loader-spinner";

export const ComponentSpinner = () => {
  return (
    <div className="spinner-container">
      {/* <div className="loading-spinner"></div> */}
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
      />
    </div>
  );
};
