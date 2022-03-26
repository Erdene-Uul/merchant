import backend_configs from "backend/config";

import loginAPIS from "./login";
import logoutAPIS from "./logout";
import meAPIS from "./me";
function api_middleware(req, res) {

  req.api_urls = backend_configs.api_urls;

  req.apis = {
    login: loginAPIS(req, res),
    me: meAPIS(req, res),
    logout: logoutAPIS(req, res)
  }
}
export default api_middleware