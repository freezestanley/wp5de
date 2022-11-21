import React, { useId, useState } from 'react'
import { Button, Input } from 'antd'
import { useRequest } from 'ahooks'

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
      <Button type="primary"> asdf</Button>
      <Input />
    </>
  )
}
export default Main
