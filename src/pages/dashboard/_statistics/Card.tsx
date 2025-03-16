import React from 'react'
import {  theme } from "antd";
import {  useSelector } from "react-redux";
import { FormattedMessage } from 'react-intl';

function Cards({data}) {
    console.log({data})
    const selectedTheme = useSelector(
        ({ ThemeSwitcher }: { ThemeSwitcher: any }) =>
          ThemeSwitcher.theme
      );


    const { token } = theme.useToken();
 const style= {
    backgroundColor: token.colorBgContainer,
    color:token.colorPrimaryText
  }

const skeletonStyle= selectedTheme === "darkAlgorithm" ? "bg-gray-800" : "bg-gray-200";
    return (
    <div >
    <div className="grid gap-4 lg:gap-4 md:grid-cols-2 lg:grid-cols-3  pt-2">
      <div
                style={style}
      className="relative p-6  rounded-e-2xl  shadow  border border-0 border-l-4 border-blue-400 border-solid ">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 dark:text-gray-400">
            <span><FormattedMessage id='clients-count' /></span>
          </div>
          <div className="text-3xl ">{data ? data.clients_count : <span className={`inline-block w-10 h-2.5  rounded-full ${skeletonStyle}`}></span>} </div>
          <div className="flex items-center space-x-1 rtl:space-x-reverse text-sm font-medium text-green-600">
            {/* <span>32k increase</span> */}
            {/* <svg
              className="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                clipRule="evenodd"
              />
            </svg> */}
          </div>
        </div>
      </div>
      
      <div style={style} className="relative p-6  rounded-e-2xl  shadow  border border-0 border-l-4 border-green-400 border-solid ">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 dark:text-gray-400">
            <span><FormattedMessage id='contractors-count' /></span>
          </div>
          <div className="text-3xl "> {data ? data.contractors_count : <span className={`inline-block w-10 h-2.5  rounded-full ${skeletonStyle}`}></span>} </div>
          <div className="flex items-center space-x-1 rtl:space-x-reverse text-sm font-medium text-red-600">
            {/* <span>3% decrease</span> */}
            {/* <svg
              className="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586 3.707 5.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z"
                clipRule="evenodd"
              />
            </svg> */}
          </div>
        </div>
      </div>


      <div style={style} className="relative p-6  rounded-e-2xl  shadow  border border-0 border-l-4 border-orange-400 border-solid ">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 dark:text-gray-400">
            <span><FormattedMessage id='total-price'/></span>
          </div>
          <div className="text-3xl ">{data ? data.total_price : <span className={`inline-block w-10 h-2.5  rounded-full ${skeletonStyle}`}></span>}  <sub className='text-xs font-semibold'><FormattedMessage id='egp' /></sub></div>
          <div className="flex items-center space-x-1 rtl:space-x-reverse text-sm font-medium text-green-600">
            {/* <span>7% increase</span> */}
            {/* <svg
              className="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                clipRule="evenodd"
              />
            </svg> */}
            
          </div>
        </div>
      </div>
  
    </div>
  </div>
  
  )
}

export default Cards