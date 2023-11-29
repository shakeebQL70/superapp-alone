const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const deps = require("./package.json").dependencies;
const path = require("path");

module.exports = (_, argv) => {
  return {
    output: {
      publicPath: 'https://superapp-alone.vercel.app/',
      // filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
      clean: true,
    },
    devtool: "eval",
    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    },

    devServer: {
      port: 5000,
      historyApiFallback: true,
      allowedHosts: "all",
    },

    module: {
      rules: [
        {
          test: /\.m?js/,
          type: "javascript/auto",
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.(css|s[ac]ss)$/i,
          use: ["style-loader", "css-loader", "postcss-loader"],
        },
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
      ],
    },

    plugins: [
      new ModuleFederationPlugin({
        name: "SuperApp",
        filename: "remoteEntry.js",
        remotes: {
          AXIOS: `axios@${process.env.REMOTE_PATH_AXIOS}`,
          OPMS: `opms@${process.env.REMOTE_PATH_OPMS}`,
          MDM: `mdm@${process.env.REMOTE_PATH_MDM}`,
          EDXPERT: `edexpert@${process.env.REMOTE_PATH_EDXPERT}`,
          UI: `ui@${process.env.REMOTE_PATH_UI}`,
        },
        exposes: {
          "./store": "./src/Store/store.tsx",
          "./service": "./src/service",
        },
        shared: {
          ...deps,
          react: {
            singleton: true,
            requiredVersion: deps.react,
          },
          "react-dom": {
            singleton: true,
            requiredVersion: deps["react-dom"],
          },
        },
      }),
      new HtmlWebPackPlugin({
        template: "./src/index.html",
      }),
    ],
  };
};
