/*
 * @Description: 
 * @Version: 
 * @Author: 
 * @Data: Do not edit
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-11-27 13:27:47
 */
import { merge } from 'webpack-merge'
import BaseConfig from './base.config'
import * as webpack from 'webpack'
import * as fs from 'fs'
import path from 'path'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import WorkboxPlugin from 'workbox-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'

const config = merge(BaseConfig, {
  mode: 'production',
  cache: {
    type: 'filesystem' // 使用文件缓存
  },
  stats: {
    children: false // 不输出子模块的打包信息
  },
  externals: {
    react: 'window.React',
    'react-dom': 'window.ReactDOM'
  },
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
              cacheDirectory: true
            }
          }
        ]
      },
      {
        // .css 解析
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },
      {
        // .less 解析
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          {
            loader: 'less-loader',
            options: { lessOptions: { javascriptEnabled: true } }
          }
        ]
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: 'all',
        parallel: true, // 多线程并行构建
        terserOptions: {
          // https://github.com/terser/terser#minify-options
          compress: {
            warnings: false, // 删除无用代码时是否给出警告
            drop_debugger: true, // 删除所有的debugger
            drop_console: true, // 删除所有的console.*
            pure_funcs: ['console.log'] // 删除所有的console.log
          }
        }
      }),
      new CssMinimizerPlugin()
    ],
    splitChunks: {
      chunks: 'all',
      minSize: 300000,
      maxSize: 500000
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env': 'prod'
    }),
    new MiniCssExtractPlugin({
      filename: 'style/[contenthash:3].[name].css?v=[contenthash]',
      chunkFilename: 'style/[contenthash:3].[id].css?v=[contenthash]',
      ignoreOrder: false,
      linkType: 'text/css'
    }),
    new WorkboxPlugin.GenerateSW({
      // these options encourage the ServiceWorkers to get in there fast
      // and not allow any straggling "old" SWs to hang around
      clientsClaim: true,
      skipWaiting: true,
      cacheId: 'webpack-pwa',
      // globPatterns: ['**/*.{html,js,css,png.jpg}'],
      runtimeCaching: [
        // 配置路由请求缓存
        {
          urlPattern: /.*\.js/, // 匹配文件
          handler: 'NetworkFirst' // 网络优先
        },
        {
          urlPattern: /api/, // 匹配文件
          handler: 'NetworkFirst', // 网络优先
          options: {
            // 超过10s使用缓存做为回退方案。
            networkTimeoutSeconds: 3,
            // 为此路由指定自定义缓存名称。
            cacheName: 'api',
            // 配置自定义缓存过期。
            expiration: {
              maxEntries: 5,
              maxAgeSeconds: 60
            },
            // 配置background sync.
            backgroundSync: {
              name: 'factory-queue-name',
              options: {
                maxRetentionTime: 60 * 60
              }
            },
            // 配置哪些response是可缓存的。
            cacheableResponse: {
              statuses: [0, 200]
              // headers: { 'x-test': 'true' }
            },
            // 配置广播缓存更新插件。
            // broadcastUpdate: {
            //   channelName: 'factory-update-channel'
            // },
            // 添加您需要的任何其他逻辑插件。
            plugins: [
              // {
              //   cacheDidUpdate: () => {
              //     /* 自定义插件代码 */
              //   }
              // }
            ],
            // matchOptions 和 fetchOptions 用于配置 handler.
            fetchOptions: {
              mode: 'no-cors'
            },
            matchOptions: {
              ignoreSearch: true
            }
          }
        },
        {
          urlPattern: /.*\.[html|css|png|jpg]/, // 匹配文件
          handler: 'StaleWhileRevalidate' // 网络优先
        }
      ]
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html', // 生成的html存放路径，相对于 output.path
      template: './public/index.html', // html模板路径
      hash: false, // 防止缓存，在引入的文件后面加hash (PWA就是要缓存，这里设置为false)
      inject: true, // 是否将js放在body的末尾
      script: `
        <script src="https://gw.alipayobjects.com/os/lib/react/18.2.0/umd/react.production.min.js"></script>
        <script src="https://gw.alipayobjects.com/os/lib/react-dom/18.2.0/umd/react-dom.production.min.js"></script>`,
      // 正式环境，把注册service-worker的代码加入到index.html中
      registerServiceWorker: `<script>
        if ("serviceWorker" in navigator) {
          window.addEventListener("load", () => {
              navigator.serviceWorker.register("./service-worker.js").then((registration) => {
              console.log('SW registered: ', registration)
            })
            .catch((registrationError) => {
              console.log('SW registration failed: ', registrationError)
            });
          });
        }
      </script>`
    })
  ]
} as any)
export default config