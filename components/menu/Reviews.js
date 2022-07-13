import React, { useState } from "react";
import classes from "./Reviews.module.css";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { v4 as uuidv4 } from "uuid";

const Reviews = (props) => {
  const { name, reviews } = props;
  const [hideReview, setHideReview] = useState(true);

  return (
    <div className={classes.titleAndReview}>
      <h3
        className={classes.reviewTitle}
        onClick={() => {
          setHideReview((prev) => !prev);
        }}
      >
        See Reviews from {name}{" "}
        {hideReview ? (
          <IoIosArrowDown className={classes.arrow} />
        ) : (
          <IoIosArrowUp className={classes.arrow} />
        )}
      </h3>
      <div
        className={classes.allReviewContainer}
        style={hideReview ? { height: "0" } : null}
      >
        {reviews.map((item, index) => {
          const {
            author_name,
            profile_photo_url,
            rating,
            relative_time_description,
            text,
          } = item;
          

          let stars = new Array(rating).fill("1");

          return (
            <div className={classes.reviewContainer} key={uuidv4()}>
              <div className={classes.userContainer}>
                <span className={classes.userImg}>
                  <Image
                    src={profile_photo_url}
                    alt=""
                    layout="fill"
                    objectFit="contain"
                  />
                </span>
                <span>{author_name}</span>
              </div>
              <div className={classes.ratingContainer}>
                <span className={classes.ratings}>
                  {stars.map((item) => {
                    return <FaStar key={uuidv4()} />;
                  })}
                </span>
                <span className={classes.time}>
                  {relative_time_description}
                </span>
              </div>
              <div className={classes.textContainer}>{text}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Reviews;
