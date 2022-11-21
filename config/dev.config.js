/*
 * @Description: dev config
 * @Version:
 * @Author:
 * @Data: Do not edit
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-11-18 17:08:51
 */
const { merge } = require('webpack-merge')
const BaseConfig = require('./base.config')
const webpack = require('webpack')
const fs = require('fs')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const isDevelopment = process.env.NODE_ENV !== 'production'
const path = require('path')

module.exports = merge(BaseConfig, {
  mode: 'development',
  devtool: 'eval-source-map', // 报错的时候在控制台输出哪一行报错
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: [/node_modules/, /public/, /(.|_)min\.js$/],
        use: [
          {
            loader: 'thread-loader',
            options: {
              workers: require('os').cpus()
            }
          },
          {
            loader: require.resolve('babel-loader'),
            options: {
              cacheDirectory: true,
              plugins: [
                isDevelopment && require.resolve('react-refresh/babel')
              ].filter(Boolean)
            }
          }
        ]
      }
    ]
  },
  devServer: {
    hot: true,
    open: true,
    historyApiFallback: true,
    // compress: true,
    port: 8900,
    static: {
      directory: path.join(__dirname, 'public')
    },
    client: {
      reconnect: true
    },
    https: {
      key: fs.readFileSync(
        path.resolve(__dirname, '../__mocks__/https/127.0.0.1+1-key.pem')
      ),
      cert: fs.readFileSync(
        path.resolve(__dirname, '../__mocks__/https/127.0.0.1+1.pem')
      )
    }
  },
  plugins: [
    isDevelopment && new ReactRefreshWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'index',
      template: './public/index.html',
      filename: 'index.html', //生成的html存放路径，相对于 output.path
      // favicon: './public/favicon.png', // 自动把根目录下的favicon.ico图片加入html
      inject: true, // 是否将js放在body的末尾
      scripts: ``
    })
  ].filter(Boolean)
})
