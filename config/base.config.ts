/*
 * @Description: 
 * @Version: 
 * @Author: 
 * @Data: Do not edit
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-12-06 14:55:27
 */
import * as webpack from 'webpack'
import * as path from 'path'
import * as CopyPlugin from 'copy-webpack-plugin'
import webpackbar from 'webpackbar'
import EncodingPlugin from 'webpack-encoding-plugin'
import * as EslintWebpackPlugin from 'eslint-webpack-plugin'
import * as StyleLintPlugin from 'stylelint-webpack-plugin'

const PUBLIC_PATH = '/' // 基础路径

const config: webpack.Configuration = {
  entry: {
    app: {
      import: './src/index.tsx',
      dependOn: ['router']
    },
    router: {
      import: ['ahooks', 'react-router-dom'], //'prop-types'
      runtime: 'runtime'
    }
  },
  output: {
    path: path.resolve(__dirname, '../dist'), // 将文件打包到此目录下
    publicPath: PUBLIC_PATH, // 在生成的html中，文件的引入路径会相对于此地址，生成的css中，以及各类图片的URL都会相对于此地址
    filename: 'js/[name].[contenthash:4].js',
    chunkFilename: 'js/[name].chunk.js',
    assetModuleFilename: 'images/[name]-[contenthash:4][ext][query]' // 设置静态文件输入目录
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  module: {
    rules: [
      {
        // .css 解析
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        // .less 解析
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          {
            loader: 'less-loader',
            options: { lessOptions: { javascriptEnabled: true } }
          }
        ]
      },
      {
        // 文件解析
        test: /\.(appcache|mp3|mp4|pdf)(\?|$)/,
        include: path.resolve(__dirname, 'src'),
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'static/font/[hash][ext][query]'
        }
      },
      {
        // 图片解析
        test: /\.(png|jpg|jpeg|gif)(\?|$)/i,
        include: path.resolve(__dirname, 'src'),
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024 // 4kb
          }
        },
        generator: {
          filename: 'static/images/[hash][ext][query]'
        },
        type: 'asset'
      },
      {
        // wasm文件解析
        test: /\.wasm$/,
        include: path.resolve(__dirname, 'src'),
        type: 'webassembly/experimental'
      },
      {
        // xml文件解析
        test: /\.xml$/,
        include: path.resolve(__dirname, 'src'),
        use: ['xml-loader']
      }
    ]
  },
  plugins: [
    new webpackbar(), // 打包时美化进度条
    new CopyPlugin({
      patterns: [
        {
          from: './public/**/*',
          to: './',
          globOptions: {
            ignore: [
              '**/favicon.png',
              '**/index.html',
              '**/*.less',
              '**/*.sass'
            ]
          },
          noErrorOnMissing: true
        }
      ]
    }),
    new EncodingPlugin({ encoding: 'utf-8' }),
    new EslintWebpackPlugin({
      fix: true,
      extensions: ['js', 'jsx', 'ts', 'tsx'],
      exclude: ['node_modules', 'config', 'public']
    }),
    new StyleLintPlugin({
      context: 'src',
      configFile: path.resolve(__dirname, '../stylelint.config.js'),
      files: '**/*.less',
      failOnError: false,
      quiet: true,
      fix: true,
      customSyntax: 'postcss-less',
      extensions: ['css', 'scss', 'sass', 'less'],
      configBasedir: path.resolve(__dirname, '../')
    })
  ],
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.jsx', '.less', '.css'], // 后缀名自动补全
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  }
}

export default config