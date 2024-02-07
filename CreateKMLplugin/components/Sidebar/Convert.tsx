import React from "react";
import {
  ConvertProps,
  WaypointCreate,
  GeoFencepointCreate,
} from "./interfaces";

var GeoHelper = {
  toDegrees: function(rad) {
    return rad * (180 / Math.PI);
  },
  toRadians: function(degrees) {
    return degrees * (Math.PI / 180);
  },

  getDestination: function(lon, lat, bearing, distance) {
    distance /= 6371000; // divide by earth radius to convert meters to radians
    bearing = this.toRadians(bearing);
    var lat1 = this.toRadians(lat);
    var lon1 = this.toRadians(lon);

    var lat2 = Math.asin(
      Math.sin(lat1) * Math.cos(distance) +
        Math.cos(lat1) * Math.sin(distance) * Math.cos(bearing)
    );
    var lon2 =
      lon1 +
      Math.atan2(
        Math.sin(bearing) * Math.sin(distance) * Math.cos(lat1),
        Math.cos(distance) - Math.sin(lat1) * Math.sin(lat2)
      );
    lat = this.toDegrees(lat2);
    lon = this.toDegrees(lon2);
    return { latitude: lat, longitude: lon };
  },
};

const Convert: React.FC<ConvertProps> = ({
  waypoints,
  geofencepoints,
  maxAlt,
}) => {
  const kmlContent: string = generateKML(waypoints, geofencepoints, maxAlt);

  const handleDownload = (): void => {
    const blob: Blob = new Blob([kmlContent], {
      type: "application/vnd.google-earth.kml+xml",
    });
    const url = URL.createObjectURL(blob);
    const a: HTMLAnchorElement = document.createElement("a");
    a.href = url;
    a.download = "new.kml";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="download">
      <button onClick={handleDownload}>Download KML</button>
    </div>
  );
};

function modCalculate(a: number) {
  return a - 16384 * Math.floor(a / 16384) + 500;
}

function generateKML(
  waypoints: WaypointCreate[],
  geofencepoints: GeoFencepointCreate[],
  maxAlt
): string {
  if (!waypoints || !Array.isArray(waypoints)) {
    console.error("Waypoints are invalid ");
    return "";
  }

  const generatePoints = (center, distance) => {
    return Array.from({ length: 41 }, (_, i) => {
      const angle = i * 9; // 9 degree
      return GeoHelper.getDestination(
        center.longitude,
        center.latitude,
        angle,
        distance
      );
    });
  };
  let coordinates = "";
  let placemarks = "";
  let route = "";
  let safearea = "";
  let safecoordinates = "";
  let safearea8 = "";
  let safearea12 = "";

  waypoints.forEach((waypoint, index): void => {
    if (
      waypoint &&
      waypoint.Latitude &&
      waypoint.Longitude &&
      waypoint.Altitude
    ) {
      coordinates += `${waypoint.Longitude},${waypoint.Latitude},${waypoint.Altitude}\n`;
      placemarks += `<Placemark id="Waypoint-${index}">
                <name>Waypoint${index}</name>
                <Point>
                <coordinates>${waypoint.Longitude},${waypoint.Latitude},${waypoint.Altitude}</coordinates>
                </Point>
                </Placemark>`;
      route = `<Placemark id="">
              <name>GeoFenceRoute</name>
              <Style>
              <PolyStyle>
              <color>7f00ffff</color>
              </PolyStyle>
              </Style>
              <LineString>
              <extrude>1</extrude>
              <altitudeMode>relativeToGround</altitudeMode>
              <coordinates>
              ${coordinates} 
              </coordinates>
              </LineString>
              </Placemark>`;

      switch (waypoint.Command) {
        case 8:
          const distance8 = modCalculate(waypoint.Parameter);
          const center8 = {
            longitude: waypoint.Longitude,
            latitude: waypoint.Latitude,
          };
          const allPoints8 = generatePoints(center8, distance8);
          const area8 = allPoints8
            .map(
              (point) =>
                `${point.longitude},${point.latitude},${waypoint.Altitude}`
            )
            .join("\n");
          safearea8 = `<Placemark id="">
                    <name>safearea8</name>
                    <Style>
                    <PolyStyle>
                    <color>7f00ffff</color>
                    </PolyStyle>
                    </Style>
		                <Polygon>
			              <extrude>1</extrude>
			              <altitudeMode>relativeToGround</altitudeMode>
			              <outerBoundaryIs>
			              <LinearRing>
					          <coordinates>
                    ${area8}
					          </coordinates>
				            </LinearRing>
			              </outerBoundaryIs>
		                </Polygon>
                    </Placemark>`;
          break;
        case 9:
          const distance9 = modCalculate(waypoint.Parameter);
          const center9 = {
            longitude: waypoint.Longitude,
            latitude: waypoint.Latitude,
          };
          const allPoints9 = generatePoints(center9, distance9);
          break;
        case 10:
          const distance10 = modCalculate(waypoint.Parameter);
          const center10 = {
            longitude: waypoint.Longitude,
            latitude: waypoint.Latitude,
          };
          const allPoints10 = generatePoints(center10, distance10);
        case 11:
          const distance11 = modCalculate(waypoint.Parameter);
          const center11 = {
            longitude: waypoint.Longitude,
            latitude: waypoint.Latitude,
          };
          const allPoints11 = generatePoints(center11, distance11);

        case 12: 
          const distance12 = modCalculate(waypoint.Parameter);
          const center12 = {
            longitude: waypoint.Longitude,
            latitude: waypoint.Latitude,
          };

          const allPoints12 = generatePoints(center12, distance12);
          const area12 = allPoints12
            .map(
              (point) =>
                `${point.longitude},${point.latitude},${waypoint.Altitude}`
            )
            .join("\n");
          safearea12 = `<Placemark id="">
                    <name>safearea12</name>
                    <Style>
                    <PolyStyle>
                    <color>7f00ffff</color>
                    </PolyStyle>
                    </Style>
		            <Polygon>
			        <extrude>1</extrude>
			        <altitudeMode>relativeToGround</altitudeMode>
			        <outerBoundaryIs>
			        <LinearRing>
					<coordinates>
                    ${area12}
					</coordinates>
				    </LinearRing>
			        </outerBoundaryIs>
		            </Polygon>
                   </Placemark>`;
          break;
        default:
          console.log("Loiter point not find");
          // Varsayılan durumun kodu
          break;
      }
    }
  });
  if (geofencepoints && Array.isArray(geofencepoints)) {
    geofencepoints.forEach((geofencepoint, index): void => {
      safecoordinates += `${geofencepoint.Longitude},${geofencepoint.Latitude},${maxAlt}\n`;
      let safecoordinateslast = `${geofencepoints[0].Longitude},${geofencepoints[0].Latitude},${maxAlt}\n `;
      //if you want to another version you need to safecoordinateslast = `${(geofencepoints[0].Longitude)-10},${geofencepoints[0].Latitude},200\n `;
      safearea = `<Placemark id="">
                    <name>GeoFenceArea</name>
                    <Style>
                    <PolyStyle>
                    <color>7dff0000</color>
                   </PolyStyle>
		            </Style>
                <LineString>
                <extrude>1</extrude>
                <altitudeMode>relativeToGround</altitudeMode>
					      <coordinates>
                    ${safecoordinates} ${safecoordinateslast}
					      </coordinates>
                </LineString>
                </Placemark>`;
    });
  }
  return `<?xml version="1.0" encoding="UTF-8"?>
    <kml xmlns="http://www.opengis.net/kml/2.2" xmlns:gx="http://www.google.com/kml/ext/2.2" xmlns:kml="http://www.opengis.net/kml/2.2" xmlns:atom="http://www.w3.org/2005/Atom">
    <Document>
        <name>FlightPlan</name>
        ${placemarks}
        ${route}
        ${safearea}
        ${safearea8}
        ${safearea12}
    </Document>
    </kml>`;
}

export default Convert;
