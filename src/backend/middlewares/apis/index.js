import backend_configs from "backend/config";

import loginAPIS from "./login";
import logoutAPIS from "./logout";
import meAPIS from "./me";
import uploadAPI from "./upload";
import upload_signature from "./upload_signature";

function api_middleware(req, res) {

  req.api_urls = backend_configs.api_urls;

  req.apis = {
    login: loginAPIS(req, res),
    me: meAPIS(req, res),
    logout: logoutAPIS(req, res),
    upload: uploadAPI(req, res),
    upload_signature: upload_signature(req, res)
  }
}
export default api_middleware