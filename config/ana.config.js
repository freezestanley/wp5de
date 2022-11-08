/*
 * @Description: 分析 config
 * @Version:
 * @Author:
 * @Data: Do not edit
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-11-06 21:56:37
 */
const { merge } = require('webpack-merge')
const BaseConfig = require('./base.config')
const webpack = require('webpack')
const fs = require('fs')
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = merge(BaseConfig, {
  mode: 'production',
  plugins: [new BundleAnalyzerPlugin()],
})
