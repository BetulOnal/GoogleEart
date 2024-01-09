import React, { Component } from "react";
import { Layout, Modal, Button, Space, Card } from "antd";
import { Row, Col } from "antd"; 

const { Header, Footer, Sider } = Layout;

const success = (): void => {
  Modal.success({
    content: "Offset will be reset for Airspeed 0. Cover to pitot!",
  });
};

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  height: 64,
  paddingInline: 50,
  lineHeight: "64px",
  backgroundColor: "white",
};

export const siderStyle: React.CSSProperties = {
  textAlign: "center",
  lineHeight: "120px",
  backgroundColor: "white",
  width: "300px",
  minWidth: "200px", // Corrected property name
  float: "left",
};

export const footerStyle: React.CSSProperties = {
  color: "#fff",
  backgroundColor: "#FFFFFF",
  lineHeight: "80px",
};

interface AirspeedState {
  // Define the state type here
}

export default class Airspeed extends Component<{}, AirspeedState> {
  constructor() {
    super({});
    this.state = {};
  }

  render(): JSX.Element {
    return (
      <Space direction="vertical" style={{ width: "100%" }} size={[0, 48]}>
        <Layout>
          <Header style={headerStyle}>
            {/* Using Row and Col for flex layout */}
            <Row gutter={[8, 8]} wrap>
              <Col>
                <Button onClick={success}>Reset sensor offset 0</Button>
              </Col>
              <Col>
                <Button>Reset sensor offset 1</Button>
              </Col>
            </Row>
          </Header>
          <Layout hasSider>
            <Sider style={siderStyle}>
              <Card>
                <p>Airspeed status: Healthy</p>
                <p>Airspeed 0: 4.7 m/sn</p>
                <p>Airspeed 1: -1.2 m/sn</p>
              </Card>
            </Sider>
          </Layout>
          <Footer style={footerStyle}>
            <Button style={{ marginLeft: 1 }}>Create graphs</Button>
          </Footer>
        </Layout>
      </Space>
    );
  }
}