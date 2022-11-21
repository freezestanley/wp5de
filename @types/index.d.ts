/*
 * @Description:
 * @Version:
 * @Author:
 * @Data: Do not edit
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-11-09 13:11:52
 */
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.css' {
  const value: string
  export default value
}
declare module '*.png' {
  const value: string
  export default value
}

declare module '*.svg' {
  /* eslint-disable */
  export function ReactComponent(
    props: React.SVGProps<SVGSVGElement>
  ): React.ReactElement
  const url: string
  export default url
}

interface Window {
  BUILD: string
  VConsole: function
  location: string
  Mode: string
}

declare let module: {
  hot?: { accept: function }
}
declare const Mode: string

