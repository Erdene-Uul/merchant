import React from "react";
import { EditOutlined } from "@ant-design/icons";
import { Modal, Select } from "antd";
const { Option } = Select;

const Test = () => {
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
  //   const useTimeTableColumn = ({ setEditTimeTable, setValues, values }) => [
  //     {
  //       title: "Weekday",
  //       // dataIndex: "day",
  //       render: (record) => <div>{record.day.toLowerCase()}</div>,
  //     },
  //     {
  //       title: "Work Hour",
  //       // dataIndex: "work_hour",
  //       render: (record) => {
  //         if (record.mode === "day") {
  //           return (
  //             <div>{`${record.start_date ? record.start_date : "--:--:--"}-${
  //               record.end_date ? record.end_date : "--:--:--"
  //             }`}</div>
  //           );
  //         }
  //         if (record.mode === "hour24") {
  //           return <div>{"24 hours open"}</div>;
  //         }
  //         if (record.mode === "closed") {
  //           return <div>{"Closed"}</div>;
  //         }
  //       },
  //     },
  //     {
  //       title: "",
  //       render: (row) => (
  //         <div className="text-right">
  //           <EditOutlined onClick={() => setEditTimeTable(row)} />
  //         </div>
  //       ),
  //     },
  //   ];
  return (
    <div>
      <Modal centered title="Hours" maskClosable={false}>
        <Select
          value={editTable}
          placeholder="choose days"
          mode="multiple"
          allowClear
          style={{ width: "100%" }}
          onChange={(e) => {
            setEditTable(e);
          }}
        >
          {Modal.time_table.map((item) => (
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
export default Test;
