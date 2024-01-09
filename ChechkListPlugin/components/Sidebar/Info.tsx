import React, { useState } from "react";
import { Col, InputNumber, Row, Slider } from "antd";
import { Form, Space } from "antd";


let value1 = 0;
let value2 = 0;
let setResult: any = undefined;

export const updateResult = () => {
  const result = value1 + value2 * 0.74 + 44.6;

  if (setResult !== undefined) setResult(result);

  return result;
};

export const IntegerStep1: React.FC = () => {
  const [inputValue, setInputValue] = useState<number>(0);

  const onChange = (newValue: number | null) => {
    setInputValue(newValue || 0);  // Use 0 if newValue is null
    value1 = newValue || 0;
    updateResult();
  };

  return (
    <Row>
      <Col span={8}>
        <InputNumber
          min={1}
          max={10}
          style={{
            margin: "0 16px",
          }}
          value={inputValue}
          onChange={onChange}
        />
      </Col>
      <div>kg</div>
      <Col span={12}>
        <Slider
          min={0}
          max={10}
          onChange={onChange}
          value={typeof inputValue === "number" ? inputValue : 0}
          step={0.1}
        />
      </Col>
    </Row>
  );
};

export const IntegerStep2: React.FC = () => {
  const [inputValue, setInputValue] = useState<number>(0);

  const onChange = (newValue: number | null) => {
    setInputValue(newValue || 0);  // Use 0 if newValue is null
    value2 = newValue || 0;
    updateResult();
  };

  return (
    <Row>
      <Col span={8}>
        <InputNumber
          min={1}
          max={10}
          style={{
            margin: "0 16px",
          }}
          value={inputValue}
          onChange={onChange}
        />
      </Col>
      <div>kg</div>
      <Col span={12}>
        <Slider
          min={0}
          max={10}
          onChange={onChange}
          value={typeof inputValue === "number" ? inputValue : 0}
          step={0.1}
        />
      </Col>
      <Col span={8}>
        <InputNumber
          min={1}
          max={10}
          style={{
            margin: "0 16px",
          }}
          value={inputValue * 0.74}
          onChange={onChange}
        />
      </Col>
      <div>lt</div>
    </Row>
  );
};

export const IntegerStep3: React.FC = () => {
  const [inputValue, setInputValue] = useState<number>(44.6); // Specify the type as number
  const onChange = (newValue: number | null) => {
    setInputValue(newValue || 0);  // Use 0 if newValue is null
    // value3 = newValue || 0; // Uncomment if you have value3
    updateResult();
  };

  return (
    <Row>
      <Col span={8}>
        <InputNumber
          min={1}
          max={10}
          style={{
            margin: "0 16px",
          }}
          value={inputValue}
          onChange={onChange}
        />
      </Col>
      <div>kg</div>
    </Row>
  );
};

export const IntegerStep4: React.FC<{ inputValue1: number; inputValue2: number }> = ({
  inputValue1,
  inputValue2,
}) => {
  const initialValue = Math.floor(inputValue1 + inputValue2 + 44.6);
  const [inputValue, setInputValue] = useState<number>(initialValue); // Specify the type as number
const onChange = (newValue: number | null) => {
  setInputValue(Math.floor(newValue || 0)); // Use 0 if newValue is null
};

  return (
    <Row>
      <Col span={8}>
        <InputNumber
          min={1}
          max={10}
          style={{
            margin: "0 16px",
          }}
          value={inputValue}
          onChange={onChange}
        />
      </Col>
      <div>kg</div>
    </Row>
  );
};

const Info: React.FC = () => {
  return (
    <Space
      style={{
        width: "100%",
      }}
      direction="vertical"
    >
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
      >
        <Form.Item className="Payloud Weight" label="Payload Weight">
          <IntegerStep1 />
        </Form.Item>

        <Form.Item className="Fuel Weight" label="Fuel Weight">
          <IntegerStep2 />
        </Form.Item>
        <Form.Item className="Empty Weight" label="Empty Weight">
          <IntegerStep3 />
        </Form.Item>
        <Form.Item className="Take-off Weight" label="Take-off Weight">
          <IntegerStep4 inputValue1={0} inputValue2={0} />
        </Form.Item>
      </Form>
    </Space>
  );
};

export default Info;
