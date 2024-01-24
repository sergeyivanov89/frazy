import path from "path";
import webpack from "webpack";
import htmlWebpackPlugin from "html-webpack-plugin";
import miniCSSExtractPlugin from "mini-css-extract-plugin";
import postcssPresetEnv from "postcss-preset-env";
import "webpack-dev-server";
import type { Configuration } from "webpack";

type Arguments = {
  [x: string]: string | number | boolean | undefined;
};

export default (env: Arguments, { mode }: Arguments) => {
  const isDevelopment = mode === "development";

  const config: Configuration = {
    entry: path.resolve(__dirname, "src/index.tsx"),

    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name].[contenthash].js",
      clean: true,
    },

    plugins: [
      new htmlWebpackPlugin({
        template: path.resolve(__dirname, "public/index.html"),
        minify: !isDevelopment,
      }),
      new miniCSSExtractPlugin({
        filename: "css/[name].[contenthash:8].css",
      }),
      new webpack.ProgressPlugin(),
    ],

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.scss$/i,
          use: [
            isDevelopment ? "style-loader" : miniCSSExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                modules: {
                  auto: /\.module\.scss$/,
                  localIdentName: isDevelopment
                    ? "[path][name]__[local]"
                    : "[hash:base64]",
                },
              },
            },
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [
                    postcssPresetEnv({
                      features: {
                        "nesting-rules": {
                          noIsPseudoSelector: false,
                        },
                      },
                    }),
                  ],
                },
              },
            },
            "sass-loader",
          ],
        },
      ],
    },

    resolve: {
      extensions: [".tsx", ".ts", ".js"],
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  };

  if (isDevelopment) {
    config.devServer = {
      static: false,
      port: 3000,
      open: true,
      historyApiFallback: true,
    };
    config.devtool = "inline-source-map";
  }

  return config;
};
