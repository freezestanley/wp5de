/*
 * @Description:
 * @Version:
 * @Author:
 * @Data: Do not edit
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-11-21 16:22:40
 */
import React, { useId, useState } from 'react'
import { Button, Input, DatePicker } from 'antd'
import { useRequest } from 'ahooks'
import { StepBackwardOutlined } from '@ant-design/icons'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function changeUsername(username: string): Promise<{ success: boolean }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true })
    }, 1000)
  })
}

const Main = () => {
  const a = useId()
  const b = useId()
  const c = useId()
  const [state, setState] = useState('')
  const { loading, run } = useRequest(changeUsername, {
    manual: true,
    onSuccess: (result, params) => {
      if (result.success) {
        setState('')
      }
    }
  })
  return (
    <>
      <div>a: {a}</div>
      <div>b: {b}</div>
      <div>c: {c}</div>
      <DatePicker />
      <Button type="primary">click ok</Button>
      <Input />
      <StepBackwardOutlined />
    </>
  )
}
export default Main
