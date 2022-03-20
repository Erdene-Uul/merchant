import { Card, Table } from "antd";
import Main from "components/layout/Main";
import TestComp from "components/test_compontent";


export default function TestPage() {
  const dataSource = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
  ];

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  return <Main>
    <Card>
      <Table
        columns={columns}
        dataSource={dataSource}
      />
      <TestComp />
    </Card>
  </Main>
}