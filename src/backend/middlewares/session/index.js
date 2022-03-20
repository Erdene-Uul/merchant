import { withIronSessionApiRoute } from "iron-session/next";
import { v4 as UUID } from "uuid";

export default function withSession(handler) {
  return withIronSessionApiRoute(handler, {
    password: `asdaisoudihwk2nknjiopvjxckvroijgkjndfblknjdfobvhjrbgkdnglkf`,
    cookieName: "fun_plus.session",
    cookieOptions: {
      // the next line allows to use the session in non-https environments like
      // Next.js dev mode (http://localhost:3000)
      secure: process.env.NODE_ENV === "production" ? true : false,
    },
  });
}
