import { useEffect, useState } from "react";
import axios, { URL } from "utlis/library/helpers/axios";
import { toast } from "react-hot-toast";
import { Button, Col, DatePicker, Form, Input, Popconfirm, Progress, Row, Select, Spin, TimePicker, Upload } from "antd";
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { DeleteOutlined, FileDoneOutlined, QuestionCircleOutlined, UploadOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import middleware from "utlis/navigation/mw";
import PermissionGuard from "middlewares/Permissions";
import { getPermissions } from "utlis/library/helpers/permissions";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const { Option } = Select;

function Edit() {
  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter((i) => i);
  const url = `/${pathSnippets.slice(0, 1 + 1).join("/")}`;
  const profile = useSelector(({ profile }) => profile.data);

  const { idToken } = useSelector((state: any) => state.Auth);
  const { locale } = useSelector(({ LanguageSwitcher }: { LanguageSwitcher: ILanguageSwitcher }) => LanguageSwitcher.language);
  const [form] = useForm();
  const navigate = useNavigate();
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [isDeleteing, setIsDeleteing] = useState(false);
  const queryClient = useQueryClient();

  const handleSubmit = (values) => {
    values._method = "put";
    setIsSubmiting(true);
    toast.promise(
      axios["post"]("settings/update", values, {
        headers: {
          "X-Portal": "dashboard",
          Authorization: `Bearer ${idToken}`,
        },
      }),
      {
        loading: <div className="min-w-[200px]">{locale === "ar" ? "جاري المعالجة " : "Pending"}</div>,
        success: (res: any) => {
          const { message } = res.data;
          queryClient.invalidateQueries({ queryKey: ["settings", idToken] });
          navigate(-1);
          setIsSubmiting(false);
          return message || "Backend Error Occured";
        },
        error: (err) => {
          setIsSubmiting(false);
          return err.response?.data?.message || "Backend Error Occured";
        },
      }
    );
  };

  // useEffect(() => {
  //   setLoadingFormRequireData(true);
  //   axios
  //     .get(`countries`, {
  //       headers: {
  //         "X-Portal": "dashboard",
  //         Authorization: `Bearer ${idToken}`,
  //       },
  //     })
  //     .then((res) => {
  //       setCountries(res.data.data);
  //       setLoadingFormRequireData(false);
  //     })
  //     .catch(() => {
  //       setLoadingFormRequireData(false);
  //     });
  // }, [idToken]);

  const {
    isFetching,
    isPending,
    isError,
    data: show,
    isSuccess,
  } = useQuery({
    queryKey: ["settings", idToken],
    queryFn: () =>
      axios["get"](`settings`, {
        headers: {
          "X-Portal": "dashboard",
          Authorization: `Bearer ${idToken}`,
        },
      }),
  });

  useEffect(() => {
    if (isSuccess) {
      form.setFieldsValue(show.data?.data);
    }
  }, [isPending]);
  return (
    <>
      <Spin spinning={isFetching}>
        <Row>
          <Col span={24}>
            <Form form={form} onFinish={handleSubmit} layout="vertical" className="login-form">
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
                label={<FormattedMessage id="phone" />}
                name="phone"
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="phone" />,
                  },
                ]}
              >
                <Input size="large" />
              </Form.Item>
              <Form.Item
                label="Facebook"
                name="facebook"
                rules={[
                  {
                    required: true,
                    message: "Facebook",
                  },
                ]}
              >
                <Input size="large" />
              </Form.Item>
              <Form.Item
                label="Instagram"
                name="instagram"
                rules={[
                  {
                    required: true,
                    message: "Instagram",
                  },
                ]}
              >
                <Input size="large" />
              </Form.Item>
              <Form.Item
                label="Twitter"
                name="twitter"
                rules={[
                  {
                    required: true,
                    message: "Twitter",
                  },
                ]}
              >
                <Input size="large" />
              </Form.Item>
              <Form.Item
                label="Snapchat"
                name="snapchat"
                rules={[
                  {
                    required: true,
                    message: "Snapchat",
                  },
                ]}
              >
                <Input size="large" />
              </Form.Item>

              <Form.Item
                label={<FormattedMessage id="about_us_ar" />}
                name="about_us_ar"
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="about_us_ar" />,
                  },
                ]}
              >
                <ReactQuill className={locale === "ar" ? "ar" : ""} theme="snow" />
              </Form.Item>
              <Form.Item
                label={<FormattedMessage id="about_us_en" />}
                name="about_us_en"
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="about_us_en" />,
                  },
                ]}
              >
                <ReactQuill className={locale === "ar" ? "ar" : ""} theme="snow" />
              </Form.Item>
              <Form.Item
                label={<FormattedMessage id="privacy_policy_ar" />}
                name="privacy_policy_ar"
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="privacy_policy_ar" />,
                  },
                ]}
              >
                <ReactQuill className={locale === "ar" ? "ar" : ""} theme="snow" />
              </Form.Item>
              <Form.Item
                label={<FormattedMessage id="privacy_policy_en" />}
                name="privacy_policy_en"
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="privacy_policy_en" />,
                  },
                ]}
              >
                <ReactQuill className={locale === "ar" ? "ar" : ""} theme="snow" />
              </Form.Item>
              <Form.Item
                label={<FormattedMessage id="terms_ar" />}
                name="terms_ar"
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="terms_ar" />,
                  },
                ]}
              >
                <ReactQuill className={locale === "ar" ? "ar" : ""} theme="snow" />
              </Form.Item>
              <Form.Item
                label={<FormattedMessage id="terms_en" />}
                name="terms_en"
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="terms_en" />,
                  },
                ]}
              >
                <ReactQuill className={locale === "ar" ? "ar" : ""} theme="snow" />
              </Form.Item>

              <div className="flex gap-4 flex-wrap mt-8">
                <Button
                  className="w-[90px]"
                  icon={<FileDoneOutlined />}
                  loading={isSubmiting}
                  type="primary"
                  htmlType="submit"
                  // size="large"
                >
                  <FormattedMessage id="global.save" />
                </Button>
                <Button
                  onClick={() => navigate(-1)}
                  className="w-[90px]"
                  // size="large"
                >
                  <FormattedMessage id="global.back" />
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Spin>
    </>
  );
}

// export default middleware(Edit, [
//   PermissionGuard(config.edit.url, config.edit.type),
// ]);
export default Edit;
