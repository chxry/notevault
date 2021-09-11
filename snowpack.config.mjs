import proxy from "http2-proxy";

export default {
  mount: {
    public: { url: "/", static: true },
    src: { url: "/dist" },
  },
  plugins: [
    "@snowpack/plugin-react-refresh",
    "@snowpack/plugin-dotenv",
    "@snowpack/plugin-sass",
    "@snowpack/plugin-typescript",
  ],
  routes: [
    {
      src: "/api/.*",
      dest: (req, res) =>
        proxy.web(req, res, {
          hostname: "localhost",
          port: 3000,
        }),
    },
    { match: "routes", src: ".*", dest: "/index.html" },
  ],
  optimize: {
    bundle: true,
    minify: true,
  },
  packageOptions: {},
  devOptions: {},
  buildOptions: {},
};
