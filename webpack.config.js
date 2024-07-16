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

          const structure = {};

          if (markdownFiles.length === 0) {
            console.warn("No markdown files found.");
          } else {
            // Generate the file structure
            markdownFiles.forEach((file) => {
              const relativePath = path.relative(contentPath, file);
              const parts = relativePath.split(path.sep);
              let currentLevel = structure;

              parts.forEach((part, index) => {
                if (index === parts.length - 1) {
                  currentLevel[part] = relativePath
                    .replace(/\\/g, "/")
                    .replace(".md", ".html");
                } else {
                  currentLevel[part] = currentLevel[part] || {};
                  currentLevel = currentLevel[part];
                }
              });
            });

            const generateNavHtml = (structure, basePath = "") => {
              let html = "<ul>";
              for (const key in structure) {
                if (typeof structure[key] === "string") {
                  const link = `/${structure[key]}`;
                  html += `<li><a href="${link}">${key}</a></li>`;
                } else {
                  const folderPath = basePath ? `${basePath}/${key}` : `${key}`;
                  html += `<li><button class="folder-btn">${key}</button>${generateNavHtml(
                    structure[key],
                    folderPath
                  )}</li>`;
                }
              }
              html += "</ul>";
              return html;
            };

            const navHtml = generateNavHtml(structure);
            console.log("Generated navigation HTML:", navHtml);

            // Generate each HTML file with the navigation links and content
            markdownFiles.forEach((file) => {
              let markdownContent = fs.readFileSync(file, "utf-8");
              const relativePath = path.relative(contentPath, file);
              const dirname = path.dirname(relativePath);
              const filename = relativePath
                .replace(/\\/g, "/")
                .replace(".md", ".html");

              const htmlContent = marked(markdownContent);

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
        generator: {
          filename: "assets/[hash][ext][query]",
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