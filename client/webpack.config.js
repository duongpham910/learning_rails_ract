const webpack = require("webpack");

const paths = {
  src: __dirname + "/src",
  dest: __dirname + "/../app/assets/javascripts",
};

module.exports = {
  entry: paths.src + "/bootstrap",
  output: {
    path: paths.dest,
    filename: "react-app.js",
  },
  resolve: {
    extensions: ["", ".js", ".jsx"]
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: [
        "babel?cacheDirectory",
      ],
    }]
  },
  plugins: [
     new webpack.ProvidePlugin({
       React: "react",
       update: "react-addons-update",
       mui: "material-ui",
       t: "counterpart",
       API: paths.src + "/API",
       config: __dirname + "/config",
       cm: paths.src + "/Common",
       BaseComponent: paths.src + "/BaseComponent",
       PageComponent: paths.src + "/PageComponent",
       BaseMaster: paths.src + "/Master/BaseMaster"
     })
  ],
};
