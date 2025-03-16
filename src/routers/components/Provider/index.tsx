import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import collectedRoutes from '../../src/routesCollector'
import type { FutureConfig, HydrationState } from '@remix-run/router'

export const routes = collectedRoutes()
interface IOPTS {
  opts?: {
    basename?: string
    future?: Partial<Omit<FutureConfig, 'v7_prependBasename'>>
    hydrationData?: HydrationState
    window?: Window
  }
}

const FileBasedProvider = ({ opts }: IOPTS) => {
console.log(routes)
if(routes.length===0){
  throw new Error("You must provide a non-empty routes ヅ \n 1- Make sure you have a folder inside the src file called pages \n 2- The pages folder must contain at least one page , example (pages/page.tsx)")
}

  const router = createBrowserRouter(routes, opts)
  return   <RouterProvider router={router} />
 
}

export default FileBasedProvider
