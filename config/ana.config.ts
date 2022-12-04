// const { merge } = require('webpack-merge')
// const prdConfig = require('./prd.config')
// const webpack = require('webpack')
// const fs = require('fs')
// const BundleAnalyzerPlugin =
//   require('webpack-bundle-analyzer').BundleAnalyzerPlugin

// module.exports = merge(prdConfig, {
//   mode: 'production',
//   plugins: [new BundleAnalyzerPlugin()]
// })

import { merge } from 'webpack-merge'
import prdConfig from './prd.config'
import * as webpackbundleanalyzer from 'webpack-bundle-analyzer'

const BundleAnalyzerPlugin = webpackbundleanalyzer.BundleAnalyzerPlugin

const config = merge(prdConfig, {
  mode: 'production',
  plugins: [new BundleAnalyzerPlugin()]
} as any)
export default config