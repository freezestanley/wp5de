/*
 * @Description:
 * @Version:
 * @Author:
 * @Data: Do not edit
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-11-21 15:59:36
 */
module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-react',
    '@babel/preset-typescript'
  ],
  plugins: [
    // [
    //   'import',
    //   { libraryName: 'antd', libraryDirectory: 'es', style: true },
    //   'antd',
    // ],
    // [
    //   'import',
    //   { libraryName: '@formily/antd', libraryDirectory: 'esm', style: true },
    //   '@formily/antd',
    // ],
  ],
  env: {
    test: {
      plugins: ['@babel/plugin-transform-modules-commonjs']
    },
    development: {}
  }
}
