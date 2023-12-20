import React, { useState } from "react";
import { Slider, Typography } from "antd";


const { Title } = Typography;

interface IconSliderProps {
  max: number;
  min: number;
}

const IconSlider: React.FC<IconSliderProps> = ({ max, min }) => {
  const [value, setValue] = useState<number>(0);

  const handleChange = (newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="icon-wrapper" style={{ width: 200 }}>
      <div className="label">Rudder</div>
      <Slider
        min={min}
        max={max}
        onChange={handleChange}
        value={typeof value === "number" ? value : 0}
        marks={{ 0: "0°" }}
        defaultValue={30}
      />
    </div>
  );
};

const IconSlider2: React.FC<IconSliderProps> = ({ max, min }) => {
  const [value, setValue] = useState<number>(0);

  const handleChange = (newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="icon-wrapper" style={{ height: 200 }}>
      <Slider
        min={min}
        max={max}
        onChange={handleChange}
        value={typeof value === "number" ? value : 0}
        marks={{ 0: "0°" }}
        vertical
        defaultValue={0}
      />
      <div className="label">Throttle %0</div>
    </div>
  );
};

const IconSlider3: React.FC<IconSliderProps> = ({ max, min }) => {
  const [value, setValue] = useState<number>(0);

  const handleChange = (newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="icon-wrapper" style={{ height: 200 }}>
      <div className="label">Elevator</div>
      <Slider
        min={min}
        max={max}
        onChange={handleChange}
        value={typeof value === "number" ? value : 0}
        marks={{ 0: "0°" }}
        vertical
        defaultValue={30}
      />
    </div>
  );
};

const IconSlider4: React.FC<IconSliderProps> = ({ max, min }) => {
  const [value, setValue] = useState<number>(0);

  const handleChange = (newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="icon-wrapper" style={{ width: 200 }}>
      <Slider
        min={min}
        max={max}
        onChange={handleChange}
        value={typeof value === "number" ? value : 0}
        marks={{ 0: "0°" }}
        defaultValue={30}
      />
      <div className="label">Aileron</div>
    </div>
  );
};

const FlightControlPanel: React.FC = () => {
  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "center", textAlign: "center" }}>
        <IconSlider min={-30} max={30} />
      </div>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{ marginRight: "60px" }}>
          <IconSlider2 min={0} max={30} />
        </div>
        <div style={{ textAlign: "center" }}>
          <Title level={4} type="danger">Joystick Not Found</Title> {/* Ensure proper usage of Title */}
        </div>
        <div style={{ marginLeft: "60px" }}>
          <IconSlider3 min={-30} max={30} />
        </div>
      </div>
      <div style={{ marginTop : "40px"   ,display: "flex", justifyContent: "center", textAlign: "center" }}>
        <IconSlider4 min={-30} max={30} />
      </div>
    </div>
  );
};

export default FlightControlPanel;