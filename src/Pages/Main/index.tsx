/*
 * @Description:
 * @Version:
 * @Author:
 * @Data: Do not edit
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-12-05 17:03:35
 */
import React, { useId, useState } from 'react'
import { useRequest } from 'ahooks'
import { StepBackwardOutlined } from '@ant-design/icons'
import create from 'zustand'
import { createForm } from '@formily/core'
import { FormProvider, FormConsumer, Field } from '@formily/react'

import {
  FormItem,
  DatePicker,
  FormLayout,
  Input,
  FormButtonGroup,
  Submit
} from '@formily/antd'

import Footer from '@fl/footer'
import Header from '@fl/header'

const form = createForm()
const FormEle = () => {
  return (
    <>
      <Footer />
      <Header />
      <FormProvider form={form}>
        <FormLayout layout="vertical">
          <Field
            name="input"
            title="输入框"
            required
            initialValue="Hello world"
            decorator={[FormItem]}
            component={[Input]}
          />
        </FormLayout>
        <FormConsumer>
          {() => (
            <div
              style={{
                marginBottom: 20,
                padding: 5,
                border: '1px dashed #666'
              }}
            >
              实时响应：{form.values.input}
            </div>
          )}
        </FormConsumer>
        <FormButtonGroup>
          <Submit onSubmit={console.log}>提交</Submit>
        </FormButtonGroup>
      </FormProvider>
    </>
  )
}

const useBearStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 })
}))

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
  const bears = useBearStore((state) => state.bears)
  return (
    <>
      <h1>{bears} around here ...</h1>
      <DatePicker />
      <Input />
      <StepBackwardOutlined />
      <FormEle />
    </>
  )
}
export default Main
