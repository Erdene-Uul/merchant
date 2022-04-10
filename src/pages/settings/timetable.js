import React, { useState, useEffect } from "react";
import {
  Card,
  Tabs,
  Modal,
  Table,
  Calendar,
  Badge,
  Select,
  Button,
  Form,
  Input,
} from "antd";

const { Option } = Select;

function handleChange(value) {
  console.log(`selected ${value}`);
}
const TimeTable = () => {
  const [editingRow, setEditingRow] = useState(null);
  const [dataSource, setDataSource] = useState([]);
  // const form = Form.useForm();
  useEffect(() => {
    const data = [];
    for (let index = 0; index < 7; index++) {
      data.push({
        key: `${index}`,
        monday: "9:10-12:10",
        tuesday: "12:10-14:10",
        wednesday: "14:10-16:10",
        thursday: "16:10-18:10",
        friday: "18:10-20:10",
        saturday: "20:10-22:10",
        sunday: "22:10-24:10",
      });
    }
    setDataSource(data);
  });
  // const dataSource = [
  //   {
  //     key: "1",
  //     name: "Mike",
  //     age: 32,
  //     address: "10 Downing Street",
  //   },
  //   {
  //     key: "2",
  //     name: "John",
  //     age: 42,
  //     address: "10 Downing Street",
  //   },
  // ];

  const columns = [
    {
      title: "Monday",
      dataIndex: "monday",
      key: "monday",
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item
              name="monday"
              rules={[{ required: true, message: "LOL" }]}
            >
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "Tuesday",
      dataIndex: "tuesday",
      key: "tuesday",
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item
              name="tuesday"
              rules={[{ required: true, message: "LOL" }]}
            >
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "Wednesday",
      dataIndex: "wednesday",
      key: "wednesday",
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item
              name="wednesday"
              rules={[{ required: true, message: "LOL" }]}
            >
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "Thursday",
      dataIndex: "thursday",
      key: "thursday",
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item
              name="thursday"
              rules={[{ required: true, message: "LOL" }]}
            >
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "Friday",
      dataIndex: "friday",
      key: "friday",
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item
              name="friday"
              rules={[{ required: true, message: "LOL" }]}
            >
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "Saturday",
      dataIndex: "saturday",
      key: "saturday",
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item
              name="sunday"
              rules={[{ required: true, message: "LOL" }]}
            >
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "Sunday",
      dataIndex: "sunday",
      key: "sunday",
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item
              name="sunday"
              rules={[{ required: true, message: "LOL" }]}
            >
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "Actions",
      render: (_, record) => {
        return (
          <>
            <Button
              type="link"
              onClick={() => {
                setEditingRow(record.key);
                form.setFieldsValue({
                  monday: record.monday,
                  tuesday: record.tuesday,
                  wednesday: record.wednesday,
                  thursday: record.thursday,
                  friday: record.friday,
                  saturday: record.saturday,
                  sunday: record.sunday,
                });
              }}
            >
              Edit
            </Button>
            <Button type="link" htmlType="submit">
              Save
            </Button>
          </>
        );
      },
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
      <Form form={form}>
        <Table dataSource={dataSource} columns={columns} />
      </Form>
      ;
      {/* <Modal
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
      </Modal> */}
    </div>
  );
};
export default TimeTable;
