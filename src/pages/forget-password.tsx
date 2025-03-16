import { Button, Form, Input, Checkbox, Layout, theme } from "antd";
import { useState } from "react";
import LangSwitcher from "containers/layout/Topbar/LangSwitcher";
import ThemesSwitcher from "containers/layout/Topbar/ThemesSwitcher";
import authAction from "store/auth/actions";
import profileActions from "store/profile/actions";
import { useDispatch } from "react-redux";
import middleware from "utlis/navigation/mw";
import { useSelector } from "react-redux";
import { LoggedUserCanNotOpen } from "middlewares";
import axios from "utlis/library/helpers/axios";
import { toast } from "react-hot-toast";
import { FormattedMessage } from "react-intl";
import { Typography } from "antd";
import { permissionsTransform } from "utlis/library/helpers/permissions";
const { Title } = Typography;

const { login } = authAction;
const { fetchProfileDataSuccess } = profileActions;

function Login() {
  const dispatch = useDispatch();
  const { locale } = useSelector(
    ({ LanguageSwitcher }: { LanguageSwitcher: ILanguageSwitcher }) =>
      LanguageSwitcher.language
  );
  const {  isDark} = useSelector(
    ({ ThemeSwitcher }: { ThemeSwitcher: ISelectedTheme }) =>
      ThemeSwitcher
  );

  const { token } = theme.useToken();

  const [loading, setLoading] = useState(false);
  const onFinish = (values: any) => {
    setLoading(true);
    const myPromise = axios["post"]("/login", values, {
      headers: {
        "X-Portal": "dashboard",
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
          const { token, data, message } = res.data;

          dispatch(login(token));
          if (data.permissions) {
            data.permissions = permissionsTransform(data.permissions);
          }
          dispatch(fetchProfileDataSuccess(data));
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

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <div className="w-full container mx-auto p-6 box-border">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center text-[#3730a3] no-underline hover:no-underline font-bold text-2xl lg:text-4xl">
            <img
              key={111}
              width={300}
              height={146}
              className="h-[64px] w-auto"
              src="/icon/large.png"
              style={{
                filter:
                  isDark ? "contrast(0.5)" : "",
              }}
            />
          </div>
          <ul className="flex gap-3 items-center">
            <li className="isoUser">
              {" "}
              <ThemesSwitcher />{" "}
            </li>
            <li className="isoUser flex">
              {" "}
              <LangSwitcher />{" "}
            </li>
          </ul>
        </div>
      </div>
      <Layout
        style={{
          minHeight: "calc(100dvh - 144px)",
        }}
      >
        <div
          style={{
            minHeight: "calc(100dvh - 144px)",
          }}
          className="w-full flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0"
        >
          <div
            style={{
              backgroundColor: token.colorBgContainer,
            }}
            className="w-full  rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0"
          >
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <Title className="!text-l font-bold leading-tight tracking-tight  md:!text-xl ">
                <FormattedMessage id="signin.signToYourAccount" />
              </Title>
              <Form
                layout="vertical"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  label={<FormattedMessage id="email" />}
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: <FormattedMessage id="email" />,
                    },
                  ]}
                >
                  <Input size="large" />
                </Form.Item>
                <Form.Item
                  label={<FormattedMessage id="password" />}
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: <FormattedMessage id="password" />,
                    },
                  ]}
                >
                  <Input.Password size="large" />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked">
                  <Checkbox>
                    <FormattedMessage id="page.signInRememberMe" />
                  </Checkbox>
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    size="large"
                    className="w-full"
                    htmlType="submit"
                    loading={loading}
                  >
                    <FormattedMessage id="page.signInButton" />
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default middleware(Login, [LoggedUserCanNotOpen]);
