import React from 'react';

interface ConvertProps {
    waypoints:(string|number)[];
  };

interface Waypoint {
    Latitude: number;
    Longitude: number;
    Altitude: number;
    // Add other properties if needed
  };

const Convert: React.FC<ConvertProps> = ({ waypoints }) => {
    // Assuming generateKML is a function that generates KML content based on waypoints
    const kmlContent: string = generateKML(waypoints);

    const handleDownload = () => {
        const blob:Blob = new Blob([kmlContent], { type: 'application/vnd.google-earth.kml+xml' });
        const url:string = URL.createObjectURL(blob);
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

function generateKML(waypoints:Waypoint[]):string {
    if (!waypoints || !Array.isArray(waypoints)) {
        console.error("Waypoints are invalid ");
        return '';
    }

    let coordinates = '';
    let placemarks='';
    let route='';

    waypoints.forEach((waypoint,index) => {
        if (waypoint && waypoint.Latitude && waypoint.Longitude && waypoint.Altitude) {
            coordinates += `${waypoint.Longitude},${waypoint.Latitude},${waypoint.Altitude}\n`;
            placemarks+= `<Placemark id="Waypoint-${index}">
            <name>Waypoint${index}</name>
            <LookAt>
                <longitude>${waypoint.Longitude}</longitude>
                <latitude>${waypoint.Latitude}</latitude>
                <altitude>${waypoint.Altitude}</altitude>
                <heading>0</heading>
                <tilt>0</tilt>
                <gx:fovy>35</gx:fovy>
                <range>3096.626845432038</range>
                <altitudeMode>absolute</altitudeMode>
            </LookAt>
            <styleUrl>#__managed_style_037290E05A2E28EFAFD0</styleUrl>
            <Point>
                <coordinates>${waypoint.Longitude},${waypoint.Latitude},${waypoint.Altitude}</coordinates>
            </Point>
            </Placemark>`;
            route = `<Placemark id="ROUTE">
            <name>ROUTE</name>
            <LookAt>
                <longitude>${waypoint.Longitude}</longitude>
                <latitude>${waypoint.Latitude}</latitude>
                <altitude>${waypoint.Altitude}</altitude>
                <heading>0</heading>
                <tilt>0</tilt>
                <gx:fovy>35</gx:fovy>
                <range>3096.626845432038</range>
                <altitudeMode>absolute</altitudeMode>
            </LookAt>
            <styleUrl>#__managed_style_037290E05A2E28EFAFD0</styleUrl>
            <LineString>
			<coordinates>
				${coordinates}
			</coordinates>
		    </LineString>
            </Placemark>`;
        }
    });
  
    return `<?xml version="1.0" encoding="UTF-8"?>
    <kml xmlns="http://www.opengis.net/kml/2.2" xmlns:gx="http://www.google.com/kml/ext/2.2" xmlns:kml="http://www.opengis.net/kml/2.2" xmlns:atom="http://www.w3.org/2005/Atom">
    <Document>
        <name>4points</name>
      <gx:CascadingStyle kml:id="__managed_style_242FACD5942E00097BDB">
          <Style>
              <IconStyle>
                  <scale>1.2</scale>
                  <Icon>
                      <href>https://earth.google.com/earth/rpc/cc/icon?color=1976d2&amp;id=2000&amp;scale=4</href>
                  </Icon>
                  <hotSpot x="64" y="128" xunits="pixels" yunits="insetPixels"/>
              </IconStyle>
              <LabelStyle>
              </LabelStyle>
              <LineStyle>
                  <color>ff2dc0fb</color>
                  <width>3</width>
              </LineStyle>
              <PolyStyle>
                  <color>49ffffff</color>
              </PolyStyle>
              <BalloonStyle>
                  <displayMode>hide</displayMode>
              </BalloonStyle>
          </Style>
      </gx:CascadingStyle>
      <gx:CascadingStyle kml:id="__managed_style_1CC2DE3E2A2E00097BDB">
          <Style>
              <IconStyle>
                  <Icon>
                      <href>https://earth.google.com/earth/rpc/cc/icon?color=1976d2&amp;id=2000&amp;scale=4</href>
                  </Icon>
                  <hotSpot x="64" y="128" xunits="pixels" yunits="insetPixels"/>
              </IconStyle>
              <LabelStyle>
              </LabelStyle>
              <LineStyle>
                  <color>ff2dc0fb</color>
                  <width>2</width>
              </LineStyle>
              <PolyStyle>
                  <color>40ffffff</color>
              </PolyStyle>
              <BalloonStyle>
                  <displayMode>hide</displayMode>
              </BalloonStyle>
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
    </Document>
    </kml>`;
}

export default Convert