// /* eslint-disable react/prop-types */
// import { Field, Formik } from "formik";
// import React from "react";
// import { Button, message, Upload } from "antd";
// import { DeleteOutlined, InboxOutlined } from "@ant-design/icons";
// const { Dragger } = Upload;

// export const Uploader = ({ value, setFieldValue, setFieldTouched, setFieldError, isPublic, accept, setValues, name, values, mode = "single" }) => {

//   let _name = `_______${name}__view__pdf`;
//   const props = {
//     name: "upload",
//     multiple: true,
//     action: `/api/uploads/${isPublic ? "private" : "public"}`,
//     onChange(info) {
//       const { status } = info.file;
//       if (status !== "uploading") {
//         console.log(info.file, info.fileList);
//       }
//       if (status === "done") {
//         message.success(`${info.file.name} file uploaded successfully.`);
//         setFieldValue(info.file.response.url);
//         console.log(info);
//       } else if (status === "error") {
//         // message.error(`${info.file.name} file upload failed.`);
//         setFieldError("файл сервер лүү оруулахад алдаа гарлаа");
//       }
//     },

//     onDrop(e) {
//       // console.log("Dropped files", e.dataTransfer.files);
//     },
//   };

//   React.useEffect(() => {
//     setValues({
//       ...values,
//       [_name]: false
//     });
//   }, []);

//   return (
//     value && value.length > 0 ? (
//       <div>
//         {
//           value
//         }

//         <Button
//           icon={<DeleteOutlined />}
//           type="danger"
//           onClick={() => {
//             setFieldValue("");

//           }}
//         />
//       </div>
//     ) : (
//       <Dragger
//         {...props}
//         multiple={mode === "multiple"}
//         onRemove={() => { }}
//         beforeUpload={e => {

//         }}
//         accept={accept}
//         style={{
//           width: 320
//         }}
//       >
//         <p className="ant-upload-drag-icon">
//           <InboxOutlined />
//         </p>
//         <p className="ant-upload-text">
//           Файлыг байршуулахын тулд энэ хэсэгт дарна уу эсвэл энэ хэсэг рүү чирнэ үү
//         </p>
//         {/* <p className="ant-upload-hint">
//       Support for a single or bulk upload. Strictly prohibit from uploading company data or other
//       band files
//       </p> */}
//       </Dragger>
//     )
//   );
// };

// const PDFUploader = ({ name, fileType = "image", accept = "", isPublic, mode = "single" }) => (
//   <Field name={name}>{
//     fieldProps => {

//       const {
//         field: { value },
//         form: { setFieldValue, setFieldTouched, setFieldError, values, setValues }
//       } = fieldProps;

//       return (
//         <Uploader
//           value={value}
//           fileType={fileType}
//           setFieldValue={(value) => setFieldValue(name, value)}
//           setFieldTouched={(bool) => setFieldTouched(name, bool)}
//           setFieldError={(name) => setFieldError(name)}
//           values={values}
//           setValues={setValues}
//           name={name}
//           accept={accept}
//           isPublic={isPublic}
//           mode={mode}
//         />
//       );
//     }
//   }</Field>
// );

// export default PDFUploader;

import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Image, Spin } from 'antd';
import { UploadAPI } from 'apis';
import { Field } from 'formik';
import React, { useState } from 'react'
const App = ({ name, mode = "single" }) => {
  const [image, setImage] = useState();
  const [url, setUrl] = useState("");

  const [loading, setLoading] = React.useState(false);

  const uploadImage = (setFieldValue, setFieldTouched, setFieldError, values, setValues, value) => async () => {
    setLoading(true);
    const { signature, timestamp } = await UploadAPI.signature()

    const data = new FormData()
    data.append("file", image);
    data.append("api_key", "618188745148635")
    data.append("timestamp", timestamp)
    data.append("signature", signature)
    data.append("cloud_name", "funplus-mn")
    fetch("https://api.cloudinary.com/v1_1/funplus-mn/image/upload", {
      method: "post",
      body: data
    })
      .then(resp => resp.json())
      .then(data => {

        if (mode === "multiple") {
          setFieldValue(name, [...(value[name] || []), data.url])
        } else {
          setFieldValue(name, data.url);
        }
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
      })
  }
  return (
    <Field name={name}>
      {
        (props) => {

          const {
            field: { value },
            form: { setFieldValue, setFieldTouched, setFieldError, values, setValues }
          } = props;

          return (
            <Spin spinning={loading}>
              <div>
                {
                  ((mode === "multiple" && value.length === 0) || value.length === 0) && (
                    <>
                      <input type="file" onChange={(e) => setImage(e.target.files[0])}></input>
                      <Button icon={<PlusOutlined />} onClick={uploadImage(setFieldValue, setFieldTouched, setFieldError, values, setValues, value)}>Upload</Button>
                    </>
                  )
                }
              </div>
              <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                {
                  mode === "multiple" ? (
                    (value || []).map((item, index) => (
                      <>
                        {item.length > 0 &&
                          <div style={{ padding: 10, border: "1px solid #d9d9d9", borderRadius: "12px" }}>
                            <div>
                              {<Image src={item} height={128} />}
                            </div>
                            <div style={{ marginTop: 5 }}>
                              <Button type="danger" icon={<DeleteOutlined />} onClick={() => {
                                const _value = [...value];
                                _value[index] = null;
                                setFieldValue(name, _value.filter(e => e !== null))
                              }} block>

                              </Button>
                            </div>
                          </div>}
                      </>
                    ))
                  ) : (
                    <>
                      {value.length > 0 &&
                        <div style={{ padding: 10, border: "1px solid #d9d9d9", borderRadius: "12px" }}>
                          <div>
                            {<Image src={value} height={128} />}
                          </div>
                          <div style={{ marginTop: 5 }}>
                            <Button type="danger" icon={<DeleteOutlined />} onClick={() => setFieldValue(name, "")} block>

                            </Button>
                          </div>
                        </div>}
                    </>
                  )
                }
              </div>
            </Spin>
          )
        }
      }
    </Field>
  )
}
export default App;