async function _withError(req, res, next) {

  try {
    await next(req, res);
  } catch (err) {
    console.log("error garsaan", err);
    // console.log(typeof err);
    // console.log(JoiValidationError);
    if (err.status) {
      res.status(err.status).json(err);
    } else {

      try {
        console.log(3);
        const sendJson = JSON.parse((err + "").split("Error: ")[1].trim());
        if (typeof sendJson !== "object") {
          throw err;
        }
        res.status(500).json(sendJson);
      } catch (error) {
        res.status(500);
        console.log(4, err);
        res.json({
          type: "error",
          message: err
        });
      }
    }
  }
}

/* eslint-disable no-undef */
export const ErrorModel = {
  status: "",
  type: "",
  error_type: "",
  message: "",
  service_name: ""
};

export class RouteError extends Error {
  status = "";

  type = "";

  error_type = "";

  message = "";

  constructor(config = {
    status: "",
    type: "",
    error_type: "",
    message: "",
    service_name: ""
  }) {
    super(
      JSON.stringify(config)
    );
    this.service_name = config.service_name;
    this.error_type = config.error_type;
    this.type = config.type;
    this.status = config.status;
    this.message = config.message;
  }

  toJSON() {
    return {
      status: this.status,
      type: this.type,
      error_type: this.error_type,
      message: this.message,
      service_name: this.service_name
    };
  }
};

export default function withError(next) {

  return (req, res) => _withError(req, res, next)
}

export const API_NOT_FOUND = new RouteError({
  status: 404,
  type: "error",
  error_type: "NOTFOUND",
  message: "API_NOTFOUND"
})