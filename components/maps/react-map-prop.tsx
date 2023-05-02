import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
// import Marker from './marker';
// import  mapStore from '../stores/mapStore';
// import markersStore from '../stores/markersStore';
import { observer } from 'mobx-react';
import { Circle, Marker, MarkerClusterer } from '@react-google-maps/api';
// import { config } from '../config/config';


const MapContainer = (props: any) => {
  let from: google.maps.LatLng=props.origin;
  let to: google.maps.LatLng=props.destination;
  const [map2, setMap2] = useState([]);
  const [map, setMap] = useState(null);
  const allResponses:any[]=[];
  //   const indexOfMarker = markersStore.indexMarker;
  //   console.log(indexOfMarker);
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();

  const apiIsLoaded = (map: any, maps: any) => {
    console.log("apiIsLoaded");
    console.log(props.origin+"o");
    console.log(props.destination+"d");
    setMap(map);
    navigator?.geolocation.getCurrentPosition(
      ({ coords: { latitude: lat, longitude: lng } }) => {
        console.log(lat, lng);
        //    mapStore.currentMap.center = { lat, lng }
        //    mapStore.currentMap.zoom = 16;
      }
    );
  };
  const arr: google.maps.LatLng[] = [new google.maps.LatLng(31.9314953, 35.0431023)
    , new google.maps.LatLng(31.9315953, 35.0433023),
  new google.maps.LatLng(31.9324953, 35.0431022)];
  let counter = 0;

  const calculateAndDisplayRoute = (
    directionsService: google.maps.DirectionsService,
    directionsRenderer: google.maps.DirectionsRenderer,
  ) => {
    arr.map(r => {
      console.log("abcd");
      to = r;
      if (from != undefined) {
        directionsService.route
          ({
            origin: new google.maps.LatLng(31.9224953, 35.0431023),
            destination: new google.maps.LatLng(31.9214953, 35.0441023),
            travelMode: google.maps.TravelMode.DRIVING,
          }, (response, status) => {
            if (status === 'OK' && response) {
              // allResponses.push(response);
              
              console.log(response+"response1");

              directionsRenderer.setDirections(response);
              // setMap2([...map2]);
            }
          });
        console.log("abcd");
        directionsService.route
          ({
            origin: new google.maps.LatLng(32.9325973, 36.0542024),
            destination: new google.maps.LatLng(31.9314964, 35.0431023),
            travelMode: google.maps.TravelMode.DRIVING,
          }, (response, status) => {
            if (status === 'OK' && response) {
              console.log(response+"response2");

              // allResponses.push(response);
              directionsRenderer.setDirections(response);
              // directionsRenderer.setRouteIndex(directionsRenderer.getRouteIndex()+1);
              // setMap2([...map2]);
            }
          });
        console.log("efgh");
        directionsService.route
          ({
            origin: to,
            destination: new google.maps.LatLng(31.9626963, 35.0431023),
            travelMode: google.maps.TravelMode.DRIVING,
          }, (response, status) => {
            if (status === 'OK' && response) {
              console.log(response+"response3");
              // allResponses.push(response);
              directionsRenderer.setDirections(response);
              // directionsRenderer.setRouteIndex(directionsRenderer.getRouteIndex()+1);
              // setMap2([...map2]);
              console.log("a");
            }
          });
        console.log("hijk");
      }
      from = to;

    })
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

  const calculateAndDisplayOneRoute = (
    directionsService: google.maps.DirectionsService,
    directionsRenderer: google.maps.DirectionsRenderer
    ) => {
     
    directionsRenderer.setMap(map);
    directionsService
      .route({
        origin:from,
        destination: to,
        travelMode: google.maps.TravelMode.DRIVING,
      }, (response, status) => {
        if (status === 'OK' && response) {
          directionsRenderer.setDirections(response);
        }
      })
      directionsRenderer.setMap(map);
        // .catch(() => alert('Directions request failed'));
    }
    // calculateAndDisplayOneRoute(directionsService, directionsRenderer
    //   ,new google.maps.LatLng(31.9314953,35.0431023),new google.maps.LatLng(32.9325973, 36.0542024));
      
      // directionsRenderer.setMap(map);
      if(from!=undefined&& to !=undefined){
      calculateAndDisplayOneRoute(directionsService, directionsRenderer
        );
      }
      // calculateAndDisplayRoute(directionsService, directionsRenderer);
  directionsRenderer.setMap(map);
  // setMap2([...map2]);
  // directionsRenderer.setMap(map);

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      
      <GoogleMapReact
        bootstrapURLKeys={{
          key: "AIzaSyBCB_0ehXASF2irNKLoqmJTf-bEVH7EViY"
        }}
        center={{ lat: 31.9314953, lng: 35.0431023 }}
        zoom={15}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps)}
      >
                    {/* <Marker position={office} />
              <Circle center={office} radius={15000} options={closeOptions} />
              <Circle center={office} radius={30000} options={middleOptions} />
              <Circle center={office} radius={45000} options={farOptions} /> */}
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