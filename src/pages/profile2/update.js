import ProHeader from "components/ProHeader";
import Merchant from "components/Merchant";
import Footer from "components/Footer";
import React from "react";
import { Form, Input, Button, Radio } from "antd";
import Link from "next/link";

export default function Update() {
  const [value, setValue] = React.useState(1);

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  return (
    <>
      <ProHeader />
      <div className="bg-[#1a1a1a] h-screen mt-24 pt-16">
        <div className="rounded-lg  max-w-screen-sm flex flex-col items-center mx-auto bg-[#212121] py-12 ">
          <h1 className="font-bold text-xl ml-6 mb-3">Мэдээлэл засварлах</h1>
          <Form className="ml-6 w-96">
            <Form.Item name={"name"}>
              <label className="block mb-2">
                Name<span className="text-red-400">*</span>
              </label>
              <Input className="rounded-lg" />
            </Form.Item>
            <Form.Item name={"phone"}>
              <label className="block mb-2">Phone</label>
              <Input className="rounded-lg" />
            </Form.Item>
            <Form.Item name={"email"}>
              <label className="block mb-2">E-Mail</label>
              <Input className="rounded-lg" />
            </Form.Item>
            <Form.Item name={"address"}>
              <label className="block mb-2">Address</label>
              <Input className="rounded-lg" />
            </Form.Item>
            <Form.Item name={"gender"}>
              <label className="block mb-2">Gender</label>
              <Radio.Group onChange={onChange} value={value}>
                <Radio value={1}>Male</Radio>
                <Radio value={2}>Female</Radio>
              </Radio.Group>
            </Form.Item>
            <Link href={"/profile"}>
              <Button className="ml-72 rounded-xl bg-gradient hover:bg-gradient-to-r from-[#e97a34] hover:to-[#9d32c2] hover:text-white">
                Хадгалах
              </Button>
            </Link>
          </Form>
        </div>
      </div>
      <Merchant />
      <Footer />
    </>
  );
}
