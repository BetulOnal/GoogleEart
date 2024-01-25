export interface ConvertProps {
    waypoints:(string|number)[];
    geofencepoint:(string|number)[];
  };

export interface WaypointCreate{
    Latitude: number;
    Longitude: number;
    Altitude: number;
    // Add other properties if needed
  };
  export interface GeoFencepointCreate{
    Latitude: number;
    Longitude: number;
    Altitude: number;
    // Add other properties if needed
  };

 export interface WaypointCatch {
    Index: string;
    Command: string;
    Latitude: number;
    Longitude: number;
    Altitude: number;
    Parameter: string;
  };
  
export interface HandleProps {
    onUpdateWaypoints: (waypoints: WaypointCatch[]) => void;
  }; 

export interface GeoFencePoint{
  Latitude: number;
  Longitude: number;
};