/*
 * @Description:
 * @Version:
 * @Author:
 * @Data: Do not edit
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-12-05 16:58:50
 */
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppRouter from './Router'

const app = document.getElementById('app')

const rootNode = () => (
  <BrowserRouter>
    <AppRouter />
  </BrowserRouter>
)
// ReactDom.render(<Application />, app)
// uiuiuiuiuiuiu
const root = createRoot(app!)

root.render(<React.StrictMode>{rootNode()}</React.StrictMode>)
