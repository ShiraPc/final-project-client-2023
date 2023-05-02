import { Circle, GoogleMap, Marker, MarkerClusterer } from "@react-google-maps/api";
import axios from "axios";
import { useCallback, useMemo, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import getOrderedArray from "./services/track.service";
let orderedArray:any[]=[];
let x:number;
export default  function DisplayRoutes(props: any){
  name(1).then(data=>x=data);
  getOrderedArray(props.home,props.latLngArr,props.priority).then(data=>orderedArray=data);
  return <div>{orderedArray.map(point=>{return <div>point</div>})}</div>;
}
async function name(params:number) {
  return 1;
}










//   let destinationArray:any[]=[];
//   let destinationArrayD:any[]=[];
//   const priority1Dist:any[]=[];
//   const priority1: any[]=[];
//   const priority2Dist:any[]=[];
//   const priority2:any[]=[];
//   const priority3Dist:any[]=[];
//   const priority3:any[]=[];
//   const orderedArray:any=[];
//   const mapRef = useRef<GoogleMap>()
//   const onLoad = useCallback((map: any) => (mapRef.current = map), []);
//   const [office, setOffice] = useState<google.maps.LatLngLiteral|any>();
//   const center = useMemo<google.maps.LatLngLiteral>(() => ({ lat: 32, lng: 35 }), []);
//   const options = useMemo<google.maps.MapOptions>(() => ({
//     disableDefaultUi: true,
//     clickableIcons: true,
//     }), []);
//   const generateHouses= ()=>
// {
//   let data;
//   const h: Array<google.maps.LatLngLiteral>=[];
//   try {
//     console.log("getlocation");
//         axios.get('http://localhost:3333/location').then((res)=>{data=res
//        res.data.forEach((l: { location_geolocation: { lat: any; len: any; }; })=>{h.push({
//        lat:l.location_geolocation.lat,
//        lng:l.location_geolocation.len
//     })})
//     console.log(h);
//   });
  
//   } catch (error) {
//     console.log(error);
//   }
//   return h;

// }
// console.log(props.priority.length+"priority length from routes");
// // console.log(getOrderedArray(props.home,props.latLngArr,props.priority));
//   const houses = useMemo(() => generateHouses(), [center]);
//   var service = new google.maps.DistanceMatrixService();
//   function callback(response: any, status: string) {
//     console.log("in callBack");
//     if(response){
//       destinationArrayD.push(convertStringToNumber(response.rows[0].elements[0].distance.text));
//       let x:number=findSmallestIndex(destinationArrayD);
//       orderedArray.push(destinationArray[x]);
//       destinationArray=[...destinationArray.slice(0,x),...destinationArray.slice(x+1,destinationArray.length)];
//     }
    


//     //props.latLngArr.allDestinations.pop();
//         }
//   async function sceduleAWholeTrack2(){
//     while(props.latLngArr.length>0)
//     {
//       console.log("in scedule"+props.latLngArr[props.latLngArr.length-1].lat);
//       debugger;
//       console.log(props.latLngArr.length);
//       props.latLngArr.pop();
//       console.log(props.latLngArr.length);
//       debugger
//       const x=await service.getDistanceMatrix(
//         {
//           origins: [props.home],
//           destinations:props.latLngArr,//[origin1,origin2], //[...latLngArr],
//           travelMode: google.maps.TravelMode.DRIVING,
//         },callback);
//         debugger;
//         console.log(x);
//         callback(x,"ok");
//     }
//   }
//   const convertStringToNumber=(str:string)=>{
//       for (let index = 0; index < str.length; index++) {
//         const element = str[index];
//         if(element==' '){
//           return Number(str.slice(0,index));
//         }
//       }
//   }
//   const findSmallestIndex=(arr:any[]):number=>{
//     let min:number=arr[0];
//     let minIndex:number=0;
//     for (let index:number = 0; index < arr.length; index++) {
//       if(arr[index]<min)
//       {
//         min=arr[index];
//         minIndex=index;
//       }
//       return minIndex;
      
//     }
//     return 1;
//   }
//   const sceduleAWholeTrack=()=>{
//     console.log("in scedule")
//     while(props.latLngArr.length>0)
//     {
//       console.log("in scedule"+props.latLngArr[props.latLngArr.length-1].lat);
//       debugger;
//       console.log(props.latLngArr.length);
//       props.latLngArr.pop();
//       console.log(props.latLngArr.length);
//       debugger
//       const x=service.getDistanceMatrix(
//         {
//           origins: [props.home],
//           destinations:props.latLngArr,//[origin1,origin2], //[...latLngArr],
//           travelMode: google.maps.TravelMode.DRIVING,
//         },callback);
//         debugger;
//         console.log(x);
//     }
//   }
// const sortByPriority=()=>{
//   for (let index = 0; index < props.latLngArr.length; index++) {
//     if(props.priority[index]==0){
//       priority1.push(props.latLngArr[index]);
//     }
//     else if(props.priority[index]==1){
//       priority2.push(props.latLngArr[index]);
//     }
//     else{
//       priority3.push(props.latLngArr[index]);
//     }
//   }
// }
// //sortByPriority();

// const sceduleRightArr=()=>{
//   if(priority1.length>0)
//   {
//     //to check when I change the pointer-destinationArray if the priority1 array if get the changes to;
//     destinationArray=priority1;
//     destinationArrayD=priority1Dist;
//   }
//   else if(priority2.length>0){
//     destinationArray=priority2;
//     destinationArrayD=priority2Dist;
//   }
//   else{
//     destinationArray=priority3;
//     destinationArrayD=priority3Dist;
//   }
// }

// return <div>
//   {/* home.lat:{props.home.lat}
//   latLngArr:{props.latLngArr.length} */}
//   {/* {props.latLngArr.map(()=>{"a"})} */}
//   <div className="map" id="myMap">
//   <Button variant="contained" onClick={calcRoute}>Click to show Track </Button>
//   <GoogleMap
//             zoom={10} center={center}
//             mapContainerClassName="mapContainer"
//             options={options}
//             onLoad={onLoad} >
//              {/* {directions&&(<DirectionsRenderer directions={directions}
//                  options={{polylineOptions:{
//                     zIndex:50,
//                     strokeColor:"#1976D2",
//                     strokeWeight:5,
//                     },
//                  }}/>)} */}
                 
//                 {/* {office && (
//                     <>
//                        <Marker position={office} /> */}
//               <MarkerClusterer>
//                 {(clusterer:any|MarkerClusterer | Readonly<MarkerClusterer>): any=>
//                 houses.map((h:google.maps.LatLngLiteral) => (
//                 <Marker
//                   key={h.lat}
//                   icon={{path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
//                   strokeColor: "black",
//                   scale: 5}}
//                   position={h}
//                   clusterer={clusterer}
//                 // onClick={()=>{
//                 //   fetchDirections(h)
//                 // }}
//                 />))}
//              </MarkerClusterer>
           
//                <Marker position={office} />
//               <Circle center={office} radius={15000} options={closeOptions} />
//               <Circle center={office} radius={30000} options={middleOptions} />
//               <Circle center={office} radius={45000} options={farOptions} />

//             <div/>)
            
//           </GoogleMap>
         
//           </div>
// </div>

// var directionsService = new google.maps.DirectionsService();
//   var directionsRenderer = new google.maps.DirectionsRenderer();
//   function initMap() {

//     var chikago = new google.maps.LatLng(41.850033, -87.6500523);
//     var mapOptions = {
//       zoom:7,
//       center: chikago
//     }
//     //const mapRef=useRef<GoogleMap>();
//     const map = new google.maps.Map(document.getElementById('myMap')!, mapOptions);
//     directionsRenderer.setMap(map);
//   }
  
//   function calcRoute() {
//     debugger
//     var start = "modiin ilit";
//     var end = "jerusalem";
//     var request = {
//       origin: start,
//       destination: end,
//       travelMode: google.maps.TravelMode.DRIVING
//     };
//     directionsService.route(request, function(result, status) {
//       if (status == 'OK') {
//         directionsRenderer.setDirections(result);
//       }
//     });
//   }
// }




// const defaultOptions = {
//   strokeOpacity: 0.5,
//   strokeWeight: 2,
//   clickAble: false,
//   drageAble: false,
//   editAble: false,
//   visible: true
// }

// const closeOptions = {
//   ...defaultOptions,
//   zIndex: 3,
//   fillOpacity: 0.05,
//   strokeColor: "#8BC34A",
//   fillColor: "#8BC34A"
// };

// const middleOptions = {
//   ...defaultOptions,
//   zIndex: 2,
//   fillOpacity: 0.05,
//   strokeColor: "#FBC02D",
//   fillColor: "#FBC02D"
// };

// const farOptions = {
//   ...defaultOptions,
//   zIndex: 1,
//   fillOpacity: 0.05,
//   strokeColor: "#FF5252",
//   fillColor: "#FF5252"
// };