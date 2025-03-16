import React, {
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  cloneElement,
} from "react";
import { IndexRouteObject, LoaderFunction, NonIndexRouteObject, RouteObject, json } from "react-router-dom";
import {
  getNeededInfo,
  importErrorAsync,
  importPagesAsync,
  importUtilsFilesSync,
} from "./utils";
export type RouteConfig = {
  action?: any;
  loader?: any;
  path: string;
  element: ReactElement<any, string | JSXElementConstructor<any>>;
  filePath: string;
};
export type MetaRoutes = {
  [key: string]: { el: ReactNode; pathLength: number; filePath: string };
};

// function transform(pages) {

//   const x = (index) => {
//     const routes = [];
//     pages.forEach((route, i) => {
//       const maxLength= route.path.split("/").length
//       const part = route.path.split('/')[index];
//       const element = index === maxLength - 1 ? route.element : undefined;
//       const nodeEl = routes.find((route) => route.path === part);
//       if (part !== undefined) {

//         if (!nodeEl) {
//          const el = {
//             path: part === '404' ? '*' : part,
//             element,
//             children: !element ? x(index + 1) : undefined,
//           };

//           routes.push(el);
//         }
//       }

//     });

//     return routes;
//   };

//   const y = x(0);

//   return y;
// }
// console.log(transform([]))
// function nestedRoutes(
//   pages: RouteConfig[],
//   layoutInfo: MetaRoutes,
//   loadingInfo: MetaRoutes,
//   errorInfo: MetaRoutes,
// ): RouteObject[] {
//   const routes: RouteObject[] | null = []
//   pages.forEach((route,i) => {
//     let currentNode = routes
//     const splittedPath = route.path.split('/')
//     splittedPath.forEach((part, j) => {

//       let existingNode = currentNode?.find((node) => node.path === part)
//       if (!existingNode) {
//         existingNode = createChildNode(part, i, j, splittedPath, route, loadingInfo, layoutInfo, errorInfo)
//         if (j === 0) {
//           routes.push(existingNode)
//         } else {
//           currentNode.push(existingNode)
//         }
//       }
//       if (existingNode.children) {
//         currentNode = existingNode.children
//       }
//     })
//   })
//   return routes

// }
interface CustomIndexRouteObject extends IndexRouteObject {
  pathKey:string;
}
interface CustomNonIndexRouteObject extends NonIndexRouteObject{
  pathKey:string;
}
type CustomRouteObject = CustomIndexRouteObject|CustomNonIndexRouteObject
function nestedRoutes(
  pages: RouteConfig[],
  layoutInfo: MetaRoutes,
  loadingInfo: MetaRoutes,
  errorInfo: MetaRoutes
): CustomRouteObject[] {
  const routes: CustomRouteObject[] = [];
  pages.forEach((route, i) => {
    let currentNode = routes;
    const splittedPath = route.path.split("/");
    splittedPath.forEach((part, j) => {
      let existingNode = currentNode?.find((node) => node.pathKey === part);
      if (!existingNode) {
        existingNode = createChildNode(
          part,
          i,
          j,
          splittedPath,
          route,
          loadingInfo,
          layoutInfo,
          errorInfo
        );
        if (j === 0) {
          routes.push(existingNode);
        } else {
          currentNode.push(existingNode);
        }
      }
      if (existingNode.children) {
        currentNode = existingNode.children as unknown as CustomRouteObject[];
      }
    });
  });
  return [...routes];
}
function createChildNode(
  part: string,
  i: number,
  j: number,
  splittedPath: string[],
  route: RouteConfig,
  loadingInfo: MetaRoutes,
  layoutInfo: MetaRoutes,
  errorInfo: MetaRoutes
): CustomRouteObject {
  const isLastChild = j === splittedPath.length - 1;
  const hasLayout = !isLastChild && layoutInfo[part] ? true : false;
  const loadingInfoValues = Object.values(loadingInfo);
  const loading = loadingInfoValues
    .sort((a, b) => b.pathLength - a.pathLength)
    .find((e) => e.pathLength <= splittedPath.length)?.el;


    const element =  isLastChild ? (
      <React.Suspense fallback={loading}>{<>{route.element}</>}</React.Suspense>
    ) : layoutInfo[part] ? (
      layoutInfo[part].el
    ) : (
      undefined
    );

  return {
    pathKey: part === "404" ? "*" : part,
    path: part === "404" ? "*" : part,
    // path: part === "404" ? splittedPath.join("/").replace("404" ,"*"  ): isLastChild?splittedPath.join("/"):null,
    key: `${i}-${j}`,
    meta: {
      hasLayout: hasLayout
        ? {
            name: (layoutInfo[part].el as any).type.name,
          }
        : "",
routeName:part === "404" ? "not-found" : part===""?"/":part,
      loading: loading,
      fullRoute:
        splittedPath.length - 1 === j
          ? splittedPath.slice(0, j + 1).join("/")
          : "",
      filePath: route.filePath,
    },
   ...(element ? {element}:{}),
    // element,
    children: isLastChild ? undefined : [],
    errorElement: Object.values(errorInfo).find(
      (e) => e.pathLength === splittedPath.length
    )?.el,
  } as unknown as CustomRouteObject;
}

export default function collectedRoutes(): CustomRouteObject[] {

  // 

  const pageContext = import.meta.glob('/src/pages/**/*{page,404,error}.{js,jsx,ts,tsx}');
  const loadingContext = import.meta.glob('/src/pages/**/*loading.{js,jsx,ts,tsx}' , {eager:true});
  const layoutContext = import.meta.glob('/src/pages/**/*layout.{js,jsx,ts,tsx}' , {eager:true});
  

  const pageModules = importPagesAsync(pageContext);
  
  const layoutModules = importUtilsFilesSync(layoutContext);
  const loadingModules = importUtilsFilesSync(loadingContext);
  const errorModules = importPagesAsync(pageContext);

  const errorsInfo = getNeededInfo("error", errorModules);
  const layoutInfo = getNeededInfo("layout", layoutModules);
  const loadingInfo = getNeededInfo("loading", loadingModules);

  const routes = nestedRoutes(pageModules, layoutInfo, loadingInfo, errorsInfo);
  return routes;
}
