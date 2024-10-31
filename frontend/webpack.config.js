const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const fs = require('fs');
const {InjectManifest} = require('workbox-webpack-plugin');

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./static/frontend"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, // Usa MiniCssExtractPlugin invece di style-loader
          "css-loader",
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css", // Nome del file CSS estratto
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
      },
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "public/manifest.json", to: "manifest.json" },
        { from: "public/icons", to: "icons" }, // per le icone, se le usi
        { from: "./src/sw.js", to: "sw.js" },  // Aggiungi questa linea
      ],
    }),
    new InjectManifest({
      swSrc: './src/sw.js',
    }),
  ],
  devServer: {
    port: 8080,
    host: 'localhost',
    server: {
      type: 'https',  // Specifica che vuoi usare https
      options: {
        key: fs.readFileSync(path.resolve(__dirname, 'key_no_passphrase.pem')),
        cert: fs.readFileSync(path.resolve(__dirname, 'cert.pem')),
      },
    },
    hot: true,
    open: true,  // opzionale: apre automaticamente il browser
  },
};
