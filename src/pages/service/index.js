/* eslint-disable @next/next/link-passhref */
import { EditOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Card, Col, Descriptions, Image, Input, Menu, message, Modal, Row, Table } from "antd";
import { MerchantAPI } from "apis";
import Main from "components/layout/Main";
import Loading from "components/Loading";
import useFetch from "hooks/useFetch";
import { useRouter } from "next/router";
import queryString from "query-string";
import MyTable from "components/MyTable";
import React from "react";
import Link from "next/link";
import EllipsisDropdown from "components/EllipsisDropdown";
import { MerchantBankForm, TransactionForm } from "components/merchant/form";
import { render } from "less";
import MyPageHeader from "components/PageHeader";

export default function ServiceListPage() {
  const router = useRouter();
  const serviceColumns = useServiceColumns();

  return (
    <Main>
      <MyPageHeader title="Бүх үйлчилгээ" />
      <Card>
        <ListTable loadData={MerchantAPI.services.all_services} columns={serviceColumns} />
      </Card>
    </Main>
  )
}


const ListTable = ({ loadData, columns }) => {

  const [filter, setFilter] = React.useState({
    query: ""
  })


  const [query, setQuery] = React.useState("");


  const onChangeInput = (e) => {
    const _q = e.currentTarget.value

    if (_q === "") {
      setFilter({
        ...filter,
        query: ""
      })
    }

    setQuery(_q);
  }

  return (
    <div>
      <div>
        <Input onChange={onChangeInput} suffix={<SearchOutlined onClick={() => setFilter({ query })} />} />
      </div>
      <MyTable loadData={loadData} columns={columns} filters={filter} />
    </div>
  )
}

const useServiceColumns = () => {

  const router = useRouter();

  return (
    [
      {
        title: "Зураг",
        dataIndex: "main_image",
        render(value) {
          return <Image src={value} alt="123" width={128} />
        }
      },
      {
        title: "Нэр",
        dataIndex: "service_type"
      },
      {
        title: "Захиалгын төрлүүд",
        dataIndex: "order_types"
      },
      {
        title: "Боломжууд",
        dataIndex: "availables"
      },

      {
        title: "Нэр",
        dataIndex: "service_type"
      },
      {
        render(row) {
          return (
            <EllipsisDropdown
              menu={
                <Menu>
                  <Menu.Item>
                    <Link href={`/merchant/${router.query.id}/services/update?service_id=${row.id}`} >
                      засварлах
                    </Link>
                  </Menu.Item>

                </Menu>
              }
            />
          )
        }
      }
    ]
  )
}
