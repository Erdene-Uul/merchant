import React from "react";
import Main from "components/layout/Main";
import { Card, Tabs, Input, Button, Modal, Form, Radio } from "antd";
const { TabPane } = Tabs;
export default function Profile() {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [value, setValue] = React.useState(1);

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const modal = () => {
    setModalVisible(true);
  };
  const cancel = () => {
    setModalVisible(false);
  };
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
                <i
                  onClick={showModal}
                  className="fa-solid fa-pen-to-square cursor-pointer text-2xl hover:text-pink-500"
                ></i>
              </div>
              <i className="fa-solid fa-user-large text-5xl mb-3"></i>
              <div className="flex items-center justify-evenly">
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-1">
                    <p className="text-[#a2a2a2]">Нэр</p>
                    <p className="font-bold">Тэст Мерчант</p>
                  </div>
                  <div>
                    <p className="text-[#a2a2a2]">Дугаар</p>
                    <p className="font-bold">77459561</p>
                  </div>
                  <div>
                    <p className="text-[#a2a2a2]">Мэйл хаяг</p>
                    <p className="font-bold">example@gmail.com</p>
                  </div>
                  <div>
                    <p className="text-[#a2a2a2]">Хаяг</p>
                    <p className="font-bold">Монгол</p>
                  </div>
                  <div>
                    <p className="text-[#a2a2a2]">Дансны дугаар</p>
                    <p className="font-bold">5045451275</p>
                  </div>
                  <div>
                    <p className="text-[#a2a2a2]">Регистер</p>
                    <p className="font-bold">АА45856545</p>
                  </div>
                </div>
              </div>
              <p
                onClick={modal}
                className="text-pink-500 text-lg ml-4 cursor-pointer "
              >
                Нууц үг солих
              </p>
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
        <Modal
          className="font-bold text-2xl"
          title="Мэдээлэл засварлах"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <div className="rounded-lg  max-w-screen-sm flex flex-col items-center mx-auto py-12 ">
            <Form className="ml-6 w-96">
              <Form.Item name={"name"}>
                <label className="block mb-1">
                  Нэр<span className="text-red-400">*</span>
                </label>
                <Input className="rounded-lg" />
              </Form.Item>
              <Form.Item name={"phone"}>
                <label className="block mb-1">Дугаар</label>
                <Input className="rounded-lg" />
              </Form.Item>
              <Form.Item name={"email"}>
                <label className="block mb-1">Мэйл</label>
                <Input className="rounded-lg" />
              </Form.Item>
              <Form.Item name={"address"}>
                <label className="block mb-1">Хаяг</label>
                <Input className="rounded-lg" />
              </Form.Item>
              <Form.Item name={"bankAccount"}>
                <label className="block mb-1">Дансны дугаар</label>
                <Input className="rounded-lg" />
              </Form.Item>
              <Form.Item name={"register"}>
                <label className="block mb-1">Регистер</label>
                <Input className="rounded-lg" />
              </Form.Item>
              <Button
                type="primary"
                className="ml-72 rounded-xl bg-gradient hover:bg-gradient-to-r from-[#e97a34] hover:to-[#9d32c2] hover:text-white"
              >
                Хадгалах
              </Button>
            </Form>
          </div>
        </Modal>
        <Modal
          className="font-bold text-2xl"
          title="Нууц үг солих"
          visible={modalVisible}
          onCancel={cancel}
          footer={null}
        >
          <div className="rounded-lg  max-w-screen-sm flex flex-col items-center mx-auto py-12 ">
            <Form className="ml-6 w-96">
              <Form.Item name={"email"}>
                <label className="block mb-1">E-Mail</label>
                <Input className="rounded-lg" />
              </Form.Item>
              <Form.Item name={"oldPassword"}>
                <label className="block mb-1">Хуучин нууц үг</label>
                <Input type={"password"} className="rounded-lg" />
              </Form.Item>
              <Form.Item name={"password"}>
                <label className="block mb-1">Шинэ нууц үг</label>
                <Input type={"password"} className="rounded-lg" />
              </Form.Item>
              <Form.Item name={"passwordRepeat"}>
                <label className="block mb-1">Шинэ нууц үг давтах</label>
                <Input type={"password"} className="rounded-lg" />
              </Form.Item>
              <Button
                type="primary"
                className="ml-72 rounded-xl bg-gradient hover:bg-gradient-to-r from-[#e97a34] hover:to-[#9d32c2] hover:text-white"
              >
                Хадгалах
              </Button>
            </Form>
          </div>
        </Modal>
      </div>
    </Main>
  );
}
