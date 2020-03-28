const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");


const name = "app";

module.exports = {
  entry: "./index.js",
  output: {
    filename: name + ".js",
    path: path.resolve(__dirname, "../assets")
  },
  plugins: [
    new ExtractTextPlugin(name + ".css"),
    new CleanWebpackPlugin(),
    new UglifyJSPlugin({
      sourceMap: true
    }),
    new CopyWebpackPlugin([
      {
        from:  path.resolve(__dirname, "../src/images"),
        to: path.resolve(__dirname, "../assets/images")
      }
    ]),
    new CopyWebpackPlugin([
      {
        from:  path.resolve(__dirname, "../src/mix-manifest.json"),
        to: path.resolve(__dirname, "../assets/mix-manifest.json")
      }
    ]),
    new CopyWebpackPlugin([
      {
        from:  path.resolve(__dirname, "../src/thirdparty/sensorsdata.min.js"),
        to: path.resolve(__dirname, "../assets/thirdparty/sensorsdata.min.js")
      }
    ]),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          //如果需要，可以在 sass-loader 之前将 resolve-url-loader 链接进来
          use: ["css-loader", "sass-loader"]
        })
      }
    ]
  }
};
