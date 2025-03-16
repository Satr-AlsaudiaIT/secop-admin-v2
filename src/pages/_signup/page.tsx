// import { Button, Form, Input, Checkbox, Layout, theme, Dropdown, Space, MenuProps, message, Card, Upload, AutoComplete } from "antd";
// import { useState } from "react";
// import LangSwitcher from "containers/layout/Topbar/LangSwitcher";
// import ThemesSwitcher from "containers/layout/Topbar/ThemesSwitcher";
// import authAction from "store/auth/actions";
// import profileActions from "store/profile/actions";
// import { useDispatch } from "react-redux";
// import middleware from "utlis/navigation/mw";
// import { useSelector } from "react-redux";
// import { LoggedUserCanNotOpen } from "middlewares";
// import axios from "utlis/library/helpers/axios";
// import { toast } from "react-hot-toast";
// import { FormattedMessage } from "react-intl";
// import { Typography } from "antd";
// import {
//   useQuery,
//   useMutation,
//   useQueryClient,
//   QueryClient,
//   QueryClientProvider,
// } from '@tanstack/react-query'
// import { permissionsTransform } from "utlis/library/helpers/permissions";
// import { useForm } from "antd/lib/form/Form";
// import SmallLogo from "components/LogoWraper/small-logo";
// import { Link, useNavigate } from "react-router-dom";
// import { jwtDecode } from 'jwt-decode';
// import { motion } from "framer-motion";
// import {
//   UploadOutlined,
// } from "@ant-design/icons";
// import { PhoneInput } from 'react-international-phone';
// import 'react-international-phone/style.css';

// import { PhoneNumberUtil } from 'google-libphonenumber';

// const phoneUtil = PhoneNumberUtil.getInstance();

// const isPhoneValid = (phone: string) => {
//   try {
//     return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
//   } catch (error) {
//     return false;
//   }
// };

// const { Title } = Typography;

// const { login } = authAction;
// const { fetchProfileDataSuccess } = profileActions;

// function Signup() {
//   const dispatch = useDispatch();
//   const { locale } = useSelector(
//     ({ LanguageSwitcher }: { LanguageSwitcher: ILanguageSwitcher }) =>
//       LanguageSwitcher.language
//   );




//   //   const onFinish = (values: any) => {
//   //   setLoading(true);
//   //   const myPromise = axios["post"]("/login", values);

//   //   // toast.promise(
//   //   //   myPromise,
//   //   //   {
//   //   //     loading: (
//   //   //       <div className="min-w-[200px]">
//   //   //         {locale === "ar" ? "جاري المعالجة " : "Pending"}
//   //   //       </div>
//   //   //     ),
//   //   //     success: (res) => {
//   //   //       setLoading(false);

//   //   //       return "Backend Message Error Occured";
//   //   //     },
//   //   //     error: (err) => {
//   //   //       setLoading(false);
//   //   //       return err.response?.data?.message || "Backend Error Occured";
//   //   //     },
//   //   //   },
//   //   //   {
//   //   //     style: {
//   //   //       minWidth: "250px",
//   //   //     },
//   //   //     success: {
//   //   //       duration: 3000,
//   //   //       icon: "🔥",
//   //   //     },
//   //   //   }
//   //   // );
//   // };

//   const onFinishFailed = (errorInfo: any) => {
//     // console.log("Failed:", errorInfo);
//   };

//   const [form] = useForm()
//   const navigate = useNavigate()
//   const mutation = useMutation({
//     mutationFn: (values) => axios["post"]("Operations/Registration", values),
//     onSuccess: (res) => {
//       const { message, data } = res.data;
//       const sentValues = mutation.variables as any

//       toast.success(message, {
//         position: "top-center",
//         duration: 5000,
//       });
//       // navigate('/login')
//       navigate(`/verify`, {
//         state: {
//           from: "signup",
//           email: sentValues.email,
//           phone: `${sentValues.countryCode}_${sentValues.mobileNumber}`
//         }
//       });

//     },
//     onError: (err) => {
//       const { data: { message } } = (err as any).response;



//       toast.error(message, {
//         position: "top-center",
//         duration: 5000,
//       });



//     }
//   })
//   const onFinish = (values: any) => {
//     const mobileNumber = values.mobileNumber
//     values.mobileNumber = mobileNumber.split("_")[1]
//     values.countryCode = mobileNumber.split("_")[0]
//     values.photo64 = values.photo64?.[0]?.thumbUrl.split(",")[1]
//     mutation.mutate(values)
//   }
//   return (
//     <div className="bg-texture-light dark:bg-texture-dark ">
//       <div className="box-border absolute inset-x-0 top-0 w-full flex items-center justify-between container mx-auto py-5 px-2">
//         <div className="brightness-90 flex items-center text-[#3730a3] no-underline hover:no-underline font-bold text-2xl lg:text-4xl">
//           <Link to={'/'} >
//           <img
//       className="w-10 h-auto"
//       src="/logo.png"
//       width={48}
//       height={73}
//       alt="Secop-admin"
//     />
//           </Link>          </div>
//         <ul className="flex gap-3 items-center">
//           <li className="isoUser flex">
//             <LangSwitcher />
//           </li>
//           <li className="isoUser">
//             <ThemesSwitcher />
//           </li>
//         </ul>
//       </div>

//       <div
//         className="h-[calc(100dvh)] overflow-auto box-border px-3 sm:px-6 py-8 mx-auto pt-[90px]"
//       >
//         <div className=" w-full flex flex-col items-center justify-center">

//           <motion.div
//             initial={{ y: -150, opacity: 1 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ type: "spring", stiffness: 100 }}
//             className="w-full max-w-md"
//           >

//             <Card

//               className=" w-full  rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0"
//             >
//               <div className="space-y-2 sm:p-2">
//                 <Title className="!text-xl font-bold leading-tight tracking-tight   md:!text-xl mt-0">
//                   <FormattedMessage id="register-new-account" />
//                 </Title>
//                 <Form
//                   layout="vertical"
//                   form={form}
//                   onFinish={onFinish}
//                   onFinishFailed={onFinishFailed}
//                   autoComplete="off"
//                 >

//                   <div className="flex gap-2">
//                     <Form.Item
//                       label={<FormattedMessage id="email" />}
//                       name="email"
//                       rules={[
//                         {
//                           type: "email",
//                           message: <FormattedMessage id="email" />,
//                         },
//                       ]}
//                     >
//                       <Input />
//                     </Form.Item>

//                     <Form.Item
//                       label={<FormattedMessage id="name" />}
//                       name="name"
//                       rules={[
//                         {
//                           required: true,
//                           message: <FormattedMessage id="name" />,
//                         },
//                       ]}
//                     >
//                       <Input />
//                     </Form.Item>
//                   </div>

//                   <div className="flex gap-2">

//                     <Form.Item
//                       label={<FormattedMessage id="userName" />}
//                       name="userName"
//                       rules={[
//                         {
//                           required: true,
//                           message: <FormattedMessage id="userName" />,
//                         },
//                       ]}
//                     >
//                       <Input />
//                     </Form.Item>
//                     <Form.Item
//                       label={<FormattedMessage id="password" />}
//                       name="password"
//                       rules={[
//                         {
//                           required: true,
//                           message: <FormattedMessage id="password" />,
//                         },
//                       ]}
//                     >
//                       <Input.Password />
//                     </Form.Item>
//                   </div>
//                   {/* <div className="flex gap-2">
// <Form.Item
//   label={<FormattedMessage id="contactEmail" />}
//   name="contactEmail"
//   rules={[
//     {
//       required: true,
//       message: <FormattedMessage id="contactEmail" />,
//     },
//   ]}
// >
//   <Input type="text"  />
// </Form.Item>

//                 <Form.Item
//                 label={<FormattedMessage id="address" />}
//                 name="address"
//                 rules={[
//                   {
//                     required: true,
//                     message: <FormattedMessage id="address" />,
//                   },
//                 ]}
//               >
//                 <Input type="text"  />
//               </Form.Item>
// </div>
//               <div className="flex gap-2">

//               <Form.Item
//                 label={<FormattedMessage id="latitude" />}
//                 name="latitude"
//                 rules={[
//                   {
//                     required: true,
//                     message: <FormattedMessage id="latitude" />,
//                   },
//                 ]}
//               >
//                 <Input type="text"  />
//               </Form.Item>
//               <Form.Item
//                 label={<FormattedMessage id="longitude" />}
//                 name="longitude"
//                 rules={[
//                   {
//                     required: true,
//                     message: <FormattedMessage id="longitude" />,
//                   },
//                 ]}
//               >
//                 <Input type="text"  />
//               </Form.Item>
//               </div>  */}
//                   <Form.Item
//                     getValueFromEvent={(phone, { country: { dialCode } }) => {
//                       return "" + dialCode + "_" + phone.slice(dialCode.length + 1);
//                     }}
//                     label={<FormattedMessage id="mobileNumber" />}
//                     name="mobileNumber"
//                     rules={[
//                       {
//                         required: true,
//                         message: <FormattedMessage id="mobileNumber" />,
//                       },
//                       {
//                         validator: async (_, phone) => {
//                           const phoneWithoutCode = phone.split("_")[1]
//                           const value = "+" + phone.split("_").join("")
//                           if (phoneWithoutCode) {
//                             if (!phone || !isPhoneValid(value)) {
//                               return Promise.reject(new Error('wrong number'));
//                             }
//                           }
//                         },
//                       }
//                     ]}
//                   >
//                     <PhoneInput
//                       defaultCountry="sa"
//                       inputStyle={{
//                         width: "100%"
//                       }}
//                       // value={phone}
//                       //  disableDialCodePrefill={false}
//                       // forceDialCode
//                       // prefix=''
//                       charAfterDialCode=""
//                     />
//                   </Form.Item>
//                   <Form.Item
//                     label={<FormattedMessage id="phoneNumber" />}
//                     name="phoneNumber"
//                     rules={[
//                       {
//                         required: true,
//                         message: <FormattedMessage id="phoneNumber" />,
//                       },
//                     ]}
//                   >
//                     <Input type="text" />
//                   </Form.Item>
//                   <div className="flex gap-2">

//                     {/* <Form.Item
//   label={<FormattedMessage id="phoneNumber" />}
//   name="phoneNumber"
//   rules={[
//     {
//       required: true,
//       message: <FormattedMessage id="phoneNumber" />,
//     },
//   ]}
// >
//   <Input type="text"  />
// </Form.Item> */}
//                     {/* <Form.Item
//   label={<FormattedMessage id="website" />}
//         name="website"
//         rules={[    {
//           required: true,
//           message: <FormattedMessage id="website" />,
//         },]}
//       >
//         <AutoComplete options={websiteOptions} onChange={onWebsiteChange}>
//           <Input />
//         </AutoComplete>
//       </Form.Item> */}
//                   </div>


//                   <Form.Item
//                     label={<FormattedMessage id="photo" />}
//                     name="photo64"
//                     valuePropName="fileList"
//                     rules={[
//                       {
//                         required: true,
//                         message: <FormattedMessage id="image" />,
//                       },
//                     ]}
//                     getValueProps={function (url) {
//                       return {
//                         fileList:
//                           typeof url === "string"
//                             ? url ? [
//                               {
//                                 uid: "-1",
//                                 name: "photo",
//                                 status: "done",
//                                 url: URL + "/" + url,
//                               },
//                             ] : []
//                             : url,
//                       };
//                     }}
//                     getValueFromEvent={(e) => {
//                       if (Array.isArray(e)) {
//                         return e;
//                       }
//                       return e && e.fileList;
//                     }}
//                   >
//                     <Upload
//                       maxCount={1}
//                       name="image"
//                       beforeUpload={(file) => {
//                         return false;
//                       }}
//                       listType="picture-card"
//                     >
//                       <Button type="text" icon={<UploadOutlined />}>
//                         <FormattedMessage id="upload" />
//                       </Button>
//                     </Upload>
//                   </Form.Item>

//                   <Form.Item>
//                     <Button
//                       type="primary"

//                       className="w-full"
//                       htmlType="submit"
//                       loading={mutation.isPending}
//                     >
//                       <FormattedMessage id="page.signUpButton" />
//                     </Button>
//                   </Form.Item>

//                   <div className="flex justify-end">

//                     <Link to="/login"><FormattedMessage id="signin.signToYourAccount" /></Link>
//                   </div>
//                 </Form>
//               </div>
//             </Card>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default middleware(Signup, [LoggedUserCanNotOpen]);
