import { cloudinary } from "utils/cloudinary";
import { API_NOT_FOUND } from "../error";
import * as joi from "joi";
import formidable from "formidable";


const postDataSchema = joi.object({
  data: joi.string().required(),
  type: joi.string().required(),
  name: joi.string().required()
})

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}


export default function uploadAPI(req, res) {

  return async () => {
    console.log(`req.method === "POST"`, req.method === "POST")

    if (req.method === "POST") {

      console.log(`req.method === "POST2"`, req.method === "POST")

      const { data } = req.body

      const joiresult = await postDataSchema.validate(req.body);

      if (joiresult.error) {
        throw joiresult.error;
      }

      const uploadResponse = await cloudinary.uploader.upload(data);
      console.log(uploadResponse)
      return {
        url: uploadResponse.url
      };

    } else if (req.method === "DELETE") {
      const { url } = req.body;
      res.json({});
      return;
    } else {
      throw API_NOT_FOUND
    }

  }

}