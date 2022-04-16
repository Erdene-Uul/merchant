// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import api_middleware from "backend/middlewares/apis";
import withError from "backend/middlewares/error";
import withSession from "backend/middlewares/session";
const httpProxyMiddleware = require("next-http-proxy-middleware");

const BACKEND = process.env.BACKEND || "http://localhost:5000";

async function handler(req, res) {
  api_middleware(req, res);

  const { slug } = req.query;

  delete req.query.slug;

  if (!slug) {
    res.status(404).json({
      message: "API_NOTFOUND",
    });
    return;
  }

  console.log("slug ", slug);

  if (slug[0] && slug[0].toLowerCase() === version) {
    httpProxyMiddleware.default(req, res, {
      target: BACKEND,
      // cookieDomainRewrite: "https://admin.funplus.mn",
      pathRewrite: "",
      headers: {
        "cilent-token": "123",
        Authorization: `Bearer ${req.session.token}`,
      },
    });
  } else if (req.apis[slug[0]] && typeof req.apis[slug[0]] === "function") {
    if (req.method !== "GET") {
      res.json(await req.apis[slug[0]](req.body));
    } else {
      res.json(await req.apis[slug[0]](req.query));
    }
  } else {
    res.status(404).json({
      message: "API_NOTFOUND",
    });
    return;
  }
}

export default withError(withSession(handler));

const version = "v1";

const mySlugs = ["login"];
