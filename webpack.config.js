const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const deps = require("./package.json").dependencies;
const path = require("path");
const { ModuleFederationPlugin } = webpack.container;
// const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const buildDate = new Date().toLocaleString();

module.exports = (_, argv) => {
  return {
    entry: "./src/index.ts",
    output: {
      publicPath: "auto",
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
      // clean: true,
    },
    devtool: "source-map",
    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    },

    devServer: {
      port: 5000,
      historyApiFallback: true,
      allowedHosts: "all",
      open: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
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
      new webpack.EnvironmentPlugin({
        BUILD_DATE: buildDate,
      }),
      new webpack.DefinePlugin({
        "process.env": JSON.stringify(process.env),
      }),
      new ModuleFederationPlugin({
        name: "SuperApp",
        filename: "remoteEntry.js",
        remotes: {
          // AXIOS: `axios@${process.env.REMOTE_PATH_AXIOS}`,
          OPMS: `opms@${process.env.REMOTE_PATH_OPMS}`,
          // MDM: `mdm@${process.env.REMOTE_PATH_MDM}`,
          // EDXPERT: `edexpert@${process.env.REMOTE_PATH_EDXPERT}`,
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
      // new ForkTsCheckerWebpackPlugin(),
    ],
  };
};
