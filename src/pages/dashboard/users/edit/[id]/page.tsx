import { useEffect, useState } from "react";
import axios, { URL } from "utlis/library/helpers/axios";
import { toast } from "react-hot-toast";
import { Button, Col, DatePicker, Form, Input, Popconfirm, Progress, Row, Select, Spin, TimePicker, Upload } from "antd";
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { DeleteOutlined, FileDoneOutlined, QuestionCircleOutlined, UploadOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import { config } from "../../page";
import middleware from "utlis/navigation/mw";
import PermissionGuard from "middlewares/Permissions";
import { getPermissions } from "utlis/library/helpers/permissions";
import { useQuery } from "@tanstack/react-query";
import InputPhone from "components/UI/inputPhone";

const { Option } = Select;

function Edit() {
  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter((i) => i);
  const url = `/${pathSnippets.slice(0, 1 + 1).join("/")}`;
  const profile = useSelector(({ profile }) => profile.data);

  const { idToken } = useSelector((state: any) => state.Auth);
  const { locale } = useSelector(({ LanguageSwitcher }: { LanguageSwitcher: ILanguageSwitcher }) => LanguageSwitcher.language);
  const { id } = useParams();
  const [form] = useForm();
  const navigate = useNavigate();
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [isDeleteing, setIsDeleteing] = useState(false);
  const handleSubmit = (values) => {
    values.employee_id_image = values.employee_id_image.map((file: any) => file.originFileObj)[0];
    const fd = new FormData();
    for (const key in values) {
      if (values[key] !== undefined) {
        fd.append(key, values[key]);
      }
    }
    setIsSubmiting(true);
    toast.promise(
      axios[id ? config.edit.method : config.add.method](id ? `${config.edit.url}/${id}` : config.add.url, fd, {
        headers: {
          "X-Portal": "dashboard",
          Authorization: `Bearer ${idToken}`,
        },
      }),
      {
        loading: <div className="min-w-[200px]">{locale === "ar" ? "جاري المعالجة " : "Pending"}</div>,
        success: (res: any) => {
          const { message } = res.data;
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

  const deleteItem = () => {
    setIsDeleteing(true);
    toast.promise(
      axios[config.delete.method](`${config.delete.url}/${id}`, {
        headers: {
          "X-Portal": "dashboard",
          Authorization: `Bearer ${idToken}`,
        },
      }),
      {
        loading: locale === "ar" ? "جاري المعالجة " : "Pending",
        success: (res: any) => {
          const { message } = res.data;
          navigate(-1);
          setIsDeleteing(false);
          return message || "Backend Error Occured";
        },
        error: (err) => {
          setIsDeleteing(false);
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
    queryKey: [id, idToken],
    queryFn: () =>
      axios[config.findOne.method](`${config.findOne.url}/${id}`, {
        headers: {
          "X-Portal": "dashboard",
          Authorization: `Bearer ${idToken}`,
        },
      }),
    enabled: !!id,
  });

  useEffect(() => {
    if (isSuccess) {
      form.setFieldsValue(show.data?.data);
    }
  }, [isPending]);
  return (
    <>
      <Spin spinning={isFetching}>
        <div className="flex flex-row-reverse">
          {id && getPermissions(config.delete.url, config.delete.type, profile) ? (
            <Popconfirm
              title={<FormattedMessage id="delete.deleteItem" />}
              description={<FormattedMessage id="delete.areYouSure" />}
              onConfirm={() => deleteItem()}
              icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            >
              <Button loading={isDeleteing} icon={<DeleteOutlined className="mx-1" />} type="primary" danger>
                <FormattedMessage id="delete" />
              </Button>
            </Popconfirm>
          ) : (
            ""
          )}
        </div>

        <Row>
          <Col span={24}>
            <Form form={form} onFinish={handleSubmit} layout="vertical" className="login-form">
              <InputPhone />

              <Form.Item
                label={<FormattedMessage id="employee_id" />}
                name="employee_id"
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="employee_id" />,
                  },
                ]}
              >
                <Input size="large" />
              </Form.Item>

              <Form.Item
                label={
                  <span>
                    <FormattedMessage id="photo_of_employees_id_card" />
                  </span>
                }
                name="employee_id_image"
                valuePropName="fileList"
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="photo_of_employees_id_card" />,
                  },
                ]}
                getValueProps={function (url) {
                  return {
                    fileList:
                      typeof url === "string"
                        ? url
                          ? [
                              {
                                uid: "-1",
                                name: "photo",
                                status: "done",
                                url: URL + "/" + url,
                              },
                            ]
                          : []
                        : url,
                  };
                }}
                getValueFromEvent={(e) => {
                  if (Array.isArray(e)) {
                    return e;
                  }
                  return e && e.fileList;
                }}
              >
                <Upload
                  maxCount={1}
                  name="image"
                  beforeUpload={(file) => {
                    return false;
                  }}
                  listType="picture-card"
                  accept=".pdf,.jpg,.jpeg,.png,.webp"
                >
                  <Button type="text" icon={<UploadOutlined />} size="large">
                    <FormattedMessage id="upload" />
                  </Button>
                </Upload>
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
                  <span>{id ? <FormattedMessage id="global.save" /> : <FormattedMessage id="global.save" />}</span>
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
