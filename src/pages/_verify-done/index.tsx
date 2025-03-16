// import authAction from "store/auth/actions";
// import profileActions from "store/profile/actions";
// import Middleware from "utlis/navigation/mw";
// import { useSelector } from "react-redux";
// import {
//   FromSignupShouldBeLogined,
//   FromSignupShouldBeLoginedAndNotVerified,
//   LoggedUserCanNotOpen,
//   MakeSureFromDirection,
//   MakeSureTypeEmailOrPhone,
// } from "middlewares";
// import { Typography } from "antd";
// import { Link } from "react-router-dom";
// // import logo from "../../assets/logo.png";
// // import { t } from "components/lib/t";
// import { useNavigate } from "react-router-dom";

// const { Title } = Typography;

// const { login } = authAction;
// const { fetchProfileDataSuccess } = profileActions;

// function Verify() {
//   const navigate = useNavigate();

//   const { locale } = useSelector(
//     ({ LanguageSwitcher }: { LanguageSwitcher: ILanguageSwitcher }) =>
//       LanguageSwitcher.language
//   );

//   return (
//     <div className="flex justify-center">
//       <div className="px-10 flex flex-col gap-6 justify-center items-center min-h-screen w-screen max-w-[600px]">
//         <div className="flex flex-col justify-center items-center">
//           <Link to={"/"}>
//             {/* <img src={logo} alt="deblan" /> */}
//           </Link>
//           {/* <h1>{t("welcomeWord")}</h1> */}
//         </div>
//         <div className="border px-8 py-8 rounded-xl w-full">
//           <div className="flex justify-center m-4">
//             <svg
//               width="220"
//               height="240"
//               viewBox="0 0 220 240"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 fill-rule="evenodd"
//                 clip-rule="evenodd"
//                 d="M110 219.073C159.664 219.073 199.925 177.011 199.925 125.126C199.925 73.2412 159.664 31.18 110 31.18C60.3357 31.18 20.0749 73.2412 20.0749 125.126C20.0749 177.011 60.3357 219.073 110 219.073Z"
//                 stroke="#3AD29F"
//                 stroke-width="0.305962"
//                 stroke-dasharray="1.84 1.84"
//               />
//               <path
//                 fill-rule="evenodd"
//                 clip-rule="evenodd"
//                 d="M110 239C170.199 239 219 188.017 219 125.126C219 62.2348 170.199 11.2515 110 11.2515C49.801 11.2515 1 62.2348 1 125.126C1 188.017 49.801 239 110 239Z"
//                 stroke="#3AD29F"
//                 stroke-width="0.305962"
//                 stroke-dasharray="1.84 1.84"
//               />
//               <path
//                 d="M182.951 161.404C182.954 148.146 173.299 137.064 160.665 135.823C148.03 134.581 136.567 143.589 134.204 156.615L58.6337 154.474L59.4633 168.037C59.4633 168.037 48.6875 194.013 105.322 200.934V227.189H170.795V183.537C178.318 178.935 182.944 170.512 182.951 161.404Z"
//                 fill="url(#paint0_linear_1090_1302)"
//               />
//               <path
//                 d="M62.0584 168.607C62.0584 168.607 51.7398 193.482 105.976 200.119V225.272H168.679V158.659L61.2531 155.616L62.0584 168.607Z"
//                 fill="#FFCBB4"
//               />
//               <path
//                 d="M93.3957 64.8009C89.9922 70.4118 82.8902 72.0979 77.4999 68.5746L43.834 45.398C38.4633 41.8423 36.8494 34.4227 40.2219 28.7914C43.6249 23.1882 50.7178 21.503 56.1056 25.0177L89.7715 48.1943C95.1465 51.7459 96.7659 59.1663 93.3957 64.8009Z"
//                 fill="url(#paint1_linear_1090_1302)"
//               />
//               <path
//                 d="M91.5303 63.5354C88.3666 68.7508 81.7653 70.3181 76.7548 67.0433L45.4506 45.4831C40.4584 42.178 38.9582 35.2814 42.0928 30.0469C45.2564 24.8314 51.8578 23.2641 56.8683 26.5389L88.1664 48.0864C93.1682 51.39 94.672 58.2965 91.5303 63.5354Z"
//                 fill="#FFCBB4"
//               />
//               <path
//                 d="M156.776 186.852C169.781 186.852 180.323 175.838 180.323 162.252C180.323 148.666 169.781 137.652 156.776 137.652C143.771 137.652 133.229 148.666 133.229 162.252C133.229 175.838 143.771 186.852 156.776 186.852Z"
//                 fill="#FFCBB4"
//               />
//               <path
//                 d="M152.537 0.000175476H62.3339C60.2855 0.000175476 58.6249 1.73502 58.6249 3.87506V180.209C58.6249 182.349 60.2855 184.084 62.3339 184.084H152.537C154.586 184.084 156.246 182.349 156.246 180.209V3.87506C156.246 1.73502 154.586 0.000175476 152.537 0.000175476Z"
//                 fill="url(#paint2_linear_1090_1302)"
//               />
//               <path
//                 d="M150.793 2.4896H64.0716C61.7907 2.4896 59.9417 4.4213 59.9417 6.80417V177.287C59.9417 179.67 61.7907 181.601 64.0716 181.601H150.793C153.074 181.601 154.923 179.67 154.923 177.287V6.80417C154.923 4.4213 153.074 2.4896 150.793 2.4896Z"
//                 fill="white"
//               />
//               <path
//                 d="M131.295 6.98148C130.727 10.9064 127.503 13.8118 123.704 13.8234H90.9009C87.1026 13.8102 83.8809 10.9052 83.3133 6.98148H65.9339C64.977 6.98148 64.059 7.37719 63.382 8.08379C62.7051 8.7904 62.3248 9.74912 62.3248 10.7488V173.336C62.3248 174.336 62.7035 175.295 63.3799 176.002C64.0563 176.709 64.9739 177.107 65.9309 177.107H148.934C149.891 177.107 150.809 176.711 151.486 176.004C152.163 175.298 152.543 174.339 152.543 173.339V10.752C152.543 9.75228 152.165 8.79323 151.488 8.08603C150.812 7.37883 149.894 6.98148 148.937 6.98148H131.295Z"
//                 fill="#E9ECFF"
//               />
//               <path
//                 d="M117.545 9.12292H97.5891C97.2547 9.12292 96.9836 9.40616 96.9836 9.75555V9.87259C96.9836 10.222 97.2547 10.5052 97.5891 10.5052H117.545C117.88 10.5052 118.151 10.222 118.151 9.87259V9.75555C118.151 9.40616 117.88 9.12292 117.545 9.12292Z"
//                 fill="#DBDBDB"
//               />
//               <path
//                 d="M122.647 10.7066C123.192 10.7066 123.634 10.2452 123.634 9.67603C123.634 9.10688 123.192 8.64549 122.647 8.64549C122.102 8.64549 121.661 9.10688 121.661 9.67603C121.661 10.2452 122.102 10.7066 122.647 10.7066Z"
//                 fill="#DBDBDB"
//               />
//               <path
//                 d="M171.997 166.592C165.163 168.243 160.473 163.587 158.893 156.451L143.19 95.5375C141.628 88.3737 145.896 81.2362 152.743 79.5604C159.6 77.9282 166.432 82.3865 168.036 89.5402L180.85 152.026C182.43 159.165 178.827 164.941 171.997 166.592Z"
//                 fill="url(#paint3_linear_1090_1302)"
//               />
//               <path
//                 d="M166.275 91.031C164.942 85.0072 159.188 81.2522 153.422 82.644C147.656 84.0358 144.062 90.0474 145.394 96.0712L159.833 161.357C161.165 167.381 166.919 171.136 172.685 169.744C178.451 168.352 182.046 162.34 180.713 156.317L166.275 91.031Z"
//                 fill="#FFCBB4"
//               />
//               <path
//                 d="M180.223 217.041H90.601V238.867H180.223V217.041Z"
//                 fill="url(#paint4_linear_1090_1302)"
//               />
//               <path
//                 d="M177.801 219.572H93.0234V236.653H177.801V219.572Z"
//                 fill="#BD5ABF"
//               />
//               <path
//                 d="M80.3277 130.146C76.9655 135.69 69.9484 137.356 64.6226 133.875L42.0445 118.613C36.7376 115.1 35.1426 107.769 38.4747 102.205C41.8369 96.6611 48.854 94.9948 54.1798 98.4759L76.7579 113.738C82.0648 117.251 83.6598 124.582 80.3277 130.146Z"
//                 fill="url(#paint5_linear_1090_1302)"
//               />
//               <path
//                 d="M74.6598 162.452C71.2676 168.047 64.1866 169.729 58.8124 166.216L44.8271 155.562C39.4715 152.018 37.8616 144.621 41.224 139.006C44.6162 133.411 51.6971 131.729 57.0714 135.242L71.0567 145.899C76.4104 149.442 78.0201 156.838 74.6598 162.452Z"
//                 fill="url(#paint6_linear_1090_1302)"
//               />
//               <g opacity="0.5">
//                 <path
//                   d="M107.432 120.495C122.472 120.495 134.664 107.757 134.664 92.0451C134.664 76.3328 122.472 63.5955 107.432 63.5955C92.3927 63.5955 80.2006 76.3328 80.2006 92.0451C80.2006 107.757 92.3927 120.495 107.432 120.495Z"
//                   fill="url(#paint7_linear_1090_1302)"
//                 />
//               </g>
//               <path
//                 d="M107.433 118.821C121.588 118.821 133.063 106.833 133.063 92.0451C133.063 77.257 121.588 65.2688 107.433 65.2688C93.2776 65.2688 81.8026 77.257 81.8026 92.0451C81.8026 106.833 93.2776 118.821 107.433 118.821Z"
//                 fill="#69F0AE"
//               />
//               <path
//                 d="M73.5303 161.657C70.3666 166.873 63.7652 168.44 58.7547 165.165L45.7111 155.246C40.7189 151.941 39.2187 145.044 42.3533 139.809C45.5169 134.594 52.1183 133.027 57.1288 136.301L70.1694 146.24C75.1517 149.543 76.652 156.426 73.5303 161.657Z"
//                 fill="#FFCBB4"
//               />
//               <path
//                 d="M79.0865 129.308C75.9228 134.524 69.3215 136.091 64.3109 132.816L43.0681 118.455C38.0759 115.15 36.5757 108.254 39.7102 103.019C42.8739 97.8037 49.4753 96.2364 54.4858 99.5112L75.7287 113.872C80.7209 117.177 82.2211 124.074 79.0865 129.308Z"
//                 fill="#FFCBB4"
//               />
//               <path
//                 d="M86.1654 97.9923C82.7866 103.561 75.7379 105.234 70.3876 101.738L41.7751 82.2745C36.445 78.7447 34.8434 71.3807 38.1902 65.7912C41.569 60.2227 48.6177 58.5495 53.968 62.046L82.5805 81.509C87.9107 85.0389 89.5122 92.4028 86.1654 97.9923Z"
//                 fill="url(#paint8_linear_1090_1302)"
//               />
//               <path
//                 d="M84.6453 96.9798C81.4816 102.195 74.8802 103.762 69.8697 100.488L43.0709 82.2584C38.0787 78.9532 36.5785 72.0566 39.7131 66.8221C42.8767 61.6066 49.4781 60.0393 54.4886 63.3141L81.2844 81.5435C86.2777 84.8476 87.7793 91.7444 84.6453 96.9798Z"
//                 fill="#FFCBB4"
//               />
//               <g clip-path="url(#clip0_1090_1302)">
//                 <path
//                   d="M116.277 81.9539H114.756V78.9045C114.756 74.6963 111.347 71.2809 107.147 71.2809C102.946 71.2809 99.5374 74.6963 99.5374 78.9045V81.9539H98.0156C96.3416 81.9539 94.972 83.3262 94.972 85.0034V100.251C94.972 101.928 96.3416 103.3 98.0156 103.3H116.277C117.951 103.3 119.321 101.928 119.321 100.251V85.0034C119.321 83.3262 117.951 81.9539 116.277 81.9539ZM107.147 95.6764C105.473 95.6764 104.103 94.3042 104.103 92.627C104.103 90.9498 105.473 89.5775 107.147 89.5775C108.821 89.5775 110.19 90.9498 110.19 92.627C110.19 94.3042 108.821 95.6764 107.147 95.6764ZM102.581 81.9539V78.9045C102.581 76.3735 104.62 74.3303 107.147 74.3303C109.673 74.3303 111.712 76.3735 111.712 78.9045V81.9539H102.581Z"
//                   fill="white"
//                 />
//               </g>
//               <defs>
//                 <linearGradient
//                   id="paint0_linear_1090_1302"
//                   x1="120.797"
//                   y1="227.205"
//                   x2="120.797"
//                   y2="135.713"
//                   gradientUnits="userSpaceOnUse"
//                 >
//                   <stop stop-color="#808080" stop-opacity="0.25" />
//                   <stop
//                     offset="0.54"
//                     stop-color="#808080"
//                     stop-opacity="0.12"
//                   />
//                   <stop offset="1" stop-color="#808080" stop-opacity="0.1" />
//                 </linearGradient>
//                 <linearGradient
//                   id="paint1_linear_1090_1302"
//                   x1="66.8058"
//                   y1="70.4187"
//                   x2="66.8058"
//                   y2="23.1799"
//                   gradientUnits="userSpaceOnUse"
//                 >
//                   <stop stop-color="#808080" stop-opacity="0.25" />
//                   <stop
//                     offset="0.54"
//                     stop-color="#808080"
//                     stop-opacity="0.12"
//                   />
//                   <stop offset="1" stop-color="#808080" stop-opacity="0.1" />
//                 </linearGradient>
//                 <linearGradient
//                   id="paint2_linear_1090_1302"
//                   x1="107.436"
//                   y1="184.081"
//                   x2="107.436"
//                   y2="-0.00298454"
//                   gradientUnits="userSpaceOnUse"
//                 >
//                   <stop stop-color="#808080" stop-opacity="0.25" />
//                   <stop
//                     offset="0.54"
//                     stop-color="#808080"
//                     stop-opacity="0.12"
//                   />
//                   <stop offset="1" stop-color="#808080" stop-opacity="0.1" />
//                 </linearGradient>
//                 <linearGradient
//                   id="paint3_linear_1090_1302"
//                   x1="162.041"
//                   y1="166.921"
//                   x2="162.041"
//                   y2="79.2187"
//                   gradientUnits="userSpaceOnUse"
//                 >
//                   <stop stop-color="#808080" stop-opacity="0.25" />
//                   <stop
//                     offset="0.54"
//                     stop-color="#808080"
//                     stop-opacity="0.12"
//                   />
//                   <stop offset="1" stop-color="#808080" stop-opacity="0.1" />
//                 </linearGradient>
//                 <linearGradient
//                   id="paint4_linear_1090_1302"
//                   x1="135.418"
//                   y1="238.86"
//                   x2="135.418"
//                   y2="217.035"
//                   gradientUnits="userSpaceOnUse"
//                 >
//                   <stop stop-color="#808080" stop-opacity="0.25" />
//                   <stop
//                     offset="0.54"
//                     stop-color="#808080"
//                     stop-opacity="0.12"
//                   />
//                   <stop offset="1" stop-color="#808080" stop-opacity="0.1" />
//                 </linearGradient>
//                 <linearGradient
//                   id="paint5_linear_1090_1302"
//                   x1="59.3967"
//                   y1="135.694"
//                   x2="59.3967"
//                   y2="96.6603"
//                   gradientUnits="userSpaceOnUse"
//                 >
//                   <stop stop-color="#808080" stop-opacity="0.25" />
//                   <stop
//                     offset="0.54"
//                     stop-color="#808080"
//                     stop-opacity="0.12"
//                   />
//                   <stop offset="1" stop-color="#808080" stop-opacity="0.1" />
//                 </linearGradient>
//                 <linearGradient
//                   id="paint6_linear_1090_1302"
//                   x1="57.9434"
//                   y1="168.05"
//                   x2="57.9434"
//                   y2="133.404"
//                   gradientUnits="userSpaceOnUse"
//                 >
//                   <stop stop-color="#808080" stop-opacity="0.25" />
//                   <stop
//                     offset="0.54"
//                     stop-color="#808080"
//                     stop-opacity="0.12"
//                   />
//                   <stop offset="1" stop-color="#808080" stop-opacity="0.1" />
//                 </linearGradient>
//                 <linearGradient
//                   id="paint7_linear_1090_1302"
//                   x1="107.432"
//                   y1="120.495"
//                   x2="107.432"
//                   y2="63.5923"
//                   gradientUnits="userSpaceOnUse"
//                 >
//                   <stop stop-color="#808080" stop-opacity="0.25" />
//                   <stop
//                     offset="0.54"
//                     stop-color="#808080"
//                     stop-opacity="0.12"
//                   />
//                   <stop offset="1" stop-color="#808080" stop-opacity="0.1" />
//                 </linearGradient>
//                 <linearGradient
//                   id="paint8_linear_1090_1302"
//                   x1="62.1763"
//                   y1="103.575"
//                   x2="62.1763"
//                   y2="60.2304"
//                   gradientUnits="userSpaceOnUse"
//                 >
//                   <stop stop-color="#808080" stop-opacity="0.25" />
//                   <stop
//                     offset="0.54"
//                     stop-color="#808080"
//                     stop-opacity="0.12"
//                   />
//                   <stop offset="1" stop-color="#808080" stop-opacity="0.1" />
//                 </linearGradient>
//                 <clipPath id="clip0_1090_1302">
//                   <rect
//                     width="36.5236"
//                     height="36.5933"
//                     fill="white"
//                     transform="translate(88.8848 69.756)"
//                   />
//                 </clipPath>
//               </defs>
//             </svg>
//           </div>
//           <h2 className="font-bold mb-4 text-center">{t("tm-althqq")}</h2>

//           <h3 className="text-sm text-center mb-4">
//             {t("tm-althqq-mn-hsabk-bnjah")}
//           </h3>

//           <button onClick={()=>navigate('/profile')}  className={`w-full  text-center `}>
//             <p className={`bg-brand-primary text-white rounded-md py-3`}>
//               <span className="mx-1">{t("astmrar")}</span>
//             </p>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Middleware(Verify,[FromSignupShouldBeLogined]);
