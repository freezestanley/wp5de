import { merge } from 'webpack-merge'
import BaseConfig from './base.config'
import * as webpack from 'webpack'
import * as fs from 'fs'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'

const isDevelopment = process.env.NODE_ENV !== 'production'
const config = merge(BaseConfig, {
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
    server: {
      type: 'https',
      options: {
        key: fs.readFileSync(
          path.resolve(__dirname, '../__mocks__/https/127.0.0.1+1-key.pem')
        ),
        cert: fs.readFileSync(
          path.resolve(__dirname, '../__mocks__/https/127.0.0.1+1.pem')
        )
      }
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
} as any)
export default config