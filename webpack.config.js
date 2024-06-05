const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const fs = require("fs");
const { marked } = require("marked"); // Correct import for marked
const webpack = require("webpack");
require("dotenv").config(); // Load .env file

class MarkdownToHtmlPlugin {
  apply(compiler) {
    compiler.hooks.emit.tapAsync("MarkdownToHtml", (compilation, callback) => {
      const contentPath = path.resolve(__dirname, "src/content.md");
      const markdownContent = fs.readFileSync(contentPath, "utf-8");
      const htmlContent = marked(markdownContent);

      compilation.assets["content.html"] = {
        source: () => htmlContent,
        size: () => htmlContent.length,
      };

      callback();
    });
  }
}

module.exports = {
  mode: process.env.NODE_ENV || "development", // Use the environment variable
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.md$/,
        use: "file-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html",
      inject: "body",
      scriptLoading: "blocking",
    }),
    new MarkdownToHtmlPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 9000,
    open: true,
  },
};
