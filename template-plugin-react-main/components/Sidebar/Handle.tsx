import React, {useState, ChangeEvent, FormEvent} from "react";
import XMLParser from 'react-xml-parser';
import { WaypointCatch, HandleProps, GeoFencePoint} from "./interfaces";




const Handle: React.FC<HandleProps> = ({ onUpdateWaypoints,onUpdateGeoFencePoints, onMaxAltChange }) => {
    const [file, setFile] = useState<File | undefined>();

    function handleFile(event:ChangeEvent<HTMLInputElement>) {
        setFile(event.target.files[0]);
    }

    async function handleUpload(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData();
        formData.append("file", file);
        try {
            const response = await fetch('https://httpbin.org/post', {
              method: "POST",
              body: formData
            });
      
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
      
            const result = await response.json();
            const xmlText:string = result.files.file
            const XMLParser = require('react-xml-parser');
            const xml = new XMLParser().parseFromString(xmlText)
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
            const goeFenceMaxAlt = parseFloat (xml.getElementsByTagName('MaxAlt')[0].value);
            
            const data = {
                WayPoints: waypointsList,
                GeoFencePoints:geoFencePointList
            };
            onUpdateWaypoints(data.WayPoints);
            onUpdateGeoFencePoints(data.GeoFencePoints)
            onMaxAltChange(goeFenceMaxAlt);

        }catch(error) {
            console.error("Error:", error)
        }
        }

    return(
    <form 
     method='POST' encType="multipart/form-data"   onSubmit={handleUpload}>
    <input type="file" name="file" onChange={handleFile} />
    <button >Upload File </button>
    </form>  
    )
};

export default Handle;