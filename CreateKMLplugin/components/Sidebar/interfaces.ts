export interface ConvertProps {
  waypoints: WaypointCreate[];
  geofencepoints: GeoFencepointCreate[];
  geoFenceSettingPoint: GeoFenceSettingPointCreate; 
};

export interface WaypointCreate{
  Index: number;
  Command: number;
  Latitude: number;
  Longitude: number;
  Altitude: number;
  Parameter: number ;
    
  };

export interface GeoFencepointCreate{
    Latitude: number;
    Longitude: number;
    Altitude: number;
  };

export interface GeoFenceSettingPointCreate{
    RetLat: number;
    RetLon: number;
    MinAlt: number;
    MaxAlt: number;
  };

export interface WaypointCatch {
  Index: number;
  Command: number;
  Latitude: number;
  Longitude: number;
  Altitude: number;
  Parameter: number ;
  };

export interface GeoFenceSettingPointCatch{
  RetLat: number;
  RetLon: number;
  MinAlt: number;
  MaxAlt: number;
}
  

export interface HandleProps {
  onUpdateWaypoints: (waypoints: WaypointCatch[]) => void;
  onUpdateGeoFencePoints: (geofencepoints: GeoFencePoint[]) => void;
  onUpdateGeoFenceSettingPoint: (geoFenceSettingPoint: GeoFenceSettingPointCreate) => void; 
};

export interface GeoFencePoint{
  Latitude: number;
  Longitude: number;
};



