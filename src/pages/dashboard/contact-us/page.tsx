import React, { useState } from "react";
import MainTable from "containers/mainIndexTable/MainTable";
import { generateCols } from "containers/mainIndexTable/cols";
import SearchFilter from "containers/mainIndexTable/searchFilter";
import {
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Button, Image, Popconfirm, Switch, Tooltip, Typography } from "antd";
import { useSelector } from "react-redux";
import axios, { URL } from "utlis/library/helpers/axios";
import { FormattedMessage } from "react-intl";
import middleware from "utlis/navigation/mw";
import PermissionGuard from "middlewares/Permissions";
import { getPermissions } from "utlis/library/helpers/permissions";
import dayjs from "dayjs";
import { useMutation } from "@tanstack/react-query";
import { FaFilter } from "react-icons/fa6";

export const config = {
  add: { url: "contact-us", method: "post", type: "Add" },
  edit: { url: "contact-us", method: "put", type: "Update" },
  delete: { url: "contact-us", method: "delete", type: "Delete" },
  findOne: {
    url: "contact-us",
    method: "get",
    type: "Get",
  },
};
const Index: React.FC = () => {
  const navigate = useNavigate();
  const profile = useSelector(({ profile }) => profile.data);

  const { idToken } = useSelector((state: any) => state.Auth);
  const [refresher, setRefresher] = useState(false);
  const { locale } = useSelector(
    ({ LanguageSwitcher }: { LanguageSwitcher: ILanguageSwitcher }) =>
      LanguageSwitcher.language
  );

  const [filter, setFilter] = useState(false); // For filter
  const [url, setUrl] = useState("contact-us"); // For url

  const deleteItem = (id) => {
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
          setRefresher((old) => !old);
          return message || "Backend Error Occured";
        },
        error: (err) => {
          return err.response?.data?.message || "Backend Error Occured";
        },
      }
    );
  };

  return (
    <>
      {/* <Button type="primary" onClick={() => setFilter((oldValue) => !oldValue)}>
        <FormattedMessage id="filter" /> <FaFilter className="mx-1"></FaFilter>
      </Button> */}
      {/* {filter && <Filter setUrl={setUrl}></Filter>} */}
      <MainTable
        config={config}
        url={url}
        refresher={refresher}
        addURL=""
        cols={generateCols([
          "name",
          {
            title: "email",
            content: (_, record) => (
              <Typography.Text
                className="cursor-pointer hover:underline"
                onClick={() =>
                  (window.location.href = `mailto:${record.email}`)
                }
                copyable
              >
                <Tooltip title={<FormattedMessage id="send-mail" />}>
                  {record.email}
                </Tooltip>
              </Typography.Text>
            ),
          },
          {
            title: "phone",
            content: (_, record) => (
              <Typography.Text
                className="cursor-pointer hover:underline"
                onClick={() => window.open(`https://wa.me/+${record.phone}`)}
                copyable
              >
                <Tooltip
                  title={<FormattedMessage id="send-whatsapp-message" />}
                >
                  {record.phone}
                </Tooltip>
              </Typography.Text>
            ),
          },
          {
            title: "message",
            content: (_, record) => (
              <Typography.Paragraph
                ellipsis={{
                  rows: 1,
                  expandable: true,
                  symbol: <FormattedMessage id="read-more" />,
                  onExpand: () => navigate(`show/${record.id}`),
                }}
              >
                {" "}
                {record.message}
              </Typography.Paragraph>
            ),
          },
          ...(function () {
            const show =
              getPermissions(config.edit.url, config.edit.type, profile) ||
              getPermissions(
                config.findOne.url,
                config.findOne.type,
                profile
              ) ||
              getPermissions(config.delete.url, config.delete.type, profile) ||
              true;
            return show
              ? [
                  {
                    title: "actions",
                    content: (_, record) => (
                      <div className="flex gap-2">
                        {getPermissions(
                          config.findOne.url,
                          config.findOne.type,
                          profile
                        ) || true ? (
                          <Button
                            onClick={() => navigate(`show/${record.id}`)}
                            icon={<EyeOutlined key="show" />}
                          />
                        ) : (
                          ""
                        )}
                      </div>
                    ),
                  },
                ]
              : [];
          })(),
        ])}
      />
    </>
  );
};

// export default middleware(Index, [
//   PermissionGuard(config.findOne.url, config.findOne.type),
// ]);
export default Index;
