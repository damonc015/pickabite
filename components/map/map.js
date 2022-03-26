import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
  Fragment,
} from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  Circle,
} from "@react-google-maps/api";
import Menu from "../menu/menu";
import classes from "./map.module.css";
import Loading from "../loading/loading";
import { AiOutlineMenuUnfold } from "react-icons/ai";

const Map = (props) => {
  const {gKey} = props;
  const libraries = useRef(["places"]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: gKey,
    libraries: libraries.current,
  });

  const [area, setArea] = useState();
  const mapRef = useRef();
  const [service, setService] = useState();
  const [nearbyLoc, setNearbyLoc] = useState([]);
  const [menu, setMenu] = useState(true);

  const containerStyle = {
    width: "inherit",
    height: "inherit",
  };

  const center = useMemo(
    () => ({
      lat: 40.7309,
      lng: -73.9973,
    }),
    []
  );

  const options = useMemo(() => ({
    disableDefaultUI: true,
    clickableIcons: false,
    styles: [
      {
        featureType: "poi",
        elementType: "labels",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
    ],
  }),[]);

  const onLoad = useCallback((ref) => {
    mapRef.current = ref;
    setService(
      (prev) => new window.google.maps.places.PlacesService(mapRef.current)
    );
  }, []);

  useEffect(() => {
    if (!service) return;
    service.nearbySearch(
      { location: area, radius: 1500, type: ["restaurant"] },
      (request, status) => {
        if (status === "OK") {
          let requestFiltered = request.filter((item) => {
            if (item.business_status === "OPERATIONAL") return item;
            return;
          });
          if (requestFiltered.length > 3) {
            let maxStart = requestFiltered.length - 4;
            let randomStart = Math.floor(Math.random() * maxStart);
            let randomEnd = randomStart + 3;
            let copyRequest = requestFiltered.slice(randomStart, randomEnd);
            setNearbyLoc(copyRequest);
          } else {
            setNearbyLoc(requestFiltered);
          }
        }
        return;
      }
    );
  }, [area]);

  if (loadError || !isLoaded) return <Loading />;
  return (
    <div className={classes.mapMenuContainer}>
      <Menu
        area={area}
        setArea={(area) => {
          setArea(area);
          mapRef.current?.panTo(area);
          mapRef.current?.setZoom
        }}
        locations={nearbyLoc}
        menu={menu}
        setMenu={setMenu}
      />
      <div className={menu ? classes.mapContainer : classes.altMapContainer}>
        {menu ? null : (
          <AiOutlineMenuUnfold
            className={classes.menuIconAlt}
            onClick={() => setMenu((prev) => !prev)}
          />
        )}
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={14}
          options={options}
          onLoad={onLoad}
        >
          {area && (
            <Fragment>
              <Marker position={area} />
              <Circle
                center={area}
                radius={1500}
                options={{ fillColor: "#feefc3da", strokeColor: "orange" }}
              />
            </Fragment>
          )}
        </GoogleMap>
      </div>
    </div>
  );
};

export default Map;
