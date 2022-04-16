import {
  Card,
  Tabs,
  Modal,
  Calendar,
  Badge,
  Menu,
  Select,
  Checkbox,
  Row,
  Col,
} from "antd";
import Main from "components/layout/Main";
import TimeTable from "./timetable";
import Calendars from "./calendar";
import React from "react";
import Test from "./test";
import TimeCheckbox from "components/TimeCheckbox";
const { Option } = Select;

export default function SettingsPage() {
  const [order, setOrder] = React.useState([]);

  function onChanged(checkedValues) {
    let data = [...order];
    console.log("checked = ", checkedValues);
    order.push(checkedValues);
    setOrder(data);
    console.log(order);
  }
  const [key, setKey] = React.useState(0);

  const { TabPane } = Tabs;

  function callback(key) {
    console.log(key);
  }
  const onChange = (e) => {
    setKey(e);
  };
  return (
    <Main>
      <Card>
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="Ажиллах цагийн тохиргоо" key="1">
            <TimeTable className="text-black font-bold" />
          </TabPane>
          <TabPane tab="Цагийн тохиргоо" key="2">
            <Calendars />
          </TabPane>
          <TabPane tab="Test" key="3">
            <div className="flex space-x-20">
              <div className="max-w-sm">
                <Calendar
                  fullscreen={false}
                  headerRender={({ value, onChange }) => {
                    const start = 0;
                    const end = 12;
                    const monthOptions = [];

                    const current = value.clone();
                    const localeData = value.localeData();
                    const months = [];
                    for (let i = 0; i < 12; i++) {
                      current.month(i);
                      months.push(localeData.monthsShort(current));
                    }

                    for (let index = start; index < end; index++) {
                      monthOptions.push(
                        <Select.Option className="month-item" key={`${index}`}>
                          {months[index]}
                        </Select.Option>
                      );
                    }

                    const month = value.month();

                    return (
                      <div className="flex justify-end p-2">
                        <Row gutter={16}>
                          <Col>
                            <Select
                              size="small"
                              dropdownMatchSelectWidth={false}
                              value={String(month)}
                              onChange={(selectedMonth) => {
                                const newValue = value.clone();
                                newValue.month(parseInt(selectedMonth, 10));
                                onChange(newValue);
                              }}
                            >
                              {monthOptions}
                            </Select>
                          </Col>
                        </Row>
                      </div>
                    );
                  }}
                />
              </div>
              <div>
                <Select
                  defaultValue="Vip өрөө"
                  style={{ width: 200 }}
                  onChange={onChange}
                >
                  <Option value="1">VIP ширээ 1</Option>
                  <Option value="2">VIP ширээ 2</Option>
                  <Option value="3">VIP ширээ 3</Option>
                </Select>
                <Select
                  onChange={onChange}
                  defaultValue="Энгийн өрөө"
                  style={{ width: 200 }}
                >
                  <Option value="4">Ширээ 1</Option>
                  <Option value="5">Ширээ 2</Option>
                  <Option value="6">Ширээ 3</Option>
                </Select>
                <div className="mt-7 flex space-x-4 items-center">
                  <TimeCheckbox
                    action={{
                      onChange: onChanged,
                      table: key,
                    }}
                  />
                </div>
              </div>
            </div>
          </TabPane>
        </Tabs>
      </Card>
    </Main>
  );
}
