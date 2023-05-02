import * as React from 'react'
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import Login from './components/login';
// import Auto from './components/Maps';
import SignUpPage from './components/sing-up';
// import BasicButtons from './components/addSystem';
import Home from './components/system/home-system'
import EditSystem from './components/system/EditSystem';
import List from './components/user-page'
import '../src/css/app.css';
import MyHome from './components/system/myHome';
// import Track from './components/track/track';
// import track from './components/track/track';
import Track from './components/track/Track';
import RoutesComponent from './components/routes/routes';
import { Button } from '@mui/material';
import MakingTrack from './components/tracks/making-track';
import MapContainer from './components/maps/react-map';
function App() {
  //const navigate = useNavigate();
  //const navigateToTracks=()=>{
  //  alert("navigate to tracks");
  //  navigate(`track`);
  //}
  return (
    <div className="app">
    
      {/* <Track/> */}
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          {/* <Route path="/map" element={<MapContainer />} /> */}
          <Route path="/signUp" element={<SignUpPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/EditSystem/:name" element={< EditSystem />} />
          <Route path="/user" element={<List />} />
          <Route path="/myHome" element={<MyHome/>}/>
          {/* <Route path="/track" element={<Track />} /> */}
          <Route path="/track" element={<MakingTrack />} />

          
          {/* <Route path="/Routes" element={<RoutesComponent/>}/> */}
          {/* <Route path="/details" element={<ShowSystem />} /> */}

        </Routes>
      </Router>

    </div>
  );
}

export default App;