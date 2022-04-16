import React from "react";
import { Calendar, Badge, Modal, Form, Input, Button } from "antd";
let day = 0;
const Calendars = () => {
  const [isModalVisible, setIsModalVisible] = React.useState(true);
  const [selectDate, setSelectDate] = React.useState();
  const [calendars, setCalendars] = React.useState([]);
  const [form] = Form.useForm();
  const showModal = (value) => {
    setSelectDate(value.toDate());
  };
  const onClose = () => {
    setSelectDate(!selectDate);
  };
  function getListData(value) {
    let listData = [];

    calendars.forEach((e) => {
      const _date = new Date(e.selectDate);
      _date.setHours(23, 59, 59, 59);
      const _date2 = new Date(e.selectDate);
      _date2.setHours(0, 0, 0, 0);
      if (_date2 < value && value < _date)
        listData.push({
          type: "warning",
          content: e.about,
        });
    });

    return listData || [];
  }

  function dateCellRender(value) {
    const date = value.toDate();
    const listData = getListData(date);
    return (
      <ul>
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  }

  function getMonthData(value) {
    if (value.month() === 8) {
      return 1394;
    }
  }

  function monthCellRender(value) {
    const num = getMonthData(value);
    return num ? (
      <div>
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  }
  const onOk = () => {
    setIsModalVisible(false);
  };
  return (
    <div>
      <Calendar
        dateCellRender={dateCellRender}
        monthCellRender={monthCellRender}
        onSelect={showModal}
      />
      <Modal
        destroyOnClose={true}
        title="Basic Modal"
        visible={!!selectDate}
        footer={null}
        onCancel={onClose}
      >
        <Form
          onFinish={(e) => {
            setCalendars([
              ...calendars,
              {
                ...e,
                selectDate: selectDate,
              },
            ]);
            setSelectDate(null);
            form.resetFields();
            console.log(calendars);
          }}
        >
          <Form.Item name="about">
            <Input.TextArea
              className=" h-20 w-72 border-2 rounded-md px-2 text-sm placeholder:"
              placeholder="Юуны талаар:"
            ></Input.TextArea>
          </Form.Item>
          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Хадгалах
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default Calendars;
