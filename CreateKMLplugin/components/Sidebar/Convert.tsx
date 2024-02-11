import React from "react";
import {
  ConvertProps,
  WaypointCreate,
  GeoFencepointCreate,
  GeoFenceSettingPointCreate,
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

const KMLConverter: React.FC<ConvertProps> = ({
  waypoints,
  geofencepoints,
  geoFenceSettingPoint,
  homePoint,
}) => {
  const kmlContent: string = generateKML(
    waypoints,
    geofencepoints,
    geoFenceSettingPoint,
    homePoint
  );
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
};

function generateKML(
  waypoints: WaypointCreate[],
  geofencepoints: GeoFencepointCreate[],
  geoFenceSettingPoint: GeoFenceSettingPointCreate,
  homePoint: any
): string {
  if (!waypoints || !Array.isArray(waypoints)) {
    throw new Error("Waypoints are invalid");
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
  let returnPoint = "";
  let homePointPlacemark = "";

  function getName(command) {
    let waypointName = "";
    switch (command) {
      case 0:
        waypointName = "Manual";
        break;
      case 1:
        waypointName = "ReturnToLaunch";
        break;
      case 2:
        waypointName = "Stabilize";
        break;
      case 3:
        waypointName = "FlyByWireA";
        break;
      case 4:
        waypointName = "FlyByWireB";
        break;
      case 5:
        waypointName = "FlyByGCS";
        break;
      case 6:
        waypointName = "Circle";
        break;
      case 7:
        waypointName = "WayPoint";
        break;
      case 8:
        waypointName = "LoiterUnlimited";
        break;
      case 9:
        waypointName = "LoiterTurns";
        break;
      case 10:
        waypointName = "LoiterTime";
        break;
      case 11:
        waypointName = "LoiterAltitude";
        break;
      case 12:
        waypointName = "ApproachLanding";
        break;
      case 13:
        waypointName = "Land";
        break;
      case 14:
        waypointName = "TakeOff";
        break;
      case 15:
        waypointName = "TaxiStop";
        break;
      case 16:
        waypointName = "TaxiToPoint";
        break;
      case 17:
        waypointName = "TaxiSpeedUp";
        break;
      case 18:
        waypointName = "SetServoAngle";
        break;
      case 19:
        waypointName = "Sit";
        break;
      case 20:
        waypointName = "SetFlightParam";
        break;
      case 21:
        waypointName = "Rescue";
        break;
      case 22:
        waypointName = "Jump";
        break;
      case 23:
        waypointName = "VtolStabilize";
        break;
      case 24:
        waypointName = "VtolHoverByWire";
        break;
      case 25:
        waypointName = "VtolSpeedHold";
        break;
      case 26:
        waypointName = "VtolPositionHold";
        break;
      case 27:
        waypointName = "VtolSpeedUp";
        break;
      case 28:
        waypointName = "VtolTakeOff";
        break;
      case 29:
        waypointName = "VtolLand";
        break;
      case 30:
        waypointName = "VtolHoverTime";
        break;
      case 31:
        waypointName = "RequestDeviceAction";
        break;
      case 32:
        waypointName = "Launch";
        break;
      case 33:
        waypointName = "ChuteLand";
        break;
      case 34:
        waypointName = "VtolTest";
        break;
      default:
        console.error("Unknown waypoint command");
        break;
    }
    return waypointName;
  };

  const geoFenceLoiterPoints = [];

  function generateSafeAreaPlacemark(id, name, area) {
    return `<Placemark id="">
              <name>${name}</name>
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
                      ${area}
                    </coordinates>
                  </LinearRing>
                </outerBoundaryIs>
              </Polygon>
            </Placemark>`;
  }
  
  waypoints.forEach((waypoint) => {
    if (
      waypoint &&
      waypoint.Latitude &&
      waypoint.Longitude &&
      waypoint.Altitude
    ) {
      coordinates += `${waypoint.Longitude},${waypoint.Latitude},${waypoint.Altitude}\n`;
      placemarks += `<Placemark id="">
                  <name>${getName(waypoint.Command)}</name>
                  <Point>
                  <coordinates>${waypoint.Longitude},${waypoint.Latitude},${
        waypoint.Altitude
      }</coordinates>
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
  
      const command = waypoint.Command;
  
      if (command >= 8 && command <= 12) {
        const distance = modCalculate(waypoint.Parameter);
        const center = {
          longitude: waypoint.Longitude,
          latitude: waypoint.Latitude,
        };
        const allPoints = generatePoints(center, distance);
        const area = allPoints
          .map(
            (point) =>
              `${point.longitude},${point.latitude},${waypoint.Altitude}`
          )
          .join("\n");
  
        const safeAreaId = command === 8 ? "" : command;
        const safeAreaName = `safearea${safeAreaId}`;
  
        geoFenceLoiterPoints.push(generateSafeAreaPlacemark(safeAreaId, safeAreaName, area));
      } else {
        console.error("Loiter point not found");
      }
    }
  });
  const geoFenceMaxHight = Math.round(geoFenceSettingPoint.MaxAlt);
  returnPoint = `<Placemark id="">
                <name>Return Point</name>
                <Style >
			          <IconStyle>
				        <color>ffff0000</color>
				        </IconStyle>
                <LabelStyle>
				        <color>ffcc0000</color>
			          </LabelStyle>
                </Style>
                <Point>
                <coordinates>${geoFenceSettingPoint.RetLon},${geoFenceSettingPoint.RetLat},${geoFenceMaxHight}</coordinates>
                </Point>
                </Placemark>`;
  homePointPlacemark = `<Placemark id="">
                        <name>Home Point</name>
                        <Style >
			                  <IconStyle>
				                <color>ff0000ff</color>
				                <Icon>
					              <href>https://maps.google.com/mapfiles/kml/pal3/icon21.png</href>
				                </Icon>
			                  </IconStyle>
                        <LabelStyle>
				                <color>ff0000ff</color>
			                  </LabelStyle>
		                    </Style>
                        <Point>
                      <coordinates>${homePoint.Longitude},${homePoint.Latitude},${homePoint.Altitude}</coordinates>
                      </Point>
                      </Placemark>`;

  if (geofencepoints && Array.isArray(geofencepoints)) {
    geofencepoints.forEach((geofencepoint, index): void => {
      safecoordinates += `${geofencepoint.Longitude},${geofencepoint.Latitude},${geoFenceMaxHight}\n`;
      let safecoordinateslast = `${geofencepoints[0].Longitude},${geofencepoints[0].Latitude},${geoFenceMaxHight}\n`;
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
        ${geoFenceLoiterPoints.join('\n')}
        ${returnPoint}
        ${homePointPlacemark}
    </Document>
    </kml>`;
}

export default KMLConverter;
