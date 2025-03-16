// importPagesAsync.ts
import React, { cloneElement, lazy } from 'react';
import { MetaRoutes, RouteConfig } from './routesCollector';
import { Outlet } from 'react-router-dom';

const routeWithoutUnderscore = ([route]: [string,any]) =>!route.split("/").find(el=>el.startsWith("_"))


const importPagesAsync = (require: any): RouteConfig[] => {
return  Object.entries(require).filter(routeWithoutUnderscore).map(([route ,file]:[string , any])=>{
  console.log(route) 
  const path = route.substr(10)
    .replace(/(page).(js|jsx|ts|tsx)$/, '')
    .replace(/404.(js|jsx|ts|tsx)$/, '404')
    .replace(/error.(js|jsx|ts|tsx)$/, 'error')
    .replace(/\[\.{3}.+\]/, '*')
    .replace(/\[(.+?)\]/g, ':$1')
    .replace(/\((.+?)\)\//g, '');
    const Element = lazy(file);

    // const Element = file
    // console.log(Element())
    return { path, filePath: route, element: <Element/> }
  })
};
const importErrorAsync = (require: any): RouteConfig[] => {
  return  Object.entries(require).filter(routeWithoutUnderscore).map(([route ,file]:[string , any])=>{
    const path = route.substr(10)
    .replace(/\/.(js|jsx|ts|tsx)$/, '').replace(/\((.+?)\)\//g, '');
    const Element = lazy(file);
    return { path, filePath: route, element: <Element /> };
  })
};


const importUtilsFilesSync = (require: any): RouteConfig[] => {
  console.log(Object.entries(require))
  return  Object.entries(require).filter(routeWithoutUnderscore).map(([route ,file]:[string , any])=>{
    const path = route.substr(10).replace(/.(js|jsx|ts|tsx)$/, '').replace(/\((.+?)\)\//g, '')

    const Element = file.default;
    return { path, filePath: route, element: <Element /> };
  })
}
function getNeededInfo(key: string, routes: RouteConfig[]): MetaRoutes {
  const data: MetaRoutes = {}
  routes
    .filter((route) => route.path.includes(key))
    .forEach((route) => {
      const splitied = route.path.split('/')
      const indexoF = splitied.indexOf(key)
      if(key=="error"){
        // console.log(indexoF)
      }
      const newElement = key === 'layout' ? cloneElement(route.element, { children: <Outlet /> }) : route.element

      data[splitied[indexoF - 1]] = {
        el: newElement,
        pathLength: splitied.length,
  filePath:route.filePath

      }
    })
  return data
}

export  {importPagesAsync ,importErrorAsync, getNeededInfo ,importUtilsFilesSync };