import { Card, Tabs, Modal, Calendar, Badge } from "antd";
import Main from "components/layout/Main";
import TimeTable from "./timetable";
import Calendars from "./calendar";
import Test from "./test";

export default function SettingsPage() {
  const { TabPane } = Tabs;
  function callback(key) {
    console.log(key);
  }
  const func = () => console.log("hh");
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
        </Tabs>
      </Card>
    </Main>
  );
}
