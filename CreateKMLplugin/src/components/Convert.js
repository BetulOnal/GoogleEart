import React from 'react';

export default function Convert({ waypoints }) {
    const kmlContent = generateKML(waypoints);

    const handleDownload = () => {
        const blob = new Blob([kmlContent], { type: 'application/vnd.google-earth.kml+xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
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

function generateKML(waypoints) {
    if (!waypoints || !Array.isArray(waypoints)) {
        console.error("Waypoints are invalid ");
        return '';
    }

    let coordinates = '';

    waypoints.forEach((waypoint) => {
        if (waypoint && waypoint.Latitude && waypoint.Longitude && waypoint.Altitude) {
            coordinates += `${waypoint.Longitude},${waypoint.Latitude},${waypoint.Altitude}\n`;
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
      <Placemark id="0CC905A2362E00097BDB">
      <name>4points</name>
      <LookAt>
          <longitude>32.83512734010666</longitude>
          <latitude>39.8981913599981</latitude>
          <altitude>944.8738548983249</altitude>
          <heading>0</heading>
          <tilt>0</tilt>
          <gx:fovy>30</gx:fovy>
          <range>754.4297002805253</range>
          <altitudeMode>absolute</altitudeMode>
      </LookAt>
      <styleUrl>#__managed_style_0A1DE3C3ED2E00097BDB</styleUrl>
      <LineString>
          <coordinates>
          ${coordinates.trim()}
          </coordinates>
      </LineString>
  </Placemark>
    </Document>
    </kml>`;
}
