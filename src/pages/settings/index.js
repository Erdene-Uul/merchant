import { Card, Tabs, Modal, Calendar, Badge } from "antd";
import Main from "components/layout/Main";
import TimeTable from "./timetable";
import Test from "./test";

export default function SettingsPage() {
  const { TabPane } = Tabs;
  function callback(key) {
    console.log(key);
  }
  return (
    <Main>
      <Card>
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="Ажиллах цагийн тохиргоо" key="1">
            <TimeTable />
          </TabPane>
          <TabPane tab="Цагийн тохиргоо" key="2">
            <Calendar />
          </TabPane>
        </Tabs>
      </Card>
    </Main>
  );
}
