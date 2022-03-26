import React, { useState } from "react";
import classes from "./menu.module.css";
import { FaDrumstickBite } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { AiOutlineMenuFold } from "react-icons/ai";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
  getDetails,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import Item from "./Item";
import LocationItem from "./LocationItem";

const Menu = ({ area, setArea, locations, menu, setMenu }) => {
  const {
    ready,
    value,
    setValue,
    suggestions,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({
    origin: { area },
    debounce: 500,
  });

  const [details, setDetails] = useState();

  const menuRef = useOnclickOutside(() => {
    clearSuggestions();
  });

  const handleSelect =
    ({ description, place_id }) =>
    () => {
      setValue(description, false);
      clearSuggestions();
      getGeocode({ address: description })
        .then((results) => getLatLng(results[0]))
        .then(({ lat, lng }) => {
          setArea({ lat, lng });
        })
        .catch((error) => {
          console.log(error);
        });
      getDetails({
        placeId: place_id,
        fields: ["name", "formatted_address", "photos", "types"],
      })
        .then((details) => {
          setDetails(details);
        })
        .catch((e) => console.log(e));
    };

  const handleDefaultSelect = (e) => {
    handleSelect(data[0]);
    console.log(data[0]);
    e.preventDefault();
  };

  return (
    <div className={menu ? classes.menuContainer : classes.menuContainerAlt}>
      <div className={classes.menuTitle}>
        <h1 style={{ position: "relative", textAlign: "center" }}>
          Pick a <span style={{ color: "#00b7ff" }}>Bite</span>{" "}
          <FaDrumstickBite />
          {menu && (
            <AiOutlineMenuFold
              className={classes.menuIcon}
              onClick={() => setMenu((prev) => !prev)}
            />
          )}
        </h1>

        <form
          className={classes.listContainer}
          ref={menuRef}
          onSubmit={handleDefaultSelect}
        >
          <input
            className={classes.listInput}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Search for restaurants around a location"
            disabled={!ready}
          />
          <IoMdSearch className={classes.searchIcon} />

          {status === "OK" && (
            <ul className={classes.listResults}>
              {data.map((item) => (
                <li
                  key={item.place_id}
                  className={classes.listItem}
                  onClick={handleSelect(item)}
                >
                  <span className={classes.listItemTitle}>
                    {item.structured_formatting.main_text}{" "}
                  </span>
                  {item.structured_formatting.secondary_text}
                </li>
              ))}
            </ul>
          )}
        </form>
      </div>
      {details ? (
        <LocationItem details={details} />
      ) : (
        <div className={classes.defaultText}>
          <p>
            Solving the age old question &quot;What <i>do</i> you want to
            eat?&quot;
          </p>
          <p> Search a location to receive up to three food options nearby.</p>
          <p>Unveil them one at a time and see the luck of your draw!</p>
        </div>
      )}
      {locations &&
        locations.map((location) => {
          return (
            <Item
              key={location.place_id + location.name}
              placeId={location.place_id}
            />
          );
        })}
    </div>
  );
};

export default Menu;
