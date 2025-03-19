import { useEffect, useState } from "react";
import axios, { URL } from "utlis/library/helpers/axios";
import { toast } from "react-hot-toast";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Popconfirm,
  Progress,
  Row,
  Select,
  Spin,
  TimePicker,
  Upload,
} from "antd";
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  DeleteOutlined,
  FileDoneOutlined,
  QuestionCircleOutlined,
  UploadOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import { config } from "../../page";
import middleware from "utlis/navigation/mw";
import PermissionGuard from "middlewares/Permissions";
import { getPermissions } from "utlis/library/helpers/permissions";
import { useQuery } from "@tanstack/react-query";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import RichTextEditor from "components/rich-text-input/RichTextEditor";
const { Option } = Select;

function Edit({ isAdd }: { isAdd: boolean }) {
  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter((i) => i);
  const url = `/${pathSnippets.slice(0, 1 + 1).join("/")}`;
  const profile = useSelector(({ profile }) => profile.data);

  const { idToken } = useSelector((state: any) => state.Auth);
  const { locale } = useSelector(
    ({ LanguageSwitcher }: { LanguageSwitcher: ILanguageSwitcher }) =>
      LanguageSwitcher.language
  );
  const { id } = useParams();
  const [form] = useForm();
  const navigate = useNavigate();
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [isDeleteing, setIsDeleteing] = useState(false);
  const [answerAr, setAnswerAr] = useState(EditorState.createEmpty());
  const [answerEn, setAnswerEn] = useState(EditorState.createEmpty());

  const handleSubmit = (values) => {
    // if (isAdd) values.is_active = 0;
    if (!isAdd) values._method = "put";
    values.answer_ar = answerAr;
    values.answer_en = answerEn;

    setIsSubmiting(true);
    toast.promise(
      axios[id ? config.edit.method : config.add.method](
        id ? `${config.edit.url}/${id}` : config.add.url,
        values,
        {
          headers: {
            "X-Portal": "dashboard",
            Authorization: `Bearer ${idToken}`,
          },
        }
      ),
      {
        loading: (
          <div className="min-w-[200px]">
            {locale === "ar" ? "جاري المعالجة " : "Pending"}
          </div>
        ),
        success: (res: any) => {
          refetch();
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

  const {
    isFetching,
    isPending,
    isError,
    refetch,
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
          {id &&
          getPermissions(config.delete.url, config.delete.type, profile) ? (
            <Popconfirm
              title={<FormattedMessage id="delete.deleteItem" />}
              description={<FormattedMessage id="delete.areYouSure" />}
              onConfirm={() => deleteItem()}
              icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            >
              <Button
                loading={isDeleteing}
                icon={<DeleteOutlined className="mx-1" />}
                type="primary"
                danger
              >
                <FormattedMessage id="delete" />
              </Button>
            </Popconfirm>
          ) : (
            ""
          )}
        </div>

        <Row>
          <Col span={24}>
            <Form
              form={form}
              onFinish={handleSubmit}
              layout="vertical"
              className="login-form"
            >
              <Form.Item
                label={<FormattedMessage id="question_ar" />}
                name="question_ar"
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="required" />,
                  },
                ]}
              >
                <Input.TextArea size="large" />
              </Form.Item>
              <Form.Item
                label={<FormattedMessage id="question_en" />}
                name="question_en"
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="required" />,
                  },
                ]}
              >
                <Input.TextArea size="large" />
              </Form.Item>
              <Form.Item
                label={<FormattedMessage id="answer_ar" />}
                name="answer_ar"
                tooltip={{
                  title: (
                    <FormattedMessage id="please-press-enter-after-line" />
                  ),
                  icon: <InfoCircleOutlined />,
                }}
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="required" />,
                  },
                  {
                    validator: (_, value) => {
                      const strippedValue = value
                        .replace(/<[^>]+>/g, "")
                        .trim();
                      return strippedValue
                        ? Promise.resolve()
                        : Promise.reject(<FormattedMessage id="required" />);
                    },
                  },
                ]}
              >
                <RichTextEditor
                  value={isSuccess ?? show.data?.data?.answer_ar}
                  onChange={setAnswerAr}
                />
              </Form.Item>
              <Form.Item
                label={<FormattedMessage id="answer_en" />}
                name="answer_en"
                tooltip={{
                  title: (
                    <FormattedMessage id="please-press-enter-after-line" />
                  ),
                  icon: <InfoCircleOutlined />,
                }}
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="required" />,
                  },
                  {
                    validator: (_, value) => {
                      const strippedValue = value
                        .replace(/<[^>]+>/g, "")
                        .trim();
                      return strippedValue
                        ? Promise.resolve()
                        : Promise.reject(<FormattedMessage id="required" />);
                    },
                  },
                ]}
              >
                <RichTextEditor
                  value={isSuccess ?? show.data?.data?.answer_en}
                  onChange={setAnswerEn}
                />
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
                  <span>
                    {id ? (
                      <FormattedMessage id="global.save" />
                    ) : (
                      <FormattedMessage id="global.save" />
                    )}
                  </span>
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

// export default middleware(Edit, [PermissionGuard(config.edit.url, config.edit.type)]);
export default Edit;
