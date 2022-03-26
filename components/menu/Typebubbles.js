import React from "react";
import classes from "./Typebubbles.module.css";
import { v4 as uuidv4 } from "uuid";

const Typebubbles = (props) => {
  const { type } = props;

  return (
    <div className={classes.bubblesContainer}>
      {type.map((item) => {
        let formattedItem = item;
        if (item.includes("_")) {
          formattedItem = item.replaceAll("_", " ");
        }
        return (
          <div className={classes.bubble} key={uuidv4()}>
            {formattedItem}
          </div>
        );
      })}
    </div>
  );
};

export default Typebubbles;
