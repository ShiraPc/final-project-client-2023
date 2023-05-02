import React, { useEffect, useState } from 'react';
// import { Combobox, ComboboxInput, ComboboxList, ComboboxOption, ComboboxPopover } from "@reach/combobox";
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { TextField } from '@mui/material';
import { Button } from "@mui/material";
const values = ["Google, Breithaupt Street, Kitchener, ON, Canada", "Isabella", "Brasov", "Prosperity", "Jerusalem"];

//סוג של דלגייט?
type PlaceProps = {
    setOffice: (position: google.maps.LatLngLiteral) => void;
}
//האם הset office 
//מזיז את סמן המפה למקום שלו??
const AutoComplete = ({ setOffice }: PlaceProps) => {
    // const [textFieldValue,setTextFieldValue]=useState<string>("");
    const { ready, value, setValue, suggestions: { status, data }, clearSuggestions } = usePlacesAutocomplete();
    const [inputVal, setInputVal] = useState("");
    const [clearInput, setClearInput] = useState("");
    const center = { lat: 50.064192, lng: -130.605469  };
    const defaultBounds = {
        north: center.lat + 0.1,
        south: center.lat - 0.1,
        east: center.lng + 0.1,
        west: center.lng - 0.1,
    };
    useEffect(() => {
        const input = document.getElementById("searchTextField") as HTMLInputElement;
        const options = {
            bounds: defaultBounds,
            //לאיזה מדינה הוא יעשה
            componentRestrictions: { country: "il" },
            fields: ["address_components", "geometry", "icon", "name"],
            strictBounds: false,
            types: ["establishment"],
        };
        const autocomplete = new window.google.maps.places.Autocomplete(input, options);
        autocomplete.setFields(["place_id", "geometry", "name"]);
    }, []);
    
    const handleSelection = async (val: string) => {
        
    // const l= document.getElementById("searchTextField").value?document.getElementById("searchTextField").value:"";
        console.log(val) ;
        clearSuggestions();
        const result = await getGeocode({ address: val });
        //console.log(result[0].formatted_address);
        console.log(result);
        const { lat, lng } = await getLatLng(result[0]);
        // setTextFieldValue("");
        //שייך לחלק הויזואלי של הנקודה על המפה..
        //לדעתי אמור להיות מחוץ לקומפוננטה!!!
        setOffice({ lat, lng });
      setClearInput("");
    }

    return (
        <div className="search-location">
            <TextField  fullWidth label="" id="searchTextField" placeholder="Where are you going?" 
            //I changed to on blur... 
            // value={textFieldValue}
            onChange={(e=>{setClearInput(e.target.value);})}
            
            onBlur={(e) => { setClearInput(e.target.value); }} value={clearInput}/>
            <div id="search-overlay-search" className="search-input-overlay search">
                <Button variant="contained" style={{height:"55px"}} id="location-search-button" 
                onClick={() => handleSelection(clearInput)}>
               ➕להוספת יעד חדש
                </Button>
            </div>
        </div>
    );
}
export default AutoComplete;