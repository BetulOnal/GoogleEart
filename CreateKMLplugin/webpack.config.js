const webpack = require("webpack");
var packageJson = require("./package.json");
var version = packageJson.version;
const Dotenv = require("dotenv-webpack");

module.exports = (env) => ({
  entry: "./index.tsx",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.svg$/,
        use: [{
          loader: '@svgr/webpack',
          options: {
            ref: true,
            ids: true,
            svgoConfig: {
              plugins: [
                {
                  name: 'preset-default',
                  params: {
                    overrides: {
                      prefixIds: false, cleanupIDs: false
                    },
                  },
                },
              ],
            }
          }
        }],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    fallback: {
      querystring: require.resolve("querystring-es3"),
    },
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: env.ENV,
    }),
    new Dotenv({
      path: `./.env.${env.ENV}`,
    }),
  ],
  output: {
    library: `${packageJson.name}`,
    libraryTarget: "umd",
    path: __dirname,
    filename: `./build/${packageJson.name}@${version}.js`,
  },
  externals: {
    'react': {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
    },
    "antd": {
      root: "Antd",
      commonjs: "antd",
      commonjs2: "antd",
    },
    'cesium': {
      root: 'Cesium',
      commonjs: 'cesium',
      commonjs2: 'cesium',
    },
  }
});
