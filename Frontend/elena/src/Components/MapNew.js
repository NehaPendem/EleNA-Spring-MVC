import { useRef, useState } from "react";
import "../App.css";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";

const center = {
  lat: 7.8731,
  lng: 80.7718,
};

function MapNew() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAx4bOQUOt9oOeHhGo0Do1ChkKgDTF3PMw",
  });

  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);

  const originRef = useRef();
  const destiantionRef = useRef();

  async function calculateRoute() {
    if (originRef.current.value === "" || destiantionRef.current.value === "") {
      return;
    }
    const directionsService = new window.google.maps.DirectionsService();
    const places = [
        {lat: 25.8103146,lng: -80.1751609},
        {lat: 27.9947147,lng: -82.5943645},
        {lat: 28.4813018,lng: -81.4387899}
      ]
      const waypoints = places.map(p =>({
        location: {lat: p.lat, lng:p.lng},
        stopover: true
    }));
    const origin = waypoints.shift().location;
    const destination = waypoints.pop().location;
    const results = await directionsService.route({
      origin: origin,
      destination: destination,
      travelMode: window.google.maps.TravelMode.DRIVING,
      waypoints: waypoints
    });
    setDirectionsResponse(results);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    originRef.current.value = "";
    destiantionRef.current.value = "";
  }

  return isLoaded ? (
    <>
      <div className="searchbox">
        <div className="row">
          <div className="col-lg-4">
            <Autocomplete>
              <input
                type="text"
                name="Origin"
                className="form-control"
                placeholder="Origin"
                ref={originRef}
              />
            </Autocomplete>
          </div>
          <div className="col-lg-4">
            <Autocomplete>
              <input
                type="text"
                name="Destication"
                className="form-control"
                placeholder="Destication"
                ref={destiantionRef}
              />
            </Autocomplete>
          </div>
          <div className="col-lg-2">
            <button
              type="submit"
              name="submit"
              className="btn btn-primary"
              onClick={calculateRoute}
            >
              Search
            </button>
          </div>
          <div className="col-lg-2">
            <button
              type="submit"
              name="clear"
              className="btn btn-danger"
              onClick={clearRoute}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
      <GoogleMap
        center={center}
        zoom={5}
        mapContainerStyle={{ width: "100%", height: "100vh" }}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
        onLoad={(map) => setMap(map)}
      >
        <Marker position={center} />
        {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} />
        )}
      </GoogleMap>
    </>
  ) : (
    <></>
  );
}

export default MapNew;