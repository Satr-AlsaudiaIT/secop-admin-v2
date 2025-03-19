import { useState, Fragment } from "react";
import { Link, json, useLoaderData, useNavigate, useNavigation } from "react-router-dom";
import { AnimatePresence, motion } from 'framer-motion'
import LangSwitcher from "containers/layout/Topbar/LangSwitcher";
import ThemesSwitcher from "containers/layout/Topbar/ThemesSwitcher";
import { routes } from "../routers/index";
import { Button, Card } from "antd";
import { useSelector } from "react-redux";
import SmallLogo from "components/LogoWraper/small-logo";
import { FormattedMessage } from "react-intl";

function Index() {

  const data = useLoaderData();
  console.log(data);
  const [visiable, setVisiable] = useState(true);
 
const navigate = useNavigate()
//   function y(el , isLastChild) {
//     return (
    
//         <li
//              onClick={(e) => {
//               e.stopPropagation();
//               setActive(el.key);
//             }}
//             className={`${active === el.key ? "bg-gray-300" : ""} relative `}>
                   
//              {!isLastChild&& <div className="absolute -z-10 h-[calc(100%)] w-[2px] bg-blue-400 ltr:-left-4 rtl:-right-4 bottom-0 "></div>}
//           <div className="relative  inline-block ">
//           <h1 className="text-sm px-4 py-1 rounded-lg bg-[skyblue] ">{el.meta.routeName}   
          
         
//           </h1>
//             <div
//             className="absolute -z-10 h-[calc(100%)] w-[2px] bg-blue-400 ltr:-left-4 rtl:-right-4  top-0 -translate-y-1/2 "></div>
//           <div className="absolute h-[2px] w-4 bg-blue-400 ltr:-left-4 rtl:-right-4  top-1/2 "></div>
//           </div>
// <ul 

// className={`px-8  `}>

//         {el.children &&
//           el.children
//             .sort((a, b) => (a.children ? 1 : -1) - (b.children ? 1 : -1))
//             .map((element, index) => (
//               <Fragment key={element.key}>{y(element , el?.children.length-1 === index)}</Fragment>
//             ))}
// </ul>
//         </li>
//     );
//   }

return (
  <div className="bg-texture-light dark:bg-texture-dark">
    <div className="box-border min-w-screen min-h-screen  flex items-center container mx-auto justify-center px-2 py-5">
      <div className="box-border absolute inset-x-0 top-0 w-full flex items-center justify-between container mx-auto py-5 px-2">
        <div className="brightness-90 flex items-center text-[#3730a3] no-underline hover:no-underline font-bold text-2xl lg:text-4xl">
          <Link to={"/"}>
            <img
              className="w-10 h-auto"
              src="/logo.png"
              width={48}
              height={73}
              alt="Secop-admin"
            />
          </Link>
        </div>
        <ul className="flex gap-3 items-center">
          <li className="isoUser flex">
            <LangSwitcher />
          </li>
          <li className="isoUser">
            <ThemesSwitcher />
          </li>
        </ul>
      </div>
      <motion.div
        initial={{ y: -150, opacity: 1 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="w-full max-w-sm"
      >
        <Card className="box-border  rounded-3xl shadow-lg  text-gray-600 sm:px-4 py-3">
          <div className="overflow-hidden relative">
            <div className="overflow-hidden relative cursor-grab">
              <div className="flex gap-2 flex-col sm:gap-4 justify-center items-center">
                <img
                  className="w-36 py-3 sm:py-0  h-auto"
                  src="/e-logo.png"
                  alt="Secop admin"
                />
                <AnimatePresence>
                  {visiable && (
                    <motion.div
                      className="flex justify-center w-[128px]"
                      // animate={{width:165 }}
                      transition={{ duration: 0.6 }}
                      exit={{ width: 0, scale: 0, opacity: 0 }}
                    >
                      <Button
                        onClick={() => {
                          setVisiable(false);
                          setTimeout(() => {
                            navigate("/dashboard");
                          }, 600);
                        }}
                        className="rounded-lg !h-auto w-auto whitespace-normal py-2"
                        size="large"
                        type="primary"
                      >
                        <FormattedMessage id="open-administrator" />
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  </div>
);


  // return (
  //   <div className="card p-4 overflow-y-auto overflow-x-hidden h-screen">
  //    <ul>
      
  //      {y(routes[0] , true)}
  //     </ul>
  //     {/* <OrganizationChart selectionMode="multiple" value={[x(routes[0])]} nodeTemplate={nodeTemplate} /> */}
  //   </div>
  // );
}

export default Index;

export const loader = () => {
  console.log("welcome from loader");
  return json(
    {
      sorry: "You have been fired.",
      hrEmail: "hr@bigco.com",
    },
    { status: 401, statusText: "u are not authorized" }
  );
};
