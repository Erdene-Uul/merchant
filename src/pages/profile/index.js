import React from "react";
import Main from "components/layout/Main";
import { Card, Tabs, Input, Button } from "antd";
const { TabPane } = Tabs;
export default function Profile() {
  return (
    <Main>
      <div className="flex space-x-40">
        {/* <div>
          <h1>Test Merchant Profile</h1>
          <div className="border-4 max-w-xs flex flex-col justify-center items-center mt-10 py-7">
            <i className="fa-solid fa-user-large  text-5xl mb-3"></i>
            <h1>Admin</h1>
            <h1>test@gmail.com</h1>
          </div>
        </div> */}
        <div className="h-screen">
          <Card>
            <div className="rounded-lg flex flex-col justify-center items-center max-w-screen-lg mx-auto py-12 ">
              <div className="flex justify-between mb-7 pl-28 pr-20 space-x-3">
                <h1 className=" font-bold text-xl">Мерчант мэдээлэл</h1>
                <i className="fa-solid fa-pen-to-square cursor-pointer text-2xl hover:text-pink-500"></i>
              </div>
              <i className="fa-solid fa-user-large text-5xl mb-3"></i>
              <div className="flex items-center justify-evenly">
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-1">
                    <p className="text-[#a2a2a2]">Нэр</p>
                    <p className="font-bold">Erdene-Uul</p>
                  </div>
                  <div>
                    <p className="text-[#a2a2a2]">Phone</p>
                    <p className="font-bold">1223</p>
                  </div>
                  <div>
                    <p className="text-[#a2a2a2]">Mail</p>
                    <p className="font-bold">example@gmail.com</p>
                  </div>
                  <div>
                    <p className="text-[#a2a2a2]">Address</p>
                    <p className="font-bold">Mongolia</p>
                  </div>
                  <div>
                    <p className="text-[#a2a2a2]">Address</p>
                    <p className="font-bold">Mongolia</p>
                  </div>
                  <div>
                    <p className="text-[#a2a2a2]">Address</p>
                    <p className="font-bold">Mongolia</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
        <div>
          <Card>
            <Tabs defaultActiveKey="1">
              <TabPane tab="Fun Plus-д мэдэгдэл" key="1">
                <Input.TextArea />
              </TabPane>
              <TabPane tab="Хэрэглэгчдэд мэдэгдэх" key="2">
                <Input.TextArea />
              </TabPane>
              <TabPane tab="Лояалти хэрэглэгчдэд мэдэгдэх" key="3">
                <Input.TextArea />
              </TabPane>
            </Tabs>
            <div className="flex justify-end space-x-5 mt-5">
              <Button type="primary">Хадгалах</Button>
              <Button>Болих</Button>
            </div>
          </Card>
        </div>
      </div>
    </Main>
  );
}
