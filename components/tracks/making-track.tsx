import { useCallback, useMemo, useRef, useState } from "react";
import AutoComplete from "../maps/auto-complete";
import DisplayRoutes from "./routes";
import MenuAppBar from "../bar-in-map-page";
import Grid from '@mui/material/Grid';
import { Circle, GoogleMap, Marker } from "@react-google-maps/api";
import { Button } from "@mui/material";
import React from "react";
import GoogleMapReact from 'google-map-react';
import ReactMap from "../maps/react-map";
import MapContainer from "../maps/react-map";
import getOrderedArray from "./services/track.service";
// import MenuAppBar from "../BarInMapPage/MenuAppBar";
type LatLngLiteral = google.maps.LatLngLiteral;
type DirectiosResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;
export default function MakingTrack() {
  //default value later chnge it to get user location...
  let origin: google.maps.LatLng = new google.maps.LatLng(32.9315953, 35.0433023);
  let to: google.maps.LatLng = new google.maps.LatLng(32.053356, 34.7646881);
  //let pointsArr: google.maps.LatLngLiteral[]=[];
  let priority: number = 1;
  // const [office, setOffice] = useState<LatLngLiteral[] | any[]>([]);
  const [pointsArr, setPointsArr] = useState<google.maps.LatLng[]>([]);
  const [pointArr,setPointArr]=useState<google.maps.LatLng[]>([]);
  const [posArr, setPosArr] = useState<google.maps.LatLng[]>([]);
  const [posAsString, setPosAsString] = useState<string[]>([]);
  const [x, setX] = useState<number>(0);
  const center = useMemo<LatLngLiteral>(() => ({ lat: 32, lng: 35 }), []);
  const [posArrPriority, setposArrPriority] = useState<number[]>([]);
  const options = useMemo<MapOptions>(() => ({
    disableDefaultUi: true,
    clickableIcons: true,
  }), []);
  const mapRef = useRef<GoogleMap>();
  const onLoad = useCallback((map: any) => (mapRef.current = map), []);
  const pushtoarr = (position: any) => {
    setPosArr([...posArr, position]);
    // setX(x + 1);
    setposArrPriority([...posArrPriority, priority])
  }
  const pushToStringArr = (position: string) => {
    console.log("in pushToStringArr");
    console.log("before push" + posAsString.length);
    const temp = [...posAsString, position];
    console.log("in temp" + temp.length);
    setPosAsString((prev) => { return [...temp] });
    console.log("after push" + posAsString.length);
  }


  async function geocodeLatLng(geocoder: google.maps.Geocoder, latlng: LatLngLiteral) {
    // const response=await geocoder.geocode({ location: latlng });
    try {
      const response = await geocoder.geocode({ location: latlng });
      return response.results[0].formatted_address;
    }
    catch (e) {
      throw Error("dont succeed to convert" + e);
    }
  }

  async function reverseConverting(position: LatLngLiteral) {
    console.log('calling');
    const geocoder = new google.maps.Geocoder();
    return await geocodeLatLng(geocoder, position);
  }
  function changePriority(x: number): void {
    priority = x;
  }
  const cmpTrack = async () => {
    let orderedArray: any[] = [];
    // setStartPoint(new google.maps.LatLng(32.964648, 35.495997));
    // setStartPoint(new google.maps.LatLng(32.0597262, 34.7718267));
    console.log(pointArr);
    // setPointArr([...posArr]);
    orderedArray = await getOrderedArray({ lat: 31.931495, lng: 35.043102 }, posArr, posArrPriority);
    setPointArr([...orderedArray]);
    // for (let index = 0; index < orderedArray.length - 1; index++) {
    //   setStartPoint(new google.maps.LatLng(orderedArray[index][0], orderedArray[index][1]));
    //   setDestPoint(new google.maps.LatLng(orderedArray[index + 1][0], orderedArray[index + 1][1]));
    // }
    
  }
  const defaultOptions = {
    strokeOpacity: 0.5,
    strokeWeight: 2,
    clickAble: false,
    drageAble: false,
    editAble: false,
    visible: true
  }
  const closeOptions = {
    ...defaultOptions,
    zIndex: 3,
    fillOpacity: 0.05,
    strokeColor: "#8BC34A",
    fillColor: "#8BC34A"
  };
  // const Map: React.FC<{}> = () => {};
  const ref = React.useRef<HTMLDivElement>(null);
  const [map, setMap] = React.useState<google.maps.Map>();
  // let allPoints: google.maps.LatLng[] = [new google.maps.LatLng(32.9315953, 35.0433023), new google.maps.LatLng(31.9324953, 35.0431022), new google.maps.LatLng(25.123456, 26.123546)];

  React.useEffect(() => {
    console.log("useEffect");
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }
  }, [ref, map]);
  function initMap() {
    var directionsService = new google.maps.DirectionsService();
    var directionsRenderer = new google.maps.DirectionsRenderer();
    var chicago = new google.maps.LatLng(41.850033, -87.6500523);
    var mapOptions = {
      zoom: 7,
      center: chicago
    }
    // var map = new google.maps.Map(ref.current, mapOptions);
    // directionsRenderer.setMap(map);
  }

  return (<div>
    <div id="map"></div>
    <Grid container spacing={2}>
      <Grid item xs={20} md={20}>
        <MenuAppBar />
      </Grid>
      <Grid item xs={60} md={9}><div>
        <MapContainer
          allTrack={pointArr}
          allPoints={posArr}
          x={x} />
      </div></Grid>
      <Grid item xs={60} md={3}>
        
        <AutoComplete
          setOffice={(position: LatLngLiteral) => {
            // setOffice([...office, position]);
            //ממרכז את הנקודה החדשה
            mapRef.current?.panTo(position);
            pushtoarr(position);
            setX(x + 1);
          }}
        />
        {/* <div>
          <label>הליכה</label><input id="walk" type="radio" name="way"></input>
          <label>נהיגה</label><input id="drive" type="radio" name="way"></input>
        </div>
        <h4>עדיפות</h4>
        <label>אין</label>
        <input id="noPriority" type="radio" name="level" value="select" onClick={() => changePriority(2)} />
        <label>נמוכה</label>
        <input id="lowPriority" type="radio" name="level" onClick={() => changePriority(3)} />
        <label>גבוהה</label>
        <input id="highPriority" type="radio" name="level" onClick={() => changePriority(1)} /> */}
       
       {/* <routesComponent 
// latLngArr={[...posArr]} 
// home={origin}
/> */}
        <Button variant="contained" onClick={cmpTrack}>לחישוב מסלול והצגה על המפה</Button>
        {/* <Button variant="contained" onClick={navigateToTracks}>Click to Add Track </Button> */}

        {/* length={pointsArr.length}
length-pointsArr {posArr.length} */}
        {posAsString.map(p => { return <div>{p}</div> })}
      </Grid>
    </Grid>
    {/* <div>
      <label>הליכה</label><input id="walk" type="radio" name="way"></input>
      <label>נהיגה</label><input id="drive" type="radio" name="way"></input>
    </div>
    <h4>עדיפות</h4>
    <label>אין</label>
    <input id="noPriority" type="radio" name="level" value="select" onClick={() => changePriority(2)} />
    <label>נמוכה</label>
    <input id="lowPriority" type="radio" name="level" onClick={() => changePriority(3)} />
    <label>גבוהה</label>
    <input id="highPriority" type="radio" name="level" onClick={() => changePriority(1)} /> */}
    {/* <routesComponent 
// latLngArr={[...posArr]} 
// home={origin}
/> */}

    <button onClick={cmpTrack}>comput a truck</button>
    length={pointsArr.length}
    length-pointsArr {posArr.length}
    {posAsString.map(p => { return <div>{p}</div> })}

    {/* <DisplayRoutes
      home={{ lat: 36, lng: 32 }}
      latLngArr={[...pointsArr]}
      priority={posArrPriority}
    /> */}
  </div>)
}


function computeTrack(): import("react").MouseEventHandler<HTMLButtonElement> | undefined {
  throw new Error("Function not implemented.");
}

