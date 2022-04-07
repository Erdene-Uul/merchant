/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
/*!
=========================================================
* Muse Ant Design Dashboard - v1.0.0
=========================================================
* Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import React, { Component } from "react";
// import { Link } from "react-router-dom";
import {
  Layout,
  Menu,
  Button,
  Row,
  Col,
  Typography,
  Form,
  Input,
  Switch,
} from "antd";
import {
  DribbbleOutlined,
  TwitterOutlined,
  InstagramOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import styledComponents from "styled-components";
import Link from "next/link";
import { AuthAPI } from "apis";
import { useRouter } from "next/router";

function onChange(checked) {
  console.log(`switch to ${checked}`);
}

const signinbg = "/assets/images/img-signin.jpg";

const { Title } = Typography;
const { Header, Footer, Content } = Layout;

export default function SigningPage() {

  const [loadingButton, setLoadingButton] = React.useState(false);

  const router = useRouter();

  const onFinish = async (values) => {
    setLoadingButton(true);
    try {
      await AuthAPI.login(values)
      router.replace("/dashboard");
    } catch (err) {
      console.log(err);
    }
    setLoadingButton(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };



  return (
    <>
      <Layout className="layout-default ">
        <Content className="signin">

          <div className="logo">
            <img src="/logo.png" alt="logo" width={240} />
          </div>

          <Title className="mb-15" level={2}>Нэвтрэх</Title>

          <Form
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
            className="row-col"
          >
            <Form.Item
              className="username"
              label="Нэвртэх нэр"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Нэвтрэх нэрээ хийнэ үү !",
                },
              ]}
            >
              <Input placeholder="merchant_001" />
            </Form.Item>

            <Form.Item
              className="username"
              label="Нууц үг"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Нууц үгээ оруулна уу!",
                },
              ]}
            >
              <Input.Password placeholder="****" />
            </Form.Item>

            <Form.Item
              name="remember"
              className="aligin-center"
              valuePropName="checked"
            >
              <Switch defaultChecked onChange={onChange} />
              Намайг сануул
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
                size="large"
                loading={loadingButton}
              >
                НЭВТЭХ
              </Button>
            </Form.Item>
            <p className="font-semibold text-muted">
              <Link href="/auth/password_forget" className="text-dark font-bold">
                Нууц үгээ мартсан уу?
              </Link>
            </p>
          </Form>
        </Content>
      </Layout>
    </>
  );
}