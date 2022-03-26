/* eslint-disable react/jsx-key */
/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
/* eslint-disable react/prop-types */
import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

import { Field } from "formik";
let defaultCenter = { lat: 47.91, lng: 106.91 };

export default function FormikGoogleMap({ name }) {

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    // googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places", " geometry"]
  });
  const onLoad = React.useCallback(function callback(map) {
    // const bounds = new window.google.maps.LatLngBounds();
    // map.fitBounds(bounds);
    // setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
  }, []);
  return (
    isLoaded ? (<Field name={name}>{
      fieldProps => {

        const {
          field: { value },
          form: { setFieldValue, setFieldTouched, setFieldError, values, setValues }
        } = fieldProps;

        return (
          <div >
            {/* <GooglePlacesAutocomplete
              apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
            /> */}
            {/* <GoogleSuggest coords={value} onChange={coords => setFieldValue(name,coords)}/> */}
            <div style={{ height: 10 }} />
            <GoogleMap
              mapContainerStyle={{
                width: "100%",
                height: "450px"
              }}
              onClick={(position) => {
                console.log("Marker: ", position);

                setFieldValue(name,
                  {
                    lat: position.latLng.lat(),
                    lng: position.latLng.lng(),
                  }
                );
              }}
              center={defaultCenter}
              zoom={12}
              onLoad={onLoad}
              onUnmount={onUnmount}
            // {...(value ? {
            //   center: {
            //     lat: parseFloat(value.lat),
            //     lng: parseFloat(value.lng)
            //   }
            // } :{})}
            >
              {value && <Marker position={{ lat: parseFloat(value.lat), lng: parseFloat(value.lng) }} />}

            </GoogleMap>
          </div>
        );
      }
    }
    </Field>) : (
      <div>
        Map loading
      </div>
    )
  );
};
