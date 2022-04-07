import { Button, Card, Input } from "antd"
import Main from "components/layout/Main"
import MyTable from "components/MyTable"
import MyPageHeader from "components/PageHeader"
import React from "react"
import { MerchantAPI, SystemUserAPI } from "apis";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons"
import { useRouter } from "next/router"
import Link from "next/link"

export default function Transaction() {


  const columns = [
    {
      render(row) {
        const bank = row.bank;
        return `${bank?.account_number} (${bank?.bank_name})`
      }
    },
    {
      title: "Мерчантын мэдээлэл",
      render(row) {
        const merchant = row.merchant;
        return (
          <Link href={`/merchant/${merchant.id || merchant._id}`}>
            {merchant.name}
          </Link>
        )
      }
    },
    {
      title: "Дүн",
      dataIndex: "amount"
    },
    {
      title: "Тайлбар",
      dataIndex: "descriptions"
    },
  ]

  const [filter, setFilter] = React.useState({
    query: ""
  });

  const [query, setQuery] = React.useState("");


  const onSearch = () => {
    setFilter({
      ...filter,
      query: query
    })
  }

  const onChangeInput = (e) => {
    let value = e.currentTarget.value;

    if (value === "") {
      setFilter({
        ...filter,
        query: value
      });

    };
    setQuery(value)
  }

  const router = useRouter();

  return (
    <Main>
      <MyPageHeader title="Захиалга" />
      <Card>
        <div>
          <Input style={{ width: 240 }}
            onChange={onChangeInput}
            placeholder="Хайх"
            suffix={<SearchOutlined onClick={onSearch} />} />
        </div>
        <MyTable columns={columns} loadData={MerchantAPI.transaction.all_transactions} filters={filter} />
      </Card>
    </Main>
  )
}

const useColumns = () => {

  return (
    [
      {
        title: "Нэр",
        dataIndex: "name",
        key: "name"
      },
      {
        render(row) {
          return (
            <Link href={`/merchant/update?id=${row.id}`} >
              засварлах
            </Link>
          )
        }
      }
    ]
  )
}