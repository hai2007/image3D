const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const webpack = require("webpack");

module.exports = merge(common, {
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./",
    compress: false,
    host: "0.0.0.0",
    port: "20000",
    hot: true,
    inline: true,
    historyApiFallback: true,
    disableHostCheck: true,
    watchOptions: {
      poll: true,
      ignored: /node_modules/,
      aggregateTimeout: 300
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ],
  mode: "development"
});
