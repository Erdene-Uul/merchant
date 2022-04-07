import React from "react";
import { FieldArray, Formik } from "formik";
import { Form, Input, Select } from "formik-antd";
import * as Yup from "yup";
import { Button, Card, Col, Divider, message, Row } from "antd";
import FormikGoogleMap from "components/FormikGoogleMap";
import MyPageHeader from "components/PageHeader";
import { DeleteOutlined, PlusOutlined, SaveOutlined } from "@ant-design/icons";
import { MerchantAPI, ServiceTypeAPI } from "apis";
import UploadImage from "components/upload";
import useFetch from "hooks/useFetch";
import { useRouter } from "next/router";

const createSchema = Yup.object().shape({
  name: Yup.string().required("Заавал бөглөнө үү"),
  service_type: Yup.string().required("Заавал бөглөнө үү"),
  // order_types: Yup.string().required("Заавал бөглөнө үү"),
  // availables: Yup.string().required("Заавал бөглөнө үү"),
  descriptions: Yup.string().required("Заавал бөглөнө үү"),

  order_types: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().default(" ").required("Заавал бөглөнө үү"),
      price: Yup.number().default(0).min(0, "0 ээс их өгөгдөл оруулна уу").required("Заавал бөглөнө үү"),
      items: Yup.array().of(Yup.string()).required("Заавал бөглөнө үү")
    })
  ).required("Заавал бөглөнө үү"),

  availables: Yup.array().of(
    Yup.object().shape({
      icon: Yup.string().default(" ").required("Заавал бөглөнө үү"),
      name: Yup.string().default(" ").required("Заавал бөглөнө үү"),
      descriptions: Yup.string().default(" ")
    })
  ).required("Заавал бөглөнө үү"),

  images: Yup.array().min(1, "Заавал 1 зураг оруулна уу").required("Заавал бөглөнө үү"),
  main_image: Yup.string().required("Заавал бөглөнө үү")
});

const formDataModel = {
  name: "",
  service_type: "",
  descriptions: "",
  order_types: [
    {
      name: "",
      price: 0,
      items: [],
    }
  ],
  availables: [
    {
      icon: "",
      name: "",
      descriptions: "",
    }
  ],
  images: [],
  main_image: ""
};

export default function ServiceForm({ action }) {
  const [formData, setFormData] = React.useState(formDataModel);

  const router = useRouter();

  const {
    result: service_types,
    loading: loading_service_types
  } = useFetch(ServiceTypeAPI.query, null)([])

  const onSubmit = async (values, formik) => {
    try {

      if (action[0] === "create") {
        await MerchantAPI.services.create(router.query.id)({
          ...values
        })
      } else {
        await MerchantAPI.services.update((router.query.id))({
          ...values
        })
      }

    } catch (err) {
      message.error(err.message);
      console.log(err);
      return;
    }

    message.success("Таны үйлдлийг амжилттай хийгдлээ");
    router.back();
  }

  React.useEffect(() => {
    if (action) {
      if (action[0] === "update") {
        setFormData({
          ...formDataModel,
          ...action[1],
        });
        return;
      }
    }

    setFormData({ ...formDataModel });
  }, [action]);


  return (
    <Formik
      initialValues={formData}
      validationSchema={
        createSchema
      }
      enableReinitialize
      onSubmit={onSubmit}
    >
      {({ isSubmitting, handleSubmit, values }) => (
        <Form layout="vertical">
          <Row gutter={[16, 16]} style={{ marginTop: 16, marginBottom: 16 }}>
            <Col xs={24}>
              <MyPageHeader
                title="Үйлчилгээ"
                isBack
                extra={
                  <Button
                    loading={isSubmitting}
                    type="primary"
                    htmlType={handleSubmit}
                    onSubmit={handleSubmit}
                    size="large"
                    icon={<SaveOutlined />}
                  >
                    Хадгалах{" "}
                  </Button>
                }
              />
            </Col>
            <Col xs={24} lg={12}>
              <Card title="Ерөнхий мэдээлэл">
                <Form.Item name="name" label="Үйлчилгээний нэр">
                  <Input name="name" />
                </Form.Item>
                <Form.Item name="service_type" label="Үйлчилгээний төрлүүд">
                  <Select name="service_type" loading={loading_service_types}>
                    {
                      service_types.map(item => (
                        <Select.Option key={item.id} value={item.id}>
                          {
                            item.name
                          }
                        </Select.Option>
                      ))
                    }
                  </Select>
                </Form.Item>
                <Form.Item name="descriptions" label="Тайлбар">
                  <Input.TextArea type="text" name="descriptions" />
                </Form.Item>


              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card>
                <Form.Item name="images" label="Зурагнууд">
                  <UploadImage name="images" mode="multiple" />
                </Form.Item>

                <Form.Item name="main_image" label="Үндсэн зураг">
                  <UploadImage name="main_image" mode="single" />
                </Form.Item>

              </Card>
            </Col>
            <Col xs={24} lg={12}>

              <Card title="Захиалах төрөлүүд">

                <Form.Item name="order_types">
                  <FieldArray
                    name="order_types"
                    render={(orderArrayHelpers) => {

                      return (
                        <div>
                          <Button type="primary" block icon={<PlusOutlined />} onClick={() => orderArrayHelpers.push({
                            name: "",
                            price: 0,
                            items: []
                          })}>

                          </Button>
                          {
                            values.order_types.map((item, index) => (
                              <div key={index}>
                                <Divider >
                                  {
                                    index + 1
                                  }
                                  -р төрөл
                                </Divider>
                                <Form.Item name={`order_types.${index}.name`} label="Нэр">
                                  <Input defaultValue={" "} name={`order_types.${index}.name`} />
                                </Form.Item>
                                <Form.Item name={`order_types.${index}.price`} label="Үнэ">
                                  <Input defaultValue={0} type={"number"} name={`order_types.${index}.price`} />
                                </Form.Item>
                                <Form.Item name={`order_types.${index}.items`} label="Жагсаалт">
                                  <Select defaultValue={[]} mode="tags" name={`order_types.${index}.items`} />
                                </Form.Item>
                                {index > 0 && <Button icon={<DeleteOutlined />} onClick={() => orderArrayHelpers.remove(index)} type="danger" block>
                                  Устгах
                                </Button>}
                                <Divider />
                              </div>
                            ))
                          }
                        </div>
                      )
                    }}
                  />
                </Form.Item>

              </Card>
            </Col>

            <Col xs={24} lg={12}>

              <Card title="Боломжууд">
                <Form.Item name="order_types">
                  <FieldArray
                    name="availables"
                    render={(orderArrayHelpers) => {

                      return (
                        <div>
                          <Button type="primary" block icon={<PlusOutlined />} onClick={() => orderArrayHelpers.push({
                            name: "",
                            icon: "",
                            descriptions: ""
                          })}>

                          </Button>
                          {
                            values.availables.map((item, index) => (
                              <div key={index}>
                                <Divider >
                                  {
                                    index + 1
                                  }
                                  -р боломж
                                </Divider>
                                <Form.Item name={`availables.${index}.name`} label="Нэр">
                                  <Input defaultValue={" "} name={`availables.${index}.name`} />
                                </Form.Item>
                                <Form.Item name={`availables.${index}.icon`} label="Зураг">
                                  <UploadImage name={`availables.${index}.icon`} />
                                </Form.Item>
                                <Form.Item name={`availables.${index}.descriptions`} label="Тайлбар">
                                  <Input.TextArea name={`availables.${index}.descriptions`} />
                                </Form.Item>
                                {index > 0 && <Button icon={<DeleteOutlined />} onClick={() => orderArrayHelpers.remove(index)} type="danger" block>
                                  Устгах
                                </Button>}
                                <Divider />
                              </div>
                            ))
                          }
                        </div>
                      )
                    }}
                  />

                </Form.Item>

              </Card>
            </Col>

          </Row>
        </Form>
      )}
    </Formik>
  );
}
