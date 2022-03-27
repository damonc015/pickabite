import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { v4 as uuidv4 } from "uuid";
import classes from "./Item.module.css";
import Image from "next/image";

const LocationItem = (props) => {
  const {
    details: { name, formatted_address, photos },
  } = props;
  const sliderRef = useRef();
  return (
    <div className={classes.detailsContainer}>
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
            if (index <= 7 && index > 0) {
              return (
                <SwiperSlide key={uuidv4()}>
                  <div className={classes.slideImg}>
                    <img
                      src={item.getUrl()}
                      alt=""
                      // layout="fill"
                      // objectFit="cover"
                      style={{
                        objectFit: "contain",
                        width: "200px",
                        height: "200px",
                      }}
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
                      src={item.getUrl()}
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
      <div className={classes.locationText}>
        You&apos;re in the vicinity of <strong>{formatted_address}</strong>.
        Click below to reveal your three food options near{" "}
        <strong>{name}</strong>.
      </div>
    </div>
  );
};

export default LocationItem;
