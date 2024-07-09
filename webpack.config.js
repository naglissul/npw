const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const fs = require("fs");
const { marked } = require("marked");
const webpack = require("webpack");
const glob = require("glob");
require("dotenv").config();

class MarkdownToHtmlPlugin {
  apply(compiler) {
    compiler.hooks.thisCompilation.tap("MarkdownToHtml", (compilation) => {
      compilation.hooks.processAssets.tapAsync(
        {
          name: "MarkdownToHtml",
          stage: webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONS,
        },
        (assets, callback) => {
          const contentPath = path.resolve(__dirname, "src/content");
          console.log("Content directory path:", contentPath);

          // Find all Markdown files in the content directory, including subdirectories
          const markdownFiles = glob.sync(path.join(contentPath, "**/*.md"));
          console.log("Found markdown files:", markdownFiles);

          const links = [];

          if (markdownFiles.length === 0) {
            console.warn("No markdown files found.");
          } else {
            // Generate the navigation links
            markdownFiles.forEach((file) => {
              const filename = path.basename(file, ".md") + ".html";
              if (filename !== "index.html") {
                const link = `<li><a href="/${filename}">${filename}</a></li>`;
                links.push(link);
              }
            });

            // Generate the navigation HTML
            const navHtml = `<ul>${links.join("")}</ul>`;
            console.log("Generated navigation HTML:", navHtml);

            // Generate each HTML file with the navigation links and content
            markdownFiles.forEach((file) => {
              const markdownContent = fs.readFileSync(file, "utf-8");
              const htmlContent = marked(markdownContent);
              const filename = path.basename(file, ".md") + ".html";

              console.log(`Generating HTML for: ${file} -> ${filename}`);

              // Generate the HTML content using the template
              const templatePath = path.resolve(__dirname, "src/template.html");
              const templateContent = fs.readFileSync(templatePath, "utf-8");
              const modifiedTemplateContent = templateContent
                .replace(
                  "<!-- Links to the generated pages will go here -->",
                  navHtml
                )
                .replace(
                  "<!-- MARKDOWN CONTENT WILL BE INJECTED HERE -->",
                  htmlContent
                );

              assets[filename] = {
                source: () => modifiedTemplateContent,
                size: () => modifiedTemplateContent.length,
              };
            });

            // Generate the index.html with the content from index.md
            const indexMarkdownPath = path.resolve(contentPath, "index.md");
            if (fs.existsSync(indexMarkdownPath)) {
              const indexMarkdownContent = fs.readFileSync(
                indexMarkdownPath,
                "utf-8"
              );
              const indexHtmlContent = marked(indexMarkdownContent);

              const indexTemplatePath = path.resolve(
                __dirname,
                "src/template.html"
              );
              const indexTemplateContent = fs.readFileSync(
                indexTemplatePath,
                "utf-8"
              );
              const modifiedIndexTemplateContent = indexTemplateContent
                .replace(
                  "<!-- Links to the generated pages will go here -->",
                  navHtml
                )
                .replace(
                  "<!-- MARKDOWN CONTENT WILL BE INJECTED HERE -->",
                  indexHtmlContent
                );

              assets["index.html"] = {
                source: () => modifiedIndexTemplateContent,
                size: () => modifiedIndexTemplateContent.length,
              };
            }
          }

          callback();
        }
      );
    });
  }
}

module.exports = {
  mode: process.env.NODE_ENV || "development",
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.md$/,
        use: "file-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /logo\.png$/,
        type: "asset/resource",
        generator: {
          filename: "logo.png",
        },
      },
    ],
  },
  plugins: [
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
