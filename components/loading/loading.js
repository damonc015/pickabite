import React from "react";
import classes from "./loading.module.css";
import ClipLoader from "react-spinners/ClipLoader";

const Loading = () => {
  return (
    <div className={classes.loadingContainer}>
      <ClipLoader size={60} color={"#3367D6"} speedMultiplier={0.6} />
    </div>
  );
};

export default Loading;
