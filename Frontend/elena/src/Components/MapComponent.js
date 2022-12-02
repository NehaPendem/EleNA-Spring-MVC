import React, { useEffect, useState } from "react";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";


const AnyReactComponent = ({ text }) => <div>{text}</div>;
export default function MapComponent(props){
  const center = {
    lat: 7.8731,
    lng: 80.7718,
  };
  const [directions, setDirections] = useState(null);
  const [isRouteEnable,setIsRouteEnable] = useState(props.directionsEnable);
  const [map, setMap] = useState(null);
  const places = [
    {lat: 25.8103146,lng: -80.1751609},
    {lat: 27.9947147,lng: -82.5943645},
    {lat: 28.4813018,lng: -81.4387899}
  ]
  const waypoints = places.map(p =>({
    location: {lat: p.lat, lng:p.lng},
    stopover: true
}));

const defaultProps = {
  center: {
     lat:25.8103146,
    lng:-80.1751609
  },
  zoom: 10
};

  useEffect(()=>{
  const origin = waypoints.shift().location;
  const destination = waypoints.pop().location;
  if(isRouteEnable){
    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
        waypoints: waypoints
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          console.log(result);
          setDirections( result);
          setIsRouteEnable(false);
          directionsRenderer.setDirections(result);
        }else {
          setDirections(null);
        }
      }
    );
   }
  },isRouteEnable);

  return (
    // Important! Always set the container height explicitly

   <div style={{ height: '100vh', width: '100%' }}>
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
        {directions && (
          <DirectionsRenderer directions={directions} />
        )}
      </GoogleMap>

    </div>
  );
}