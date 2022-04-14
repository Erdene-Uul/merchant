import React from "react";
import { Checkbox } from "antd";

export default function TimeCheckbox({ action }) {
  return (
    <div className="mt-7 flex space-x-4 items-center">
      <div>9:00-10:00</div>
      <Checkbox onChange={action?.onChange} checked={action?.checked}>
        ordered
      </Checkbox>
      <div>9:00-10:00</div>
      <Checkbox onChange={action?.onChange1} checked={action?.checked1}>
        ordered
      </Checkbox>
      <div>9:00-10:00</div>
      <Checkbox onChange={action?.onChange2} checked={action?.checked2}>
        ordered
      </Checkbox>
    </div>
  );
}
