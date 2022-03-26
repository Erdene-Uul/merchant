import { apiRequest } from "utils/request";

export default function loginAPIS(req, res) {

  return async (data) => {
    const json = await apiRequest.post(`${req.api_urls.auth}/login`, data);

    req.session.token = json.token;
    req.session.user = json.user;
    req.session.refresh_token = json.refresh_token;

    await req.session.save()

    console.log("json ", json)

    return json.user;
  }
}