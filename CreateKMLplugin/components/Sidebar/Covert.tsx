import React from 'react';
import { ConvertProps, WaypointCreate, GeoFencepointCreate} from './interfaces';



const Convert: React.FC<ConvertProps> = ({ waypoints, geofencepoints}) => {
    const kmlContent: string = generateKML(waypoints, geofencepoints);

    const handleDownload = ():void => {
        const blob:Blob = new Blob([kmlContent], { type: 'application/vnd.google-earth.kml+xml' });
        const url = URL.createObjectURL(blob);
        const a:HTMLAnchorElement = document.createElement('a');
        a.href = url;
        a.download = 'new.kml';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="download">
            <button  onClick={handleDownload}>Download KML</button>
        </div>
    );
}

function generateKML(waypoints: WaypointCreate[], geofencepoints: GeoFencepointCreate[]): string {
    if (!waypoints || !Array.isArray(waypoints)) {
        console.error("Waypoints are invalid ");
        return '';
    }

    let coordinates = '';
    let placemarks = '';
    let route = '';
    let safearea = '';
    let safecoordinates =''

    waypoints.forEach((waypoint, index): void => {
        if (waypoint && waypoint.Latitude && waypoint.Longitude && waypoint.Altitude) {
            coordinates += `${waypoint.Longitude},${waypoint.Latitude},${waypoint.Altitude}\n`;

            placemarks +=
                `<Placemark id="Waypoint-${index}">
                <name>Waypoint${index}</name>
                <Point>
                    <coordinates>${waypoint.Longitude},${waypoint.Latitude},${waypoint.Altitude}</coordinates>
                </Point>
            </Placemark>`;
            route =
                `<Placemark id="ROUTE">
                <name>ROUTE</name>
                <LineString>
                    <coordinates>
                        ${coordinates}
                    </coordinates>
                </LineString>
            </Placemark>`;
        }
    });

    if (geofencepoints && Array.isArray(geofencepoints)) {
        geofencepoints.forEach((geofencepoint, index): void => {
            if (geofencepoint && geofencepoint.Latitude && geofencepoint.Longitude) {
                safecoordinates += `${geofencepoint.Longitude},${geofencepoint.Latitude},200\n`;
                let safecoordinateslast = `${geofencepoints[0].Longitude},${geofencepoints[0].Latitude},200\n `;
                //if you want to another version you need to safecoordinateslast = `${(geofencepoints[0].Longitude)-10},${geofencepoints[0].Latitude},200\n `;
                safearea =
                    `<Placemark id="">
                    <name>GeoFencePoints</name>
                    <Style>
                    <PolyStyle>
                    <color>7dff0000</color>
                  </PolyStyle>
		</Style>
		<Polygon>
			<extrude>1</extrude>
			<altitudeMode>relativeToGround</altitudeMode>
			<outerBoundaryIs>
				<LinearRing>
					<coordinates>
                    ${safecoordinates} ${safecoordinateslast}
					</coordinates>
				</LinearRing>
			</outerBoundaryIs>
		</Polygon>
                </Placemark>`;
            }
        });
    }

    return `<?xml version="1.0" encoding="UTF-8"?>
    <kml xmlns="http://www.opengis.net/kml/2.2" xmlns:gx="http://www.google.com/kml/ext/2.2" xmlns:kml="http://www.opengis.net/kml/2.2" xmlns:atom="http://www.w3.org/2005/Atom">
    <Document>
        <name>Waypoints</name>
        <gx:CascadingStyle kml:id="__managed_style_242FACD5942E00097BDB">
            <Style>
                <LineStyle>
                    <color>ff2dc0fb</color>
                    <width>3</width>
                </LineStyle>
                <PolyStyle>
                    <color>49ffffff</color>
                </PolyStyle>
            </Style>
        </gx:CascadingStyle>
        <StyleMap id="__managed_style_0A1DE3C3ED2E00097BDB">
            <Pair>
                <key>normal</key>
                <styleUrl>#__managed_style_1CC2DE3E2A2E00097BDB</styleUrl>
            </Pair>
            <Pair>
                <key>highlight</key>
                <styleUrl>#__managed_style_242FACD5942E00097BDB</styleUrl>
            </Pair>
        </StyleMap>
        ${placemarks}
        ${route}
        ${safearea}
    </Document>
    </kml>`;
}

export default Convert