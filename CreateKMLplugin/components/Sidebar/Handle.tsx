import React, {useState, ChangeEvent, FormEvent} from "react";
import XMLParser from 'react-xml-parser';
import { WaypointCatch, HandleProps, GeoFencePoint,GeoFenceSettingPointCatch} from "./interfaces";




const HandleFileInfo: React.FC<HandleProps> = ({ onUpdateStates }) => {
    const [file, setFile] = useState<File | undefined>();

    function handleFile(event:ChangeEvent<HTMLInputElement>) {
        setFile(event.target.files[0]);
    }

    async function handleUpload(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const reader = new FileReader();
        reader.onload = function (e) {
            const contents = e.target.result;
            // import yaparak kullanman lazim 
            const XMLParser = require('react-xml-parser');
            const xml = new XMLParser().parseFromString(contents);

            const waypointsList:WaypointCatch[] = xml.getElementsByTagName('WayPoints').map(waypoint => ({
                Index: parseInt(waypoint.getElementsByTagName('Index')[0].value),
                Command: parseInt(waypoint.getElementsByTagName('Command')[0].value),
                Latitude: parseFloat(waypoint.getElementsByTagName('Latitude')[0].value),
                Longitude: parseFloat(waypoint.getElementsByTagName('Longitude')[0].value),
                Altitude: parseFloat(waypoint.getElementsByTagName('Altitude')[0].value),
                Parameter: parseInt(waypoint.getElementsByTagName('Parameter')[0].value)
            }));
            
            const geoFencePointList: GeoFencePoint[]= xml.getElementsByTagName('GeoFencePoint').map(geofencepoint=>({
                Latitude: parseFloat(geofencepoint.getElementsByTagName('Latitude')[0].value),
                Longitude: parseFloat(geofencepoint.getElementsByTagName('Longitude')[0].value),
                
            }));

            const goeFenceSettingPoint = {
                RetLat: parseFloat(xml.getElementsByTagName('GeoFenceSettings')[0].getElementsByTagName('RetLat')[0].value),
                RetLon: parseFloat(xml.getElementsByTagName('GeoFenceSettings')[0].getElementsByTagName('RetLon')[0].value),
                MinAlt: parseFloat(xml.getElementsByTagName('GeoFenceSettings')[0].getElementsByTagName('MinAlt')[0].value),
                MaxAlt: parseFloat(xml.getElementsByTagName('GeoFenceSettings')[0].getElementsByTagName('MaxAlt')[0].value)
            };

            const homePoint ={
                Latitude:  parseFloat(xml.getElementsByTagName('HomePoint')[0].getElementsByTagName('Latitude')[0].value),
                Longitude:  parseFloat(xml.getElementsByTagName('HomePoint')[0].getElementsByTagName('Longitude')[0].value),
                Altitude:  parseFloat(xml.getElementsByTagName('HomePoint')[0].getElementsByTagName('Altitude')[0].value)
            }
            onUpdateStates({
                waypoints: waypointsList,
                geoFencePoints: geoFencePointList,
                geoFenceSetting: goeFenceSettingPoint,
                homePoint: homePoint,
              });
        };
        reader.readAsText(file);
    }

    return(
    <form 
     method='POST' encType="multipart/form-data"   onSubmit={handleUpload}>
    <input type="file" name="file" onChange={handleFile} />
    <button >Upload File </button>
    </form>  
    )
};

export default HandleFileInfo;