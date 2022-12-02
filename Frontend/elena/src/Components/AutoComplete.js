import { useRef, useEffect } from "react";
import React from 'react';
const AutoComplete = ({placeHolder}) => {
 const autoCompleteRef = useRef();
 const inputRef = useRef();
 const options = {
  componentRestrictions: { country: "usa" },
  fields: ["address_components", "geometry", "icon", "name"],
  types: ["establishment"]
 };
 useEffect(() => {
  autoCompleteRef.current = new window.google.maps.places.Autocomplete(
   inputRef.current,
   options
  );

 autoCompleteRef.current.addListener("place_changed", async function () {
    const place = await autoCompleteRef.current.getPlace();
    console.log({ place });
   });
  }, []);

 return (
  <div>
   <input ref={inputRef} className='field' placeholder={placeHolder}/>
  </div>
 )
};
export default AutoComplete;