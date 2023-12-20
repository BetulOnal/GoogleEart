import React from "react";
import { Button, Card, Row, Col } from "antd";

const Servo: React.FC = () => {
    const handleStopServoTest = (): void => {
        console.log("Stop Servo Test");
    };

    const handleZeroAllSurfaces = (): void => {
        console.log("Zero All Surfaces");
    };

    return (
        <div style={{ padding: "50px", width: "600px", margin: "0 auto" }}>
            
                <Row gutter={16}>
                    <Col span={24} >
                        <Row justify="center" align="top" style={{ height: '35px' }}>
                            <Button type="primary" onClick={handleStopServoTest}>
                                Stop Servo Test
                            </Button>
                        </Row>
                        <Row justify="center" align="top" style={{ height: '35px' }}>
                            <Button onClick={handleZeroAllSurfaces}>Zero All Surfaces</Button>
                        </Row>
                    </Col>
                </Row>
                <Row gutter={16} style={{ marginTop: "20px" }}>
                    <Col span={24} style={{ textAlign: "center" }}>
                        <img
                            src='./aircraft.png'
                            alt="Aircraft"
                            style={{ maxWidth: "100%", height: "auto" }}
                        />
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <div style={{ textAlign: "left" }}>Left aileron up 12°</div>
                    </Col>
                    <Col span={12}>
                        <div style={{ textAlign: "right" }}>Right aileron up 12°</div>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <div style={{ textAlign: "left" }}>Rudder left 12°</div>
                    </Col>
                    <Col span={12}>
                        <div style={{ textAlign: "right" }}>Rudder right 12°</div>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <div style={{ textAlign: "center" }}>Elevator up 12°</div>
                    </Col>
                    <Col span={24}>
                        <div style={{ textAlign: "center" }}>Elevator down 12°</div>
                    </Col>
                </Row>
            
        </div>
    );
};

export default Servo;