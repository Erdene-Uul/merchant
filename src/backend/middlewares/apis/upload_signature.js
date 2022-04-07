import { API_NOT_FOUND } from "../error";

/* eslint-disable import/no-anonymous-default-export */
const cloudinary = require("cloudinary").v2;

export default (_req, res) => {

  return async () => {

    if (_req.method === "POST") {

      // TODO: CHECK TO MAKE SURE AUTHENTICATED

      // Get the timestamp in seconds
      const timestamp = Math.round(new Date().getTime() / 1000);

      // Get the signature using the Node.js SDK method api_sign_request
      const signature = cloudinary.utils.api_sign_request(
        {
          timestamp: timestamp,
        },
        process.env.CLOUDINARY_SECRET
      );
      return ({ signature, timestamp });
    }
    throw API_NOT_FOUND;
  }
};