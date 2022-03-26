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
        console.log(4);
        res.json({
          type: "error",
          message: err
        });
      }
    }
  }
}

export default function withError(next) {

  return (req, res) => _withError(req, res, next)
}