import React, { useState } from 'react';
import Handle from "./components/Handle"
import Convert from './components/Convert';
import Map from "./photos/map.jpeg"


export default function App() {

  const [waypoints, setWaypoints] = useState([]);

  const updateWaypoints = (newWaypoints) => {
    setWaypoints(newWaypoints);
  };

  return (
    <div style={{ 
      backgroundImage:`url(${Map})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    }}>
      <Handle onUpdateWaypoints={updateWaypoints} />
      <Convert waypoints={waypoints} />
    </div>
  );
}


