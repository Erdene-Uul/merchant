import React from "react";
import { Formik, yupToFormErrors } from "formik";
import { Form, Input, InputNumber, Select } from "formik-antd";
import * as Yup from "yup";
import { Button, Card, Col, message, Row, } from "antd";
import FormikGoogleMap from "components/FormikGoogleMap";
import MyPageHeader from "components/PageHeader";
import { SaveOutlined } from "@ant-design/icons";
import { MerchantAPI } from "apis";
import useFetch from "hooks/useFetch";

/**
const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  register_num: Joi.string().allow("", null),
  merchant_type: Joi.string().required(),

  address: Joi.object({
    text: Joi.string().required(),
    map: Joi.object({
      lat: Joi.number().required(),
      lng: Joi.number().required(),
    }).required(),
  }),
  worker: Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().required(),
  }),
  username: Joi.string().required(),
  password: Joi.string().min(8).required()
});
 */

const createSchema = Yup.object().shape({
  name: Yup.string().required("Та заавал бөглөнө үү !"),
  email: Yup.string().required("Та заавал бөглөнө үү !"),
  phone: Yup.string().required("Та заавал бөглөнө үү !"),
  register_num: Yup.string("Та заавал бөглөнө үү !"),
  merchant_type: Yup.string().required("Та заавал бөглөнө үү !"),

  address_text: Yup.string().required("Та заавал бөглөнө үү !"),
  address_map: Yup.object({
    lat: Yup.number().required("Та заавал бөглөнө үү !"),
    lng: Yup.number().required("Та заавал бөглөнө үү !"),
  }).required("Та заавал бөглөнө үү !"),

  worker_name: Yup.string().required("Та заавал бөглөнө үү !"),
  worker_phone: Yup.string().required("Та заавал бөглөнө үү !"),
  worker_email: Yup.string().required("Та заавал бөглөнө үү !"),


  username: Yup.string().required("Та заавал бөглөнө үү !"),
  password: Yup.string().min(8).required("Та заавал бөглөнө үү !"),

})

const updateSchema = Yup.object().shape({
  name: Yup.string().required("Та заавал бөглөнө үү !"),
  email: Yup.string().required("Та заавал бөглөнө үү !"),
  phone: Yup.string().required("Та заавал бөглөнө үү !"),
  register_num: Yup.string("Та заавал бөглөнө үү !"),
  merchant_type: Yup.string().required("Та заавал бөглөнө үү !"),

  address_text: Yup.string().required("Та заавал бөглөнө үү !"),
  address_map: Yup.object({
    lat: Yup.number().required("Та заавал бөглөнө үү !"),
    lng: Yup.number().required("Та заавал бөглөнө үү !"),
  }).required("Та заавал бөглөнө үү !"),

  worker_name: Yup.string().required("Та заавал бөглөнө үү !"),
  worker_phone: Yup.string().required("Та заавал бөглөнө үү !"),
  worker_email: Yup.string().required("Та заавал бөглөнө үү !"),
});

const formDataModel = {
  name: "",
  email: "",
  phone: "",
  register_num: "",
  merchant_type: "",

  address_text: "",
  address_map: {
    lat: 47.91326661081612,
    lng: 106.91704922978452
  },

  worker_name: "",
  worker_phone: "",
  worker_email: "",

  username: "",
  password: ""
}

export default function MerchantForm({ action }) {

  const [formData, setFormData] = React.useState(formDataModel)

  React.useEffect(() => {

    if (action) {
      if (action[0] === "update") {
        setFormData(
          {
            ...formDataModel,
            ...action[1],

            address_text: action[1]?.address?.text || "",
            address_map: action[1]?.address?.map || {},

            worker_name: action[1]?.worker?.name || "",
            worker_phone: action[1]?.worker?.phone || "",
            worker_email: action[1]?.worker?.email || "",

          }
        )
        return;
      }
    }

    setFormData({ ...formDataModel })

  }, [action])

  const onSubmit = async (values, formik) => {
    try {
      alert("onSubmit")
      const sendData = {
        ...values,
        worker: {
          name: values.worker_name || "",
          phone: values.worker_phone || "",
          email: values.worker_email || "",
        },
        address: {
          map: values?.address_map || {},
          text: values?.address_text || {},
        }
      }


      if (action) {

        if (action[0] === "create") {
          await MerchantAPI.create(sendData)
        } else {
          await MerchantAPI.update(sendData)
        }

      }

    } catch (err) {
      console.log(err);
    }
  }


  return (
    <Formik
      initialValues={formData}
      validationSchema={action && action[0] === "create" ? createSchema : updateSchema}
      enableReinitialize
      onSubmit={onSubmit}
    >
      {
        ({ isSubmitting, handleSubmit }) => (
          <Form layout="vertical">
            <Row gutter={[16, 16]} style={{ marginTop: 16, marginBottom: 16 }}>
              <Col xs={24}>
                <MyPageHeader title="Мерчант үүсгэх" isBack extra={<Button loading={isSubmitting} type="primary" htmlType={handleSubmit} onSubmit={handleSubmit} size="large" icon={<SaveOutlined />}>Хадгалах </Button>} />
              </Col>
              <Col xs={24} lg={12}>
                <Card title="Ерөнхий мэдээлэл">
                  <Form.Item name="name" label="Нэр">
                    <Input name="name" />
                  </Form.Item>
                  <Form.Item name="email" label="И-мэйл">
                    <Input name="email" />
                  </Form.Item>
                  <Form.Item name="phone" label="Утас">
                    <Input name="phone" />
                  </Form.Item>
                  <Form.Item name="name" label="РД - дугаар">
                    <Input name="name" placeholder="123456" />
                  </Form.Item>

                  <Form.Item name="name" label="Төрөл">
                    <Select name="merchant_type">
                      <Select.Option value="CITIZEN">
                        Хувь хүн
                      </Select.Option>
                      <Select.Option value="ORGINIZATION">
                        Байгууллага
                      </Select.Option>
                    </Select>

                  </Form.Item>
                </Card>
              </Col>

              <Col xs={24} lg={12}>
                <Card title="Хаягын мэдээлэл">

                  <Form.Item name="address_map">
                    <FormikGoogleMap name="address_map" />
                  </Form.Item>
                  <Form.Item name="address_text" label="Хаяг">
                    <Input.TextArea name="address_text">
                    </Input.TextArea>
                  </Form.Item>
                </Card>
              </Col>
              <Col xs={24} lg={12}>

                <Card title="Хариуцсан ажилтаны мэдээлэл">
                  <Form.Item name="worker_name" label="Ажилтаны нэр">
                    <Input name="worker_name" />
                  </Form.Item>
                  <Form.Item name="worker_phone" label="Утас">
                    <Input name="worker_phone" />
                  </Form.Item>
                  <Form.Item name="worker_email" label="Е-мэйл">
                    <Input name="worker_email" />
                  </Form.Item>
                </Card>
              </Col>


              {
                action[0] === "create" && (
                  <Col xs={24} lg={12}>
                    <Card title="Нэвтрэх мэдээлэл">
                      <Form.Item name="username" label="Нэвтрэх нэр">
                        <Input name="username" />
                      </Form.Item>
                      <Form.Item name="password" label="Нууц үг">
                        <Input.Password name="password" />
                      </Form.Item>

                    </Card>
                  </Col>
                )
              }

            </Row>
          </Form>
        )
      }
    </Formik>
  )
}


const merchant_schema = Yup.object({
  bank_name: Yup.string().required("Заавал бөглөнө үү"),
  account_number: Yup.string().required("Заавал бөглөнө үү"),
  descriptions: Yup.string().required("Заавал бөглөнө үү"),
})



export function MerchantBankForm({ action, merchant_id, onSubmit: _onSubmit }) {

  const modelData = {
    bank_name: "",
    account_number: "",
    descriptions: "",

  }

  const [formData, setFormData] = React.useState({
    ...modelData,
    ...(action && action[0] === "update" ? {
      ...action[1]
    } : {})
  })

  const onSubmit = async (values, formik) => {

    try {

      if (action)

        if (action[0] === "create") {
          MerchantAPI.bank.create(merchant_id)(values)
        } else {
          MerchantAPI.bank.update(merchant_id)(values)
        }

    } catch (err) {
      message.error("Таны үйлдлийг хийхэд алдаа гарлаа")
      return;
    }

    if (_onSubmit) {
      _onSubmit()
    }

  }

  React.useEffect(() => {
    if (action) {
      if (action[0] === "update") {
        setFormData({
          ...modelData,
          ...action[1]
        })
        return;
      }

    }
    setFormData({
      ...modelData
    })
  }, [action])

  return (
    <Formik
      validationSchema={merchant_schema}
      onSubmit={onSubmit}
      initialValues={formData}
      enableReinitialize
    >
      {
        ({ isSubmitting }) => {


          return (
            <Form layout="vertical">
              <Form.Item name="bank_name" label="Банкны нэр">
                <Input name="bank_name" />
              </Form.Item>
              <Form.Item name="account_number" label="Дансны дугаар">
                <Input name="account_number" />
              </Form.Item>
              <Form.Item name="descriptions" label="Хүлээн авагчийн мэдээлэл">
                <Input name="descriptions" />
              </Form.Item>
              <Button block loading={isSubmitting} type="primary" htmlType="submit" icon={<SaveOutlined />}>
                Хадгалах
              </Button>
            </Form>
          )
        }
      }
    </Formik >
  )
}



const transactuin_schema = Yup.object({
  bank: Yup.string().required("Заавал бөглөнө үү"),
  amount: Yup.number().min(0, "0 ээс их утга оруулна уу").required("Заавал бөглөнө үү"),
  descriptions: Yup.string(),
  image: Yup.string()
})



export function TransactionForm({ action, merchant_id, onSubmit: _onSubmit }) {

  const modelData = {
    bank: "",
    amount: 0,
    descriptions: "",
    image: ""
  }

  const [bankQuery] = React.useState({
    merchant_id,
  })

  const {
    result: banksLists,
    loading: loadingBankList
  } = useFetch(MerchantAPI.bank.query(merchant_id), null)([])

  const [formData, setFormData] = React.useState({
    ...modelData,
    ...(action && action[0] === "update" ? {
      ...action[1]
    } : {})
  })

  const onSubmit = async (values, formik) => {

    try {

      if (action)

        if (action[0] === "create") {
          MerchantAPI.transaction.create(merchant_id)(values)
        } else {
          MerchantAPI.transaction.update(merchant_id)(values)
        }

    } catch (err) {
      message.error("Таны үйлдлийг хийхэд алдаа гарлаа")
      return;
    }

    if (_onSubmit) {
      _onSubmit()
    }

  }

  React.useEffect(() => {
    if (action) {
      if (action[0] === "update") {
        setFormData({
          ...modelData,
          ...action[1]
        })
        return;
      }

    }
    setFormData({
      ...modelData
    })
  }, [action])

  return (
    <Formik
      validationSchema={transactuin_schema}
      onSubmit={onSubmit}
      initialValues={formData}
      enableReinitialize
    >
      {
        ({ isSubmitting }) => {


          return (
            <Form layout="vertical">
              <Form.Item name="bank" label="Банк">
                <Select name="bank" loading={loadingBankList}>
                  {
                    (banksLists || []).map(item => (
                      <Select.Option key={item.id}>
                        {
                          `${item.bank_name} ${item.account_number} (${item.descriptions})`
                        }
                      </Select.Option>
                    ))
                  }

                </Select>

              </Form.Item>
              <Form.Item name="amount" label="Мөнгөн дүн">
                <InputNumber name="amount" />
              </Form.Item>
              <Form.Item name="descriptions" label="Хүлээн авагчийн мэдээлэл">
                <Input name="descriptions" />
              </Form.Item>
              <Button block loading={isSubmitting} type="primary" htmlType="submit" icon={<SaveOutlined />}>
                Хадгалах
              </Button>
            </Form>
          )
        }
      }
    </Formik >
  )
}