import React from "react";
import { Checkbox, Button } from "antd";

export default function TimeCheckbox({ action }) {
  const options = [
    { label: "9:00-10:00", value: "9:00-10:00" },
    { label: "11:00-12:00", value: "11:00-12:00" },
    { label: "13:00-14:00", value: "13:00-14:00" },
  ];

  return (
    <div className="mt-7 flex space-x-4 items-center">
      <Checkbox.Group options={options} onChange={action?.onChange} />
    </div>
  );
}
