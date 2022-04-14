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
  const [key, setKey] = React.useState(0);
  const [checked, setChecked] = React.useState(false);
  const [checked1, setChecked1] = React.useState(false);
  const [checked2, setChecked2] = React.useState(false);
  const { TabPane } = Tabs;

  function callback(key) {
    console.log(key);
  }
  const onChecked = () => {
    setChecked(!checked);
  };
  const onChecked1 = () => {
    setChecked1(!checked1);
  };
  const onChecked2 = () => {
    setChecked2(!checked2);
  };
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
                defaultValue="Энгийн өрөө"
                style={{ width: 200 }}
                onChange={onChange}
              >
                <Option value="1">Ширээ 1</Option>
                <Option value="2">Ширээ 2</Option>
                <Option value="3">Ширээ 3</Option>
              </Select>
            </div>
            <div className="mt-7 flex space-x-4 items-center">
              <TimeCheckbox
                action={{
                  onChange: onChecked,
                  checked: checked,
                  onChange1: onChecked1,
                  checked1: checked1,
                  onChange2: onChecked2,
                  checked2: checked2,
                }}
              />
            </div>
          </TabPane>
        </Tabs>
      </Card>
    </Main>
  );
}
