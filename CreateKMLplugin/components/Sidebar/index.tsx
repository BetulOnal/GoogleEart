import React, { FC, useState } from "react";
import { IPluginApi } from "@qandq/cloud-gcs-core";
//import packageJson from ../../package.json"
const packageJson = require("../../package.json") as any;


import HandleFileInfo from "./Handle";
import KMLConverter from "./Convert";

interface ISidebar {
  pluginApi: IPluginApi;
}
export const Sidebar: FC<ISidebar> = ({ pluginApi }: ISidebar) => {

  //This is my code space 
  const [waypoints, setWaypoints] = useState([]);
  const [geofencepoints, setGeoFencePoints] = useState([]);
  const [geoFenceSettingPoint, setGeoFenceSetting] = useState({
    RetLat: 0,
    RetLon: 0,
    MinAlt: 0,
    MaxAlt: 0,
  });
  const [homePoint, setHomePoint] = useState({
    Latitude: 0,
    Longitude: 0,
    Altitude: 0,
  });
  const onUpdateStates = (newStates) => {
    setWaypoints(newStates.waypoints);
    setGeoFencePoints(newStates.geoFencePoints);
    setGeoFenceSetting(newStates.geoFenceSetting);
    setHomePoint(newStates.homePoint);
  };
  return (
        <div>
        <HandleFileInfo onUpdateStates={onUpdateStates} />
        <KMLConverter waypoints={waypoints} geofencepoints={geofencepoints} geoFenceSettingPoint={geoFenceSettingPoint} homePoint={homePoint}/>
        </div>
  );
};