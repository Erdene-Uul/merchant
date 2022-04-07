import { Button, Card, Input } from "antd"
import React from "react"
import { SystemUserAPI } from "apis";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons"
import { useRouter } from "next/router"
import Link from "next/link"
import { Result } from 'antd';

export default function NotfoundPage(){

    return (
        <div>
           
            <Result
                status="500"
                title="500"
                subTitle="Уучлаарай таны хуудас алга байна"
                extra={<Button type="primary" href="/" >Нүүр хуудас руу буцах</Button>}
            />
                
           
        </div>
    )
}