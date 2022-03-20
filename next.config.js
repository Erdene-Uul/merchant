const withPlugins = require("next-compose-plugins");

const withLess = require("next-with-less");

const plugins = [
  /* ...other plugins... */
  [
    withLess,
    {
      lessLoaderOptions: {
        /* ... */
      },
    },
  ],
  /* ...other plugins... */
];

module.exports = withPlugins(plugins, {
  /* ... */
  images: {
    // domains: ["http://localhost:2401/uploads"],
    // path:"http://localhost:2401/uploads"
  },
  env: {
    ROOT_IMG_URL: "http://localhost:2401/uploads"
  },
  reactStrictMode: true,
  env: {
    API_HOST: process.env.API_HOST,
    WEBSITE_URL: "https://admin.funplus.mn",
    hosted_button_id: process.env.hosted_button_id
  },
  async rewrites() {
    return [
      // {
      //   source: '/api/:slug*',
      //   destination: `${process.env.API_HOST}/api/:slug*`
      // }
    ]
  },
});
