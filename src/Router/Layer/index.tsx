/*
 * @Description:
 * @Version:
 * @Author:
 * @Data: Do not edit
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-10-17 12:51:10
 */
import React, { Profiler } from 'react'
import { useRoutes } from 'react-router-dom'
import Layer from '@/Layer'
import Normal from '@/Layer/Normal'
import Header from '@/Components/Common/Header'
import Footer from '@/Components/Common/Footer'
import { RequireAuth } from '../Auth'
import Loading from '@/Components/Common/Loading'
import { AsyncCanvas, AsyncDocument } from '../Async'

export default function () {
  const LayerHeadRouter = [
    {
      path: 'home',
      element: <Header title={'Print Stage'} />
    },
    {
      path: '*',
      element: <Header title={'ZA-Print'} />
    }
  ]
  const LayerFooterRouter = [
    {
      element: <Footer />
    },
    {
      path: '*',
      element: <Footer />
    }
  ]
  const LayerRouter = [
    {
      path: '/',
      element: (
        <Layer
          header={useRoutes(LayerHeadRouter) || null!}
          footer={useRoutes(LayerFooterRouter) || null!}
        />
      ),
      children: [
        {
          index: true,
          element: <AsyncCanvas />,
          meta: { title: 'formily' }
        }
      ]
    },
    {
      path: '/document',
      element: (
        <Normal
          header={useRoutes(LayerHeadRouter) || null!}
          footer={useRoutes(LayerFooterRouter) || null!}
        />
      ),
      children: [
        {
          index: true,
          element: <AsyncDocument />,
          meta: { title: '使用文档' }
        }
      ]
    }
  ]
  return LayerRouter
}
