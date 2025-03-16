import { Button, Form, Input, Checkbox, Layout, theme, Dropdown, Space, MenuProps, message, Spin, Select, Card, Radio, Divider } from "antd";
import { useEffect, useLayoutEffect, useState } from "react";
import LangSwitcher from "containers/layout/Topbar/LangSwitcher";
import ThemesSwitcher from "containers/layout/Topbar/ThemesSwitcher";
import authAction from "store/auth/actions";
import profileActions from "store/profile/actions";
import { useDispatch } from "react-redux";
import Middleware from "utlis/navigation/mw";
import { useSelector } from "react-redux";
import { ValidateVerifyState } from "middlewares";
import { toast } from "react-hot-toast";
import { FormattedMessage } from "react-intl";
import { Typography } from "antd";
import { permissionsTransform } from "utlis/library/helpers/permissions";
import { Link, redirect, useLocation, useParams, useRoutes } from "react-router-dom";
// import axios from "components/lib/axios";
// import { t } from "components/lib/t";
import { useNavigate } from "react-router-dom";
import { useForm } from "antd/lib/form/Form";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "utlis/library/helpers/axios";
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import animationData from 'lottiefiles/send-message.json';
import Lottie from 'react-lottie';


import { PhoneNumberUtil } from 'google-libphonenumber';
import { motion } from "framer-motion";
import maskEmailsPhones from "mask-email-phone";

const phoneUtil = PhoneNumberUtil.getInstance();

const isPhoneValid = (phone: string) => {
  try {
    return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
  } catch (error) {
    return false;
  }
};

const { Title ,Text ,Paragraph } = Typography;


function Verify() {

  
  const t = (t) => <FormattedMessage id={t} />
  const navigate = useNavigate();
  let location = useLocation();
  const { from, phone, email } = location.state;
  const { locale } = useSelector(
    ({ LanguageSwitcher }: { LanguageSwitcher: ILanguageSwitcher }) =>
      LanguageSwitcher.language
  );


  const [loading, setLoading] = useState(false);
  const [type, setType] = useState('phone');
  const [start , setStart] = useState(false);
  const [state , setState] = useState({});

  const onFinish = (values: any) => {
    values.usage = "General"
    if (type === "phone") {
      const phoneNumber = values.phoneNumber
      values.contactMethod = "ByPhone"
      if (phoneNumber) {
        values.phoneNumber = phoneNumber.split("_")[1]
        values.countryCode = phoneNumber.split("_")[0]
      }
    }
    if (type === "email") {
      values.contactMethod = "ByEmail"
    }

    setLoading(true);
    const myPromise = axios["post"]("OTP/Generate", values, {
      headers: {
        // "X-Portal": "dashboard",
      },
    });
    toast.promise(
      myPromise,
      {
        loading: (
          <div className="min-w-[200px]">
            {locale === "ar" ? "جاري المعالجة " : "Pending"}
          </div>
        ),
        success: (res) => {
          setLoading(false);
          setStart(true)
          const { message, data } = res.data;
      //     navigate(`/otp`,
      //  {
      //   state:{
      //     type ,
      //     from ,
      //     value:type === "phone" ? `${values.countryCode}_${values.phoneNumber}` : values.email
      //   }
      //  }
      //     );

      setStart(true)

      setTimeout(() => {
            
        navigate(`/otp`,
     {
      state:{
        type ,
        from ,
        value:type === "phone" ? `${values.countryCode}_${values.phoneNumber}` : values.email
      }
     }
        );    //toClear
      }, 4000);


          return message  || "Backend Message Error Occured";
        },
        error: (err) => {

          setLoading(false);

          
          
          return err.response?.data?.message || "Backend Error Occured";
        },
      },
      {
        style: {
          minWidth: "250px",
        },
        success: {
          duration: 3000,
          icon: "🔥",
        },
      }
    );
  };
  const [form] = useForm()
  useEffect(() => {
    // when back phone component no set phone inside input untill i use settimeout 
    // its phine input issue
  const timeOut=setTimeout(() => {
      form.setFieldsValue({
        phoneNumber: phone, email
      })
    }, 0);
    return()=>clearTimeout((timeOut))
  },[])
  // useEffect(() => {
  //   const unlisten = window.history!.listen((location, action) => {
  //     if (action === 'POP') {
  //       // Handle back navigation here
  //       // Your logic to execute when navigating back
  //       console.log('Back navigation detected');
  //     }
  //   });

  //   return () => {
  //     unlisten();
  //   };
  // }, [history]);
  const defaultOptions = {
    loop: false,
    autoplay: false,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };


  return (
    <div className="bg-texture-light dark:bg-texture-dark">
     
     
      <div className="box-border absolute inset-x-0 top-0 w-full flex items-center justify-between container mx-auto py-5 px-2">
        <div className="brightness-90 flex items-center text-[#3730a3] no-underline hover:no-underline font-bold text-2xl lg:text-4xl">
          <Link to={'/'} >
          <img
      className="w-10 h-auto"
      src="/logo.png"
      width={48}
      height={73}
      alt="Secop-admin"
    />
          </Link>          </div>
        <ul className="flex gap-3 items-center">
          <li className="isoUser flex">
            <LangSwitcher />
          </li>
          <li className="isoUser">
            <ThemesSwitcher />
          </li>
        </ul>
      </div>

      <div
        className="min-h-[100dvh] box-border w-full flex flex-col items-center justify-center px-3 sm:px-6 py-8 mx-auto lg:py-0"
      >
        <motion.div
          initial={{ y: -150, opacity: 1 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="w-full max-w-md"
        >

          <Card

            className=" w-full  rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0"
          >
                        <div className="-mt-4">


              <Lottie 
        isPaused={!start}

	    options={defaultOptions}
        height={150}
        width={150}
      
      />
                  </div>

            <div className="space-y-4 ">
              <Title className="text-center !text-xl font-bold leading-tight tracking-tight   md:!text-2xl ">
                <FormattedMessage id="choose-a-way-to-verify" />
              </Title>
              <Form
                form={form}
                onFinish={onFinish} layout="vertical" className="w-full">

<style>{`
  input[type="radio"]:checked + .background {
    background-color:#e8f0fe;
  }
   .dark input[type="radio"]:checked + .background {
    background-color:#222;
  }
`}</style>



  <dl>
    <div className="relative  z-10 px-2 py-2">
    <label className="absolute cursor-pointer h-full w-[calc(100%_+_3rem)] top-0 -left-[1.5rem] -right-[1.5rem]  z-10" htmlFor="phone"></label>
    <input onClick={(e)=>setType(e.currentTarget.value)} className="hidden" checked={type==="phone"}  type="radio" name="type" id="phone" value={"phone"}/>
    <div className="absolute -z-10 background transition duration-200 h-full w-[calc(100%_+_3rem)] top-0 -left-[1.5rem] -right-[1.5rem] rounded-sm "></div>
  <dt>
    <h4 className="mb-1 mt-1">
    <FormattedMessage id="use-a-phone-to-verify" />
      </h4>
  </dt>
  <dd className="opacity-60 ms-2"> <FormattedMessage id="we-will-send-a-text-message-to" />  {maskEmailsPhones("+"+phone.split("_").join(""))}.</dd>
    </div>


    <Divider className="my-0"/>

    <div className="relative  z-10 px-2 py-2">
    <label className="absolute cursor-pointer h-full w-[calc(100%_+_3rem)] top-0 -left-[1.5rem] -right-[1.5rem]  z-10" htmlFor="email"></label>
    <input className="hidden" onClick={(e)=>setType(e.currentTarget.value)} type="radio" checked={type==="email"}  name="type" id="email" value={'email'}/>
    <div className="absolute -z-10 background transition duration-200 h-full w-[calc(100%_+_3rem)] top-0 -left-[1.5rem] -right-[1.5rem] rounded-sm "></div>

  <dt>
  <h4 className="mb-1 mt-1"> <FormattedMessage id="use-an-email-to-verify" /></h4>

  </dt>
  <dd className="opacity-60 ms-2"><FormattedMessage id="we-will-send-a-text-message-to" />  {maskEmailsPhones(email)}.</dd>
    </div>
    <Divider className="my-2"/>

</dl>
{/* 
<Radio.Group className="w-full" onChange={e=>setType(e.target.value)} value={type}>
        <Radio value={'phone'}>

          <Paragraph >
            
            </Paragraph>
          </Radio>
            <Text>sdsd</Text>
        <Divider/>

        <Radio value={'email'}>Use Email</Radio>
        <Divider/>

    </Radio.Group> */}

                {/* <Form.Item
                  label={<FormattedMessage id="verify-by" />}

                >
                  <Select value={type} onChange={setType}>
                    <Select.Option value={"email"}><FormattedMessage id="email" /></Select.Option>
                    <Select.Option value={"phone"}><FormattedMessage id="phone" /></Select.Option>
                  </Select>                </Form.Item> */}
             
                {type === 'email' ? <>


                  <Form.Item
                  hidden
                    label={<FormattedMessage id="email" />}
                    name="email"
                    rules={[
                      {
                        type: "email",
                        message: <FormattedMessage id="email" />,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </>
                  : ""}

                {type === 'phone' ?
        <Form.Item
        hidden
   
                getValueFromEvent={(phone, { country: { dialCode } }) => {
                  return "" + dialCode + "_" + phone.slice(dialCode.length + 1);
                }}
                label={<FormattedMessage id="phoneNumber" />}
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="phoneNumber" />,
                  },
                  {
                    validator: async (_, phone) => {
                      const phoneWithoutCode = phone.split("_")[1]
                      const value = "+" + phone.split("_").join("")
                      if (phoneWithoutCode) {
                        if (!phone || !isPhoneValid(value)) {
                          return Promise.reject(new Error('wrong number'));
                        }
                      }
                    },
                  }
                ]}
              >
                <PhoneInput
                key={Math.random()}
                  defaultCountry="sa"
                  inputStyle={{
                    width: "100%"
                  }}
                  // value={phone}
                  //  disableDialCodePrefill={false}
                  // forceDialCode
                  // prefix=''
                  charAfterDialCode=""
                />
              </Form.Item>
    
             
        
                  : ""}


                <Form.Item className="mt-10">
                  <Button
                    disabled={loading}
                    // type="submit"
                    size="large"
                    className="w-full"
                    type="primary"
                    htmlType="submit"
                  >
                    {t('global.submit')}
                    <Spin
                      indicator={
                        <LoadingOutlined style={{ fontSize: 20, color: "#fff" }} />
                      }
                      spinning={loading}
                    />
                  </Button>

                </Form.Item>
              </Form>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

export default Middleware(Verify, [
  ValidateVerifyState 
  // ,  FromSignupShouldBeLoginedAndNotVerified
]);


