// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import withSession from "backend/middlewares/session";
const httpProxyMiddleware = require("next-http-proxy-middleware");

const BACKEND = process.env.BACKEND || "http://localhost:5000";


async function handler(req, res) {

  const { slug } = req.query;

  if (!slug) {
    res.status(404).json({
      message: "API_NOTFOUND"
    });
    return;
  }

  if (slug[1] && slug[1].toLowerCase() === version) {

    httpProxyMiddleware.default(req, res, {
      target: BACKEND,
      cookieDomainRewrite: "https://admin.funplus.mn",
      
    })

  } else {

  }

  console.log(req.query.slug)
  // console.log(req);

  if (req.session.plus) {
    req.session.plus += 1;
  } else {
    req.session.plus = 1;
  }

  await req.session.save();
  res.status(200).json(req.session);

}

export default withSession(handler);

const version = "v1";

const mySlugs = [
  "auth"
]