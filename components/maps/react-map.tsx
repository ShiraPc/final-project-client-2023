import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
// import Marker from './marker';
// import  mapStore from '../stores/mapStore';
// import markersStore from '../stores/markersStore';
import { observer } from 'mobx-react';
import { Marker } from '@react-google-maps/api';


// import { config } from '../config/config';
let mapW:any;
let mapsW:any;
interface FullTrack {
  allTrack:google.maps.LatLng[];
  allPoints:google.maps.LatLng[];
  x:number;
  // from: google.maps.LatLng;
  // to: google.maps.LatLng;
}
// const MapContainer:React.FC<{from:google.maps.LatLng,destination:google.maps.LatLng}> = ({from,destination}) => {
  const MapContainer = (props:FullTrack) => {

  // let origin: google.maps.LatLng=props.from;
  // let destination: google.maps.LatLng=props.destination;
  let to: google.maps.LatLng = new google.maps.LatLng(32.053356, 34.7646881);
  // let to: google.maps.LatLng=props.to;
  
  const [map2, setMap2] = useState([]);
  const [map, setMap] = useState(null);
  const allResponses:any[]=[];
  //   const indexOfMarker = markersStore.indexMarker;
  //   console.log(indexOfMarker);
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();


  const renderMarkers=(map:any, maps:any,position:google.maps.LatLng)=> {

    let marker = new maps.Marker({
      position: position,
      map,
      title: 'Hello World!'
    });
  }
  const apiIsLoaded = (map: any, maps: any) => {
    debugger;
    mapW=map;
mapsW=maps;
props.allPoints.map(r=>{renderMarkers(map,maps,r)});
    // renderMarkers(map,maps);
    console.log("apiIsLoaded");
    setMap(map);
    navigator?.geolocation.getCurrentPosition(
      ({ coords: { latitude: lat, longitude: lng } }) => {
        console.log(lat, lng);
        //    mapStore.currentMap.center = { lat, lng }
        //    mapStore.currentMap.zoom = 16;
      }
    );
  };
  const arr: google.maps.LatLng[] = [new google.maps.LatLng(31.9314953, 34.7718267)
    , new google.maps.LatLng(31.9315953, 35.0433023),
  new google.maps.LatLng(31.9324953, 35.0431022)];
  let counter = 0;

  const calculateAndDisplayRoute = (
    directionsService: google.maps.DirectionsService,
    directionsRenderer: google.maps.DirectionsRenderer,
  ) => {
    for (let index = 0; index < props.allTrack.length-1; index++) {
      const element = props.allTrack[index];
      const element2=props.allTrack[index+1];
      directionsService.route
          ({
            origin: element,
            destination: element2,
            travelMode: google.maps.TravelMode.DRIVING,
          }, (response, status) => {
            if (status === 'OK' && response) {
              console.log(response+"response1");
              directionsRenderer.setDirections(response);
            }
          });
      
    }
    // arr.map(r => {
    //   console.log("abcd");
    //   // to = r;
    //   if (origin != undefined) {
    //     directionsService.route
    //       ({
    //         origin: new google.maps.LatLng(31.9224953, 35.0431023),
    //         destination: new google.maps.LatLng(31.9214953, 35.0441023),
    //         travelMode: google.maps.TravelMode.DRIVING,
    //       }, (response, status) => {
    //         if (status === 'OK' && response) {
    //           console.log(response+"response1");
    //           directionsRenderer.setDirections(response);
    //         }
    //       });

    //   }
    //   // from = to;

    // })
    // allResponses.map(r=>{
    //   directionsRenderer.setDirections(r);
    //    directionsRenderer.setMap(map);});
    // if (markersStore.indexMarker === null || markersStore.marker.lat === 0 )
    //   return;
    // directionsRenderer.setMap(map);

    // directionsService
    //   .route({
    //     origin: new google.maps.LatLng(31.9314953, 35.0431023),
    //     destination: new google.maps.LatLng(31.9315963, 35.0431023),
    //     travelMode: google.maps.TravelMode.DRIVING,
    //   }, (response, status) => {
    //     if (status === 'OK' && response) {
    //       directionsRenderer.setDirections(response);
    //     }
    //   })
    // .catch(() => alert('Directions request failed'));
  }
////////////////////////////////////////////



  // const calculateAndDisplayOneRoute = (
  //   directionsService: google.maps.DirectionsService,
  //   directionsRenderer: google.maps.DirectionsRenderer
  //   ) => {
     
  //   directionsRenderer.setMap(map);
  //   directionsService
  //     .route({
  //       origin:new google.maps.LatLng(props.from.lat(),props.from.lng()),
  //       destination: new google.maps.LatLng(props.to.lat(),props.to.lng()),
  //       travelMode: google.maps.TravelMode.DRIVING,
  //     }, (response, status) => {
  //       console.log(status+"status");
  //       if (status === 'OK' && response) {
  //         directionsRenderer.setDirections(response);
  //       }
  //     })
  //     directionsRenderer.setMap(map);
  //       // .catch(() => alert('Directions request failed'));
  //   }



    ////////////////////////////////////////////
    // calculateAndDisplayOneRoute(directionsService, directionsRenderer
    //   ,new google.maps.LatLng(31.9314953,35.0431023),new google.maps.LatLng(32.9325973, 36.0542024));
      
      // directionsRenderer.setMap(map);
      // if(props.from!=undefined && props.to!=undefined){
        calculateAndDisplayRoute(directionsService, directionsRenderer);
        if(mapW!=undefined){
        props.allPoints.map(r=>{renderMarkers(mapW,mapsW,r)});
      }
      //calculateAndDisplayOneRoute(directionsService, directionsRenderer);
      // }
      // calculateAndDisplayRoute(directionsService, directionsRenderer);
  directionsRenderer.setMap(map);
  // setMap2([...map2]);
  // directionsRenderer.setMap(map);

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      {/* {props.number} */}
      {/* {props.from.lat()} */}
      <GoogleMapReact
        bootstrapURLKeys={{
          key: "AIzaSyBCB_0ehXASF2irNKLoqmJTf-bEVH7EViY"
        }}
        center={{ lat: 31.9314954, lng: 35.0431023 }}
        zoom={15}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps)}
      >
       {/* <Marker
              position = {{lat:50.064192,lng:-130.605469}}
              // name = {"firstPoint"}
              // description = {"simple"}
              // color = '#DC5835'
            /> */}
        {/* {markersStore.markers.map(m => (
            <Marker
              lat = {m.lat}
              lng = {m.lng}
              name = {m.name}
              description = {m.description}
              phone = {m.phone}
              color = '#DC5835'
            />
          ))}  */}
      </GoogleMapReact>
    </div>
  );
}

export default observer(MapContainer);



