import { GoogleMap } from "@react-google-maps/api";
import { useCallback, useMemo, useRef, useState,useEffect } from "react";
import Grid from '@mui/material/Grid';
import MenuAppBar from "../bar-in-map-page";
import AutoComplete from "../maps/auto-complete";
import Distance from "../maps/distance";
import axios from "axios";
import { Button } from "@mui/material";
import { FormDialogLocation } from "../admin/addLocation";
import locationStore from "../../data/location";
import Location from "../../interfaces/Location";
import { useNavigate } from "react-router-dom";
import RoutesComponent from "../routes/routes"
// import Track from '../track/Track';
type LatLngLiteral = google.maps.LatLngLiteral;
type DirectiosResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;

export default function Track() {
  let priority:number=1;
  const [posArr,setPosArr]=useState<LatLngLiteral[]>([]);
  const [posAsString,setPosAsString]=useState<string[]>([]);
  const [posArrPriority,setposArrPriority]=useState<number[]>([]);
  const [locations,setLocations]= useState<Location[]>([]);
  const navigate = useNavigate();
  const pinColor='#000000';
  // const [office,setOffice]=useState<LatLngLiteral|any>()
    const [office, setOffice] = useState<LatLngLiteral[]|any[]>();
    const [directions, setDirections] = useState<DirectiosResult>();
    //array of all the destinations
    //const cont=document.getElementById("container");
    // useEffect(() => {
    //   //document.getElementById("container")?.innerHTML=("abcd");
    //   document.title = `You clicked${posArr.length} times`;
    //   console.log(posArr);
    // },[posArr])
    const[destinations,setDestinations]=useState<DirectiosResult[]>();
    const mapRef = useRef<GoogleMap>()
    const center = useMemo<LatLngLiteral>(() => ({ lat: 32, lng: 35 }), []);
    const JerusalemPosition = useMemo<LatLngLiteral>(() => ({ lat: 31.771959, lng: 35.217018 }), []);
    const options = useMemo<MapOptions>(() => ({
        disableDefaultUi: true,
        clickableIcons: true,
    }), []);
    // const optionsMarker = {
    //     imagePath:
    //         'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m', // so you must have m1.png, m2.png, m3.png, m4.png, m5.png and m6.png in that folder
    // }

    const onLoad = useCallback((map: any) => (mapRef.current = map), []);

    const houses = useMemo(() => generateHouses(), [center]);
    console.log(houses.map(element => element.lat));
    useEffect(() => {
      getAllLocations();
      navigator.geolocation.getCurrentPosition(function(position){
        //TODO
      setOffice([office,{lat:position.coords.latitude,lng:position.coords.longitude}]);
    })
      },[]);

    const fetchDirections = (_houses: LatLngLiteral) => {
        if (!office) return;
        const service = new google.maps.DirectionsService();
        service.route(
            {
                origin: _houses,
                destination: office[0],
                travelMode: google.maps.TravelMode.DRIVING
            },
            (result, status) => {
                if (status === "OK" && result) {
                    setDirections(result);
                }
            }
        )
    }
    const navigateToTracks=()=>{
      alert("navigate to tracks");
      navigate(`/track`);
      
    }
    const getAllLocations= async () => {
      const locations= await locationStore.getLocations();
      console.log(locations);
      if(locations) setLocations(locations);
    }

    const enterLocation=()=>{
      console.log("Entering location");
    }
//generic push

    // const pushtoarr=(position: any,arrName:any,setFunc:String)=>{
    //   const temp=arrName;
    //   
    //   temp.push(position);
    //   const str=setFunc;
    //  // window[setFunc](temp);
    //   window[setFunc](temp);
    //   setPosArr(temp);
    //   setPosArrLength(prev=>prev+1);
    // }

    const pushtoarr=(position: any)=>{
        const temp=[...posArr,position];
        //temp.push(position);
        setPosArr(temp);
        posArrPriority.push(priority);
    }
    const pushToStringArr=(position:string)=>{
      console.log("in pushToStringArr");
      console.log("before push"+posAsString.length);
      const temp=[...posAsString,position];
      console.log("in temp"+temp.length);
      setPosAsString((prev)=>{return [...temp]});
      console.log("after push"+posAsString.length);
    }

async function geocodeLatLng(  geocoder: google.maps.Geocoder,latlng:LatLngLiteral)
  {
    // const response=await geocoder.geocode({ location: latlng });
    try{
      const response= await geocoder.geocode({location:latlng});
      return response.results[0].formatted_address;
    }
    catch(e){
      throw Error("dont succeed to convert"+e);
    }
  }


  // const stopRunning=setTimeout(()=>{console.log("together")},10000);
async function reverseConverting(position:LatLngLiteral) {
  console.log('calling');
  const geocoder = new google.maps.Geocoder();
  // stopRunning();
   return await geocodeLatLng(geocoder,position);
  
  // expected output: "resolved"
}

var origin1 = new google.maps.LatLng(55.930385, -3.118425);



// const reverseConverting:any =(position:LatLngLiteral)=>
// {
//   const geocoder = new google.maps.Geocoder();
//   return geocodeLatLng(geocoder,position);
// }

function changePriority(x: number): void {
  priority=x;
  console.log("x="+x);
}

  return <div className="container">
    
    <Grid container spacing={2}>
    <Grid item xs={20} md={20}>
                <MenuAppBar/>
        </Grid>
      <Grid item xs={60} md={9}>
       <div>{posArr.length}</div>
        {/*
        posAsString.map((a)=>{return(<div>{a},{posArrPriority[0]}</div>)
        })*/
        }
        {posArr.map((a)=>{return <div>{a.lat}</div>})}
      <AutoComplete
                    setOffice={(position:LatLngLiteral) => {
                      const point=new google.maps.LatLng(position.lat, position.lng);
                      console.log(point.toString()+":   tostring");
                      console.log(point.toUrlValue().toString()+":   urlvalue")
                      console.log("num of items before adding"+posArr.length);
                      const temp:LatLngLiteral[]=posArr;
                      console.log("num of items of temp"+temp.length);
                      pushtoarr(position);
                      //console.log(reverseConverting(position)+"back from reverse converting");
                      reverseConverting(position).then((res)=>{
                      //   pushToStringArr(res);
                       console.log(res+"back from reverse converting");
                    });
                      //setPosArrLength(prev=>prev+1);
                     // pushToStringArr(asyncCall(position));
                      //pushtoarr(position,posArr,"setPosArr");
                      // temp.push(position);
                      // setPosArr(temp);
                      console.log("num of items after adding"+posArr.length);
                      
                    }} />
                    {/* <h4>עדיפות</h4>
                    <label>אין</label>
                    <input id="noPriority" type="radio" name="level" value="select" onClick={()=>changePriority(2)}/>
                    <label>נמוכה</label>
                    <input id="lowPriority" type="radio" name="level" onClick={()=>changePriority(3)}/>
                    <label>גבוהה</label>
                    <input id="highPriority" type="radio"name="level" onClick={()=>changePriority(1)}/> */}
         {/* <div className="map">
          <GoogleMap
            zoom={10} center={center}
            mapContainerClassName="mapContainer"
            options={options}
            onLoad={onLoad} >
             {directions&&(<DirectionsRenderer directions={directions}
                 options={{polylineOptions:{
                    zIndex:50,
                    strokeColor:"#1976D2",
                    strokeWeight:5,
                    },
                 }}/>)}
                 
                {office && (
                    <>

                      {office.map((o)=><div><Marker position={o}/>
                        <MarkerClusterer>
                        {(clusterer:any|MarkerClusterer | Readonly<MarkerClusterer>): any=>
                         houses.map((h:LatLngLiteral) => (
                        <Marker
                          key={h.lat}
                          icon={{path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                            strokeColor: "black",
                            scale: 5}}
                          position={h}
                          clusterer={clusterer}
                          onClick={()=>{
                            fetchDirections(h)
                          }}
                          />
                          ))
                          }
                       </MarkerClusterer>
                       <Marker position={o} />
              <Circle center={o} radius={5000} options={closeOptions} /></div>)}


            </>)}
          </GoogleMap> 
      </div> */}
      </Grid>
      <Grid item xs={60} md={3}>
      
      <div className="controls">
        {/*  */}
        
            
      
                {!office && <p>Enter the address of you</p>}
                {directions&&<Distance leg={directions.routes[0].legs[0]}/>}
                
                {/*באופשן... כאן צריך לעבור על כל הנקודות, ולהציג לכל נקודה פרטים */}
                <select name="test" id="test"  placeholder="Enter location">
                {locations.map(location=>{
                  return(
                    <option onClick={enterLocation}>{location.name}</option>
                  )
                })}
                  
                </select>
                <FormDialogLocation/>
                <Button variant="contained" onClick={navigateToTracks}>Click to Add Track </Button>
                {/* <Button variant="contained" onClick={navigateToTracks}>Click to Add Track </Button> */}
        </div></Grid>
    </Grid>
   
<button>show track</button>
{/* <RoutesComponent 
latLngArr={[...posArr]} 
home={origin1}
// {posArr,origin1}
/> */}

  </div>
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

const middleOptions = {
    ...defaultOptions,
    zIndex: 2,
    fillOpacity: 0.05,
    strokeColor: "#FBC02D",
    fillColor: "#FBC02D"
};

const farOptions = {
    ...defaultOptions,
    zIndex: 1,
    fillOpacity: 0.05,
    strokeColor: "#FF5252",
    fillColor: "#FF5252"
};
const generateHouses= ()=>
{
  let data;
  const h: Array<LatLngLiteral>=[];
  try {
        axios.get('http://localhost:3333/location').then((res)=>{data=res
       res.data.forEach((l: { location_geolocation: { lat: any; len: any; }; })=>{h.push({
       lat:l.location_geolocation.lat,
       lng:l.location_geolocation.len
    })})
    console.log(h);
  });
  
  } catch (error) {
    console.log(error);
  }
  return h;

}












// import { observer } from "mobx-react-lite";
// import { useCallback, useMemo, useRef, useState,useEffect } from "react";
// import AutoComplete from "../maps/AutoComplete";
// type LatLngLiteral = google.maps.LatLngLiteral;
// type DirectiosResult = google.maps.DirectionsResult;
// type MapOptions = google.maps.MapOptions;
// const  Track=()=> {
//     const [office, setOffice] = useState<LatLngLiteral|any>();
//     const options = useMemo<MapOptions>(() => ({
//         disableDefaultUi: true,
//         clickableIcons: true,
//     }), []);
//     useEffect(() => {
//         //getAllLocations();
//         //navigator.geolocation.getCurrentPosition(function(position){
//         setOffice({lat:position.coords.latitude,lng:position.coords.longitude});
//       })
//         },[]);

//     return <div><AutoComplete 
//     // setOffice={(position: any) => {
//     //     setOffice(position);
//     //     mapRef.current?.panTo(position);
//     // }}
//     /></div>
// }
// export default observer(Track) ;
