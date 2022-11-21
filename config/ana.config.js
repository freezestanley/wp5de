/*
 * @Description: 分析 config
 * @Version:
 * @Author:
 * @Data: Do not edit
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-11-18 09:13:41
 */
const { merge } = require('webpack-merge')
const prdConfig = require('./prd.config')
const webpack = require('webpack')
const fs = require('fs')
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = merge(prdConfig, {
  mode: 'production',
  plugins: [new BundleAnalyzerPlugin()]
})
