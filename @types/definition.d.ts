/*
 * @Description:
 * @Version:
 * @Author:
 * @Data: Do not edit
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-11-25 17:59:19
 */
declare module '*.less' {
  const classes: {
    readonly [key: string]: string
  }
  export default classes
  declare module '*.less'
}

declare module '*.sass' {
  const classes: {
    readonly [key: string]: string
  }
  export default classes
  declare module '*.sass'
}

declare module '*.scss' {
  const classes: {
    readonly [key: string]: string
  }
  export default classes
  declare module '*.scss'
}

declare module 'moment' {
  import { Dayjs } from 'dayjs'
  namespace moment {
    type Moment = Dayjs
  }
  export = moment
  export as namespace moment
}
