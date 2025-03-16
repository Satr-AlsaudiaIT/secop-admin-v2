import {
  Button,
  Form,
  Input,
  Checkbox,
  Layout,
  theme,
  Dropdown,
  Space,
  MenuProps,
  message,
  Spin,
  Card,
} from "antd";
import { useEffect, useLayoutEffect, useState } from "react";
import LangSwitcher from "containers/layout/Topbar/LangSwitcher";
import ThemesSwitcher from "containers/layout/Topbar/ThemesSwitcher";
import authAction from "store/auth/actions";
import profileActions from "store/profile/actions";
import { useDispatch } from "react-redux";
import Middleware from "utlis/navigation/mw";
import { useSelector } from "react-redux";
// import {
//   FromSignupShouldBeLoginedAndNotVerified,
//   LoggedUserCanNotOpen,
//   MakeSureFromDirection,
//   MakeSureTypeEmailOrPhone,
// } from "middlewares";
import { toast } from "react-hot-toast";
import { FormattedMessage } from "react-intl";
import { Typography } from "antd";
import { permissionsTransform } from "utlis/library/helpers/permissions";
import { Link, redirect, useLocation, useParams, useRoutes } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { useForm } from "antd/lib/form/Form";
import OtpInput from "react-otp-input";
import Countdown from "react-countdown";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "utlis/library/helpers/axios";
import { motion } from "framer-motion";
import { ValidateOtpState } from "middlewares";
import maskEmailsPhones from "mask-email-phone";
import animationData from 'lottiefiles/otp.json';
import Lottie from 'react-lottie';
const { Title,Text } = Typography;

const TIME_COUNT = 40_000;
const OTP_LENGTH = 6
function Otp() {
  const navigate = useNavigate();
  let location = useLocation();
  const { type, value } = location.state;
  const [otp, setOtp] = useState("");
  const [time, setIsTimeOut] = useState(Date.now());


  const { locale } = useSelector(
    ({ LanguageSwitcher }: { LanguageSwitcher: ILanguageSwitcher }) =>
      LanguageSwitcher.language
  );

  const [loading, setLoading] = useState(false);
  const [sendLoader, setSendLoader] = useState(false);

  const verifyOtp = () => {
    let values: { [key: string]: string } = {
      usage: "General",
      value: otp,
    }
    if (type === "phone") {
      values.contactMethod = "ByPhone"
      if (value) {
        values.phoneNumber = value.split("_")[1]
        values.countryCode = value.split("_")[0]
      }
    }
    if (type === "email") {
      values.contactMethod = "ByEmail";
      values.email = value
    }


    setLoading(true);
    const myPromise = axios["post"](
      `OTP/Validate`,
      values,
      {
        headers: {
          // "X-Portal": "dashboard",
        },
      }
    );

    toast.promise(
      myPromise,
      {
        loading: (
          <div className="min-w-[200px]">
            {locale === "ar" ? "جاري المعالجة " : "Pending"}
          </div>
        ),
        success: (res: any) => {
          setLoading(false);
          const { message } = res.data;

          // if (from === "signup") {
          //   const {  data:{customer , token} } = res.data;
          //   dispatch(login(token , '/dashboard'));
          //   dispatch(fetchProfileDataSuccess(customer));
          //   navigate("/verify-done" , {state:{isDone:true}});
          // } else if (from === "forgot") {
          //   navigate(`/reset-password`, {
          //     state: {
          //       otp_code: otp,
          //       [type]: value,
          //       type,
          //     },
          //   });
          // }
          return message || "Backend Message Error Occured";
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

  const onFinish = (values: any) => {
    values.usage = "General"
    if (type === "phone") {
      values.contactMethod = "ByPhone"
      const phoneNumber = values.phone
      delete values.phone
      if (phoneNumber) {
        values.phoneNumber = phoneNumber.split("_")[1]
        values.countryCode = phoneNumber.split("_")[0]
      }
    }
    if (type === "email") {
      values.contactMethod = "ByEmail"
    }
    // setLoading(true);
    setSendLoader(true);
    axios["post"]("OTP/Generate", values, {
      headers: {
        // "X-Portal": "dashboard",
      },
    })
      .then((res) => {
        setSendLoader(false);
        setIsTimeOut(Date.now() + TIME_COUNT);
      })
      .catch((err) => {
        setSendLoader(false);
        // setIsTimeOut(Date.now() + TIME_COUNT);
        const { data: { message } } = (err as any).response;

        toast.error(message, {
          position: "top-center",
          duration: 5000,
        });

        // setIsTimeOut(false)
      });
  };
  const [form] = useForm();
  useEffect(() => {
    form.setFieldsValue({
      [type]: value,
    });
  }, []);
  useEffect(() => {
    if (otp.length === OTP_LENGTH) {
      verifyOtp();
    }
  }, [otp]);

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  useEffect(()=>{
    if ('OTPCredential' in window) {
        const ac = new AbortController();
     const x:any= navigator.credentials
        x.get({
          otp: { transport:['sms'] },
          signal: ac.signal
        }).then(otp => {
          // input.value = otp.code;
          console.log({otp})
setOtp(otp.code)
ac.abort()
        }).catch(err => {
          console.log(err);
        });
    }
    
  },[])


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

            className=" w-full text-center  rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0"
          >
            <div className="-mt-4">
            <Lottie 
            
	    options={defaultOptions}
        height={200}
        width={200}
      
      />
            </div>
            <div className="space-y-4 sm:px-4">
              <Title className="text-center !text-xl font-bold leading-tight tracking-tight   md:!text-3xl ">
               {type==="phone"? <FormattedMessage id="phone-verification" />: <FormattedMessage id="email-verification" />}
              </Title>

<Text type="secondary">
{type==="phone"? <>
<FormattedMessage id="we-have-sent-a-code-to-your-phone" /> { maskEmailsPhones("+"+value.split("_").join(""))}
</>
: <>
<FormattedMessage id="we-have-sent-a-code-to-your-email" /> {maskEmailsPhones(value)}
</>}


</Text>
              <div dir="ltr" className="flex justify-center">
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={OTP_LENGTH}
                  // renderSeparator={<span>-</span>}
                  renderInput={(props) => (
                    <input
                      {...props}
                      className="mx-1 text-2xl !w-8 h-8 sm:!w-12 sm:h-12 rounded-lg focus-visible:outline-primary dark:focus-visible:outline-primary outline-gray-300 dark:outline-gray-900   outline-1 outline border-none"
                    />
                  )}
                />
              </div>

              <Button

                disabled={otp.length !== OTP_LENGTH || loading}
                htmlType="submit"
                size="large"
                type="primary"
                className={`w-full`}
                onClick={verifyOtp}
              >
                <FormattedMessage id="global.submit" />
                <span className="mx-2">
                  <Spin
                    indicator={
                      <LoadingOutlined style={{ fontSize: 20, color: "#fff" }} />
                    }
                    spinning={loading}
                  />
                </span>
              </Button>

              <Form
                form={form}
                onFinish={onFinish}
                layout="vertical"
                className="w-full "
              >
                {type === "email" ? (
                  <>
                    <Form.Item
                      hidden
                      name="email"
                    >
                      <Input />
                    </Form.Item>
                  </>
                ) : (
                  ""
                )}

                {type === "phone" ? (
                  <>
                    <Form.Item
                      hidden
                      name="phone"
                    >
                      <Input />
                    </Form.Item>
                  </>
                ) : (
                  ""
                )}

                <div className="text-center mt-4">
                <FormattedMessage id="didnt-recieve-code" />?

             
                  <Countdown
                    key={time}
                    date={time}
                    precision={2}
                    intervalDelay={0}
                    renderer={({ formatted: { minutes, seconds } }) => (
                      !(minutes === "00" && seconds === "00") ?    <>
                        <span  className="px-1">
                          {minutes}:{seconds}
                        </span>
                      </>:<Button
                      className="px-1"
                            htmlType="submit"
                            disabled={
                             sendLoader
                            }
                            type="link"
                          // className={`w-full  text-center `}
                          >

                            <FormattedMessage id="resend" />
                          </Button>
                    )}
                  />
                </div>
              </Form>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

export default Middleware(Otp, [
  ValidateOtpState,
  // MakeSureFromDirection
  //,FromSignupShouldBeLoginedAndNotVerified
]);
