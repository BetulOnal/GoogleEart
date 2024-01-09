import React, { Component } from "react";
import { Layout, Row, Space } from "antd";
import { Checkbox, Col } from "antd";
import { Button } from "antd";

const { Header, Footer, Sider, Content } = Layout;

interface CheckboxItem {
  name: string;
  status: boolean;
}

const checkboxes: CheckboxItem[] = [
  { name: "Computer PowerCheck", status: false },
  { name: "Link Rate Check", status: false },
  { name: "Fuel Level Check", status: false },
  { name: "Power Check", status: false },
  { name: "Map Altitude Check", status: false },
  { name: "GPS Check", status: false },
  { name: "IMU Check", status: false },
  { name: "Travel Status Check", status: false },
  { name: "RC Handset Test", status: false },
  { name: "Joystick Test", status: false },
  { name: "Rpm Test", status: false },
];

const checkboxes1: CheckboxItem[] = [
  { name: "Computer PowerCheck", status: true },
  { name: "Link Rate Check", status: false },
  { name: "Fuel Level Check", status: true },
  { name: "Power Check", status: false },
  { name: "Map Altitude Check", status: true },
  { name: "GPS Check", status: false },
  { name: "IMU Check", status: false },
  { name: "Travel Status Check", status: true },
  { name: "RC Handset Test", status: true },
  { name: "Joystick Test", status: false },
  { name: "Rpm Test", status: true },
];

const onChange = (checkedValues: any) => {
  const matchedValues = checkboxes.filter((value) =>
    checkedValues.includes(value.name)
  );
  console.log("Matched values:", matchedValues);
};

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  height: 64,
  paddingInline: 50,
  lineHeight: "64px",
  backgroundColor: "white",
};

const contentStyle1: React.CSSProperties = {
  textAlign: "center",
  minHeight: 120,
  margin: " 16px",
  lineHeight: "120px",
  backgroundColor: "lightblue",
  width: "500px",
  minWidth: "300px",
  float: "right",
};

const contentStyle2: React.CSSProperties = {
  textAlign: "center",
  minHeight: 120,
  margin: " 16px",
  lineHeight: "120px",
  backgroundColor: "#FFB6C1",
  width: "500px",
  minWidth: "300px",
  float: "right",
};

// const siderStyle: React.CSSProperties = {};

const footerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#FFB6C1",
  lineHeight: "80px",
};

interface SelfCheckProps { }

interface SelfCheckState {
  C_Checkboxes: CheckboxItem[];
}

class SelfCheck extends Component<SelfCheckProps, SelfCheckState> {
  constructor(props: SelfCheckProps) {
    super(props);
    this.state = {
      C_Checkboxes: checkboxes,
    };
  }

  handleClick = () => {
    const newCheckboxes = [...checkboxes1];
    this.setState({ C_Checkboxes: newCheckboxes });
  };

  render() {
    console.log("abc", this.state.C_Checkboxes);
    return (
      <Space direction="vertical" style={{ width: "100%" }} size={[0, 48]}>
        <Layout>
          <Header style={headerStyle}>
            <Row gutter={8} wrap>
              <Col>
                <Button onClick={this.handleClick}>Start</Button>
              </Col>
              <Col>
                <Button>Skip</Button>
              </Col>
              <Col>
                <Button>Stop</Button>
              </Col>
              <Col>
                <Button>Reset</Button>
              </Col>
            </Row>
          </Header>
          <Layout hasSider>
            <Sider style ={{  textAlign: "center",
  lineHeight: "120px",
  backgroundColor: "white",
  width: "500px",
  minWidth: "300px",
  float: "left",}} >
              <Checkbox.Group style={{ width: "100%" }} onChange={onChange}>
                <Col>
                  {this.state.C_Checkboxes.map((checkboxValue, index) => (
                    <Row key={index}>
                      <Checkbox
                        checked={checkboxValue.status}
                        value={checkboxValue.name}
                      >
                        {checkboxValue.name}
                      </Checkbox>
                    </Row>
                  ))}
                </Col>
              </Checkbox.Group>
            </Sider>
            <Content>
              <Content className="Content1" style={contentStyle1}>
                Content 1
              </Content>
              <Content className="Content2" style={contentStyle2}>
                Content 2
              </Content>
            </Content>
          </Layout>
          <Footer style={footerStyle}>Footer</Footer>
        </Layout>
      </Space>
    );
  }
}

export default SelfCheck;
