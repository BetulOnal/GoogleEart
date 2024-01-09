import React from "react";
import { Select, Button,InputNumber,Space,Layout,Col, Row, Card,} from "antd";

const { Header, Footer, Sider } = Layout;

const handleChange = (value: string): void => {
  console.log(`selected ${value}`);
};

// Corrected onChange function to handle the expected types
const onChange = (value: number | null): void => {
  console.log("changed", value);
};

const leftAlignedTextStyle: React.CSSProperties = {
  textAlign: 'left',
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
  backgroundColor: "#FFFFFF",
  width: "300px",
  minWidth: "200px",
  float: "left",
};

export const footerStyle: React.CSSProperties = {
  color: "#fff",
  backgroundColor: "#FFFFFF",
  lineHeight: "80px",
};

const App: React.FC = () => (
  <Space direction="vertical" style={{ width: "100%" }} size={[0, 48]}>
    <Layout>
      <Header style={headerStyle}>
        <Row>
          <Col span={2} style={{ marginTop: "10px" }}>
            <div>Duration:</div>
          </Col>
          <Col>
            <Select
              defaultValue="(Select)"
              style={{ width: 120 }}
              onChange={handleChange}
              options={[
                { value: "(Select)", label: "(Select)" },
                { value: "5 sec", label: "5 sec" },
                { value: "15 sec", label: "15 sec" },
                { value: "30 sec", label: "30 sec" },
                { value: "60 sec", label: "60 sec" },
                { value: "120 sec", label: "120 sec" },
              ]}
            />
          </Col>
          <Col span={2} style={{ marginTop: "10px" }}>
            <div>Throttle %</div>
          </Col>
          <Col>
            <InputNumber
              defaultValue={30}
              min={0}
              max={100}
              formatter={(value) => `${value}%`}
              // Corrected parser function to handle the expected types
              parser={(value?: string) => value ? parseInt(value.replace("%", ""), 10) : 0}
              onChange={onChange}
            />
          </Col>
          <Col span={5}>
            <Button>Test VTOL Motors</Button>
          </Col>
          <Col>
            <Button>Stop Test</Button>
          </Col>
        </Row>
      </Header>
      <Layout hasSider>
        <Sider style={siderStyle}>
          <Card>
            <p style={leftAlignedTextStyle}> - </p>
            <p style={leftAlignedTextStyle}>Airspeed status: Healthy</p>
            <p style={leftAlignedTextStyle}>Airspeed 0: 4.7 m/s</p>
            <p style={leftAlignedTextStyle}>Airspeed 1: -1.2 m/s</p>
          </Card>
        </Sider>
      </Layout>
      <Footer style={footerStyle}>
        <Button style={{ marginLeft: 1 }}>Create graphs</Button>
      </Footer>
    </Layout>
  </Space>
);

export default App;