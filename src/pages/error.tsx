import React from 'react'
import { useRouteError } from 'react-router-dom';

function Error() {
  let error:any = useRouteError();
console.log(error)
  return (
    <section className="min-h-[100dvh] bg-white dark:bg-gray-900">
    <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
            <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">{error.status||"500"}</h1>
            <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">{error.statusText||"Internal Server Error."}</p>
            <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">We are already working to solve the problem. </p>
        </div>   
    </div>
</section>
  )
}

export default Error