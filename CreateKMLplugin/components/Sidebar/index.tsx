import React, { FC, useState, useEffect } from "react";
import { message, Result } from "antd";
import { IPluginApi } from "@qandq/cloud-gcs-core";
import { Col, Row, RowProvider } from "@qandq/plugin-grid-system"
const packageJson = require("../../package.json") as any;

import Handle from "./Handle";
import Convert from "./Covert";

interface ISidebar {
  pluginApi: IPluginApi;
}
export const Sidebar: FC<ISidebar> = ({ pluginApi }: ISidebar) => {
  const [showError, setShowError] = useState<boolean>(false);

  const handleAddFlightPlan = () => {
    if (!pluginApi.systemApi.selectedAircraftApi.isPluginSupported()) {
      setShowError(true);
    } else {
      setShowError(false);
    }
  };

  useEffect(() => {
    const activeAircraft = pluginApi.systemApi.selectedAircraftApi.getAircraftIdentifier();

    if (activeAircraft) {
      handleAddFlightPlan();
    }
    pluginApi.eventListener.onActiveAircraftChanged(handleAddFlightPlan);

    return () => {
      pluginApi.eventListener.removeActiveAircraftChanged(handleAddFlightPlan);
    };
  }, []);
  const [waypoints, setWaypoints] = useState([]);
  const [geofencepoints, setGeoFencePoints] = useState([]);
  const [maxAlt, setMaxAlt] = useState<number | undefined>();

  const updateMaxAlt = (newMaxAlt: number) => {
    setMaxAlt(newMaxAlt);
  };

  const updateWaypoints = (newWaypoints) => {
    setWaypoints(newWaypoints);
  };
  const updateGeoFencePoints = (newGeoFencePoints) => {
    setGeoFencePoints(newGeoFencePoints);
  };

  return (
    <RowProvider pluginParent={pluginApi.pluginUIManager.getRootElement()}>
      <Row between="md">
        <Col lg={5} md={5}></Col>
        <Col lg={5} md={5}></Col>
      </Row>
      {showError ? (
        //@ts-ignore
        <Result
          status="warning"
          title={`${packageJson.name} plugin is not installed in this aircraft.`}
        />
      ) :
       (
        <div>
        <Handle onUpdateWaypoints={updateWaypoints} onUpdateGeoFencePoints={updateGeoFencePoints}  onMaxAltChange={updateMaxAlt}/>
        <Convert waypoints={waypoints} geofencepoints={geofencepoints}/>
        </div>
      )}
    </RowProvider>
  );
};