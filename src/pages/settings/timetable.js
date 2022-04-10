import {
  Card,
  Tabs,
  Modal,
  Table,
  Calendar,
  Badge,
  Select,
  Button,
} from "antd";
import React, { useState } from "react";

const { Option } = Select;

function handleChange(value) {
  console.log(`selected ${value}`);
}
const TimeTable = () => {
  const tableData = [
    {
      id: "0",
      day: "monday",
      start_date: "09:00:00",
      end_date: "18:00:00",
      mode: "day",
    },
    {
      id: "1",
      day: "tuesday",
      start_date: "09:00:00",
      end_date: "18:00:00",
      mode: "day",
    },
    {
      id: "2",
      day: "wednesday",
      start_date: "09:00:00",
      end_date: "18:00:00",
      mode: "day",
    },
    {
      id: "3",
      day: "thursday",
      start_date: "09:00:00",
      end_date: "18:00:00",
      mode: "day",
    },
    {
      id: "4",
      day: "friday",
      start_date: "09:00:00",
      end_date: "18:00:00",
      mode: "day",
    },
    {
      id: "5",
      day: "saturday",
      start_date: "09:00:00",
      end_date: "18:00:00",
      mode: "day",
    },
    {
      id: "6",
      day: "sunday",
      start_date: null,
      end_date: null,
      mode: "closed",
    },
  ];
  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];

  const columns = [
    {
      title: "Monday",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Tuesday",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Wednesday",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Thursday",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Friday",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Saturday",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Sunday",
      dataIndex: "name",
      key: "name",
    },
  ];

  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div>
      {/* <Select
        mode="multiple"
        style={{ width: "100%" }}
        placeholder="Өдрөө сонгоно уу!"
        onChange={handleChange}
        optionLabelProp="label"
      >
        <Option value="monday" label="Даваа">
          <div>Даваа</div>
        </Option>
        <Option value="tuesday" label="Мягмар">
          <div>Мягмар</div>
        </Option>
        <Option value="wednesday" label="Лхагва">
          <div>Лхагва</div>
        </Option>
        <Option value="thursday" label="Пүрэв">
          <div>Пүрэв</div>
        </Option>
        <Option value="friday" label="Баасан">
          <div>Баасан</div>
        </Option>
      </Select> */}
      <Table dataSource={dataSource} columns={columns} />;
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Select style={{ width: "100%" }} mode="multiple">
          {tableData.map((item) => (
            <Option value={item.id + ""} key={item.id}>
              {item.day}
            </Option>
          ))}
          {tableData.map((e) => (
            <Option key={e.day}>{e.day}</Option>
          ))}
        </Select>
      </Modal>
    </div>
  );
};
export default TimeTable;
