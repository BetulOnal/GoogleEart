import React, {useState} from "react";
import XMLParser from 'react-xml-parser';


export default function Handle({ onUpdateWaypoints }) {
    const [file, setFile] = useState();

    function handleFile(event) {
        setFile(event.target.files[0]);
    }

    function handleUpload(event) {
        event.preventDefault();
        const formData = new FormData();
        formData.append("file", file);
        fetch(
            'https://httpbin.org/post',
            {
                method: "POST",
                body: formData
            }
        )
        .then((response) => response.json())
        .then((result) => {
            console.log(result.files.file)
            const xmlText = result.files.file
            const XMLParser = require('react-xml-parser');
            const xml = new XMLParser().parseFromString(xmlText)
            const waypointsList = xml.getElementsByTagName('WayPoints').map(waypoint => ({
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
            console.log(data);
        })
        .catch(error => {
            console.error("Error:", error)
        });
        }

    return(
    <form 
     method='POST' encType="multipart/form-data"   onSubmit={handleUpload}>
    <input type="file" name="file" onChange={handleFile} />
    <button >Upload File </button>
    </form>  
    )
}