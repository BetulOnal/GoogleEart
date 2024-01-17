import React, {useState, ChangeEvent, FormEvent} from "react";
import XMLParser from 'react-xml-parser';


interface Waypoint {
    Index: string;
    Command: string;
    Latitude: number;
    Longitude: number;
    Altitude: number;
    Parameter: string;
  };
  
interface HandleProps {
    onUpdateWaypoints: (waypoints: Waypoint[]) => void;
  };

const Handle: React.FC<HandleProps> = ({ onUpdateWaypoints }) => {
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
            const waypointsList:Waypoint[] = xml.getElementsByTagName('WayPoints').map(waypoint => ({
                Index: parseInt(waypoint.getElementsByTagName('Index')[0].value, 10),
                Command: parseInt(waypoint.getElementsByTagName('Command')[0].value, 10),
                Latitude: parseFloat(waypoint.getElementsByTagName('Latitude')[0].value),
                Longitude: parseFloat(waypoint.getElementsByTagName('Longitude')[0].value),
                Altitude: parseFloat(waypoint.getElementsByTagName('Altitude')[0].value),
                Parameter: parseInt(waypoint.getElementsByTagName('Parameter')[0].value, 10)
            }));

            const data = {
                WayPoints: waypointsList
            };
            onUpdateWaypoints(data.WayPoints);
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