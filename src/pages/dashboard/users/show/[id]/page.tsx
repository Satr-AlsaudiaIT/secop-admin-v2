import { useEffect, useState } from "react";
import axios, { URL } from "utlis/library/helpers/axios";
import { toast } from "react-hot-toast";
import { Button, Col, Descriptions, Divider, Image, Popconfirm, Row, Spin, Table } from "antd";
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { DeleteOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { config } from "../../page";
import middleware from "utlis/navigation/mw";
import PermissionGuard from "middlewares/Permissions";
import { getPermissions } from "utlis/library/helpers/permissions";
import dayjs from "dayjs";

function Show() {
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
  const navigate = useNavigate();
  const [isDeleteing, setIsDeleteing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>({});

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

  useEffect(() => {
    if (id) {
      setLoading(true);
      axios[config.findOne.method](`${config.findOne.url}/${id}`, {
        headers: {
          "X-Portal": "dashboard",
          Authorization: `Bearer ${idToken}`,
        },
      })
        .then((response) => {
          setData(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    }
  }, [id, idToken]);

  return (
    <>
      <Spin spinning={loading}>





        <Row>
          <Col span={24}>
            <Descriptions bordered title={<FormattedMessage id="show" />}>
       
              <Descriptions.Item
                span={3}
                label={<FormattedMessage id="name" />}
              >
                {data.name ?? (
                  <div className="text-[#ccc]">
                    <FormattedMessage id="noData" />
                  </div>
                )}
              </Descriptions.Item>
              <Descriptions.Item
                span={3}
                label={<FormattedMessage id="email" />}
              >
                {data.email ?? (
                  <div className="text-[#ccc]">
                    <FormattedMessage id="noData" />
                  </div>
                )}
              </Descriptions.Item>

              <Descriptions.Item
                span={3}
                label={<FormattedMessage id="phone" />}
              >
                {data.phone ?? (
                  <div className="text-[#ccc]">
                    <FormattedMessage id="noData" />
                  </div>
                )}
              </Descriptions.Item>

              <Descriptions.Item
                span={3}
                label={<FormattedMessage id="employee_id" />}
              >
                {data.employee_id ?? (
                  <div className="text-[#ccc]">
                    <FormattedMessage id="noData" />
                  </div>
                )}
              </Descriptions.Item>
              <Descriptions.Item
                span={3}
                label={<FormattedMessage id="status" />}
              >
                {data.status ?? (
                  <div className="text-[#ccc]">
                    <FormattedMessage id="noData" />
                  </div>
                )}
              </Descriptions.Item>
            </Descriptions>

            <div className="flex gap-4 flex-wrap mt-8">
              <Button
                onClick={() => navigate(-1)}
                className="w-[90px]"
                // size="large"
              >
                <FormattedMessage id="global.back" />
              </Button>
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
          </Col>
        </Row>
      </Spin>
    </>
  );
}

// export default middleware(Show, [
//   PermissionGuard(config.findOne.url, config.findOne.type),
// ]);

export default Show