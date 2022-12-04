import React, { Profiler } from 'react'
import { useRoutes, useLocation, useMatch } from 'react-router-dom'
import Login from '@/Pages/Login'
import Main from '@/Pages/Main'
import Notfound from '@/Pages/Notfound'

function result() {
  return [
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/',
      element: <Main />
    },
    {
      path: '*',
      element: <Notfound />
    }
  ]
}
export default function () {
  return useRoutes([...result()])
}
