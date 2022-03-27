import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import Image from "next/image";
import Reviews from "./Reviews";
import Typebubbles from "./Typebubbles";
import { v4 as uuidv4 } from "uuid";
import "swiper/css";
import "swiper/css/pagination";
import { FaStar } from "react-icons/fa";
import { BsCurrencyDollar } from "react-icons/bs";
import classes from "./Item.module.css";
import { getDetails } from "use-places-autocomplete";
import { FaDrumstickBite } from "react-icons/fa";

const Item = (props) => {
  const { placeId } = props;
  const sliderRef = useRef();
  const [hideItem, setHideItem] = useState(true);
  const [itemDetails, setItemDetails] = useState([]);

  const timer = useRef(Math.floor(Math.random() * 3));

  function getItemDetails() {
    setTimeout(() => {
      getDetails({
        placeId: placeId,
        fields: [
          "name",
          "rating",
          "user_ratings_total",
          "reviews",
          "price_level",
          "photos",
          "types",
        ],
      })
        .then((details) => {
          setItemDetails(details);
        })
        .catch((e) => console.log(e));
    }, timer);
  }

  useEffect(() => {
    sliderRef.current.swiper.slideTo(0);
  }, [itemDetails]);

  if (itemDetails) {
    const {
      name,
      rating,
      user_ratings_total,
      price_level,
      photos,
      reviews,
      types,
    } = itemDetails;

    let arr, arr2;

    if (price_level) {
      arr = new Array(price_level).fill("1");
    }
    if (rating) {
      arr2 = new Array(Math.floor(rating)).fill("1");
    }

    return (
      <div
        className={classes.detailsContainer}
        style={hideItem ? null : { height: "auto" }}
      >
        {hideItem ? (
          <div
            className={hideItem ? classes.detailsContainerHide : classes.flip}
            onClick={() => {
              if (hideItem) {
                setHideItem(false);
                getItemDetails();
              }
            }}
          >
            <p>
              <FaDrumstickBite className={classes.meatIcon} />
            </p>
          </div>
        ) : null}

        <Swiper
          tag="div"
          ref={sliderRef}
          modules={[Navigation, Pagination]}
          className={classes.swiper}
          initialSlide={0}
          navigation
          pagination
        >
          {photos ? (
            photos.map((item, index) => {
              let src = item.getUrl()
              if (index <= 7 && index > 0) {
                return (
                  <SwiperSlide key={uuidv4()}>
                    <div className={classes.slideImg}>
                      <Image
                        src={src}
                        alt=""
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                  </SwiperSlide>
                );
              }
              if (index === 0) {
                return (
                  <SwiperSlide key={uuidv4()}>
                    <div className={classes.slideImg}>
                      <Image
                        src={src}
                        alt=""
                        layout="fill"
                        objectFit="cover"
                        priority={true}
                      />
                    </div>
                  </SwiperSlide>
                );
              }
              return;
            })
          ) : (
            <SwiperSlide>
              <div className={classes.slideImg}>
                <Image
                  src={"/defaultLocationImage.png"}
                  alt=""
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </SwiperSlide>
          )}
        </Swiper>
        <h2 className={classes.slideTitle}>{name}</h2>
        <div className={classes.infoContainer}>
          <div className={classes.ratingContainer}>
            <div className={classes.rating}>
              {rating && (
                <span>
                  {rating}{" "}
                  {arr2.map((item, index) => {
                    return <FaStar className={classes.star} key={uuidv4()} />;
                  })}
                </span>
              )}
              {user_ratings_total && (
                <span style={{ color: "#00b7ff" }}>
                  {user_ratings_total} reviews
                </span>
              )}
            </div>
            {price_level && (
              <span>
                {arr.map((item, index) => {
                  return (
                    <BsCurrencyDollar
                      style={{ color: "#5EBA7D" }}
                      key={uuidv4()}
                    />
                  );
                })}
              </span>
            )}
          </div>
        </div>
        {types && <Typebubbles type={types} />}
        {reviews && <Reviews name={name} reviews={reviews} />}
      </div>
    );
  }
  return;
};

export default Item;
