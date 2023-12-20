import React from 'react';
import { FC, useState, useEffect } from "react";
import { Button, Modal, Tabs } from "antd";
import { message, Result } from "antd";
import { IPluginApi } from "@qandq/cloud-gcs-core";
import { Col, Row, RowProvider } from "@qandq/plugin-grid-system"
import Info from "./Info";
import SelfCheck from "./SelfCheck";
import Servo from "./Servo";
import Joystick from "./Joystick"
import VTOL from "./VTOL"
import Airspeed from './Airspeed';



const packageJson = require("../../package.json") as any;

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
  const [open, setOpen] = useState<boolean>(false);
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
      ) : (
        <div className="App">
      <>
        <Button type="primary" onClick={() => setOpen(true)}>
          Pre-flight Check List
        </Button>
        <Modal
          title="Pre-flight Check List  "
          centered
          visible={open}
          onOk={() => setOpen(false)}
          onCancel={() => setOpen(false)}
          width={1000}
        >
          <Tabs defaultActiveKey="tab1">
            <Tabs.TabPane tab="Info" key="tab1">
              <Info/>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Self checks" key="tab2">
               <SelfCheck/>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Airspeed test" key="tab3">
                <Airspeed/>
            </Tabs.TabPane>
            <Tabs.TabPane tab="VTOL test" key="tab4">
            <VTOL/>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Servo test" key="tab5">
            <Servo/>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Joystick test" key="tab6">
            <Joystick/>
            </Tabs.TabPane>
            <Tabs.TabPane tab="RC test" key="tab7">
              <div>RC test </div>
            </Tabs.TabPane>
          </Tabs>
        </Modal>
      </>
    </div>
      )}
    </RowProvider>
  );
};