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
import { Button, Image, Popconfirm, Switch } from "antd";
import { useSelector } from "react-redux";
import axios, { URL } from "utlis/library/helpers/axios";
import { FormattedMessage } from "react-intl";
import middleware from "utlis/navigation/mw";
import PermissionGuard from "middlewares/Permissions";
import { getPermissions } from "utlis/library/helpers/permissions";
import dayjs from "dayjs";
import { useMutation } from "@tanstack/react-query";
export const config = {
  add: { url: "faqs", method: "post", type: "create" },
  edit: { url: "faqs", method: "post", type: "update" },
  delete: { url: "faqs", method: "delete", type: "delete" },
  findOne: {
    url: "faqs",
    method: "get",
    type: "show",
  },
};
const Index: React.FC = () => {
  const navigate = useNavigate();
  const profile = useSelector(({ profile }) => profile.data);

  const { idToken } = useSelector((state: any) => state.Auth);
  const { locale } = useSelector(
    ({ LanguageSwitcher }: { LanguageSwitcher: ILanguageSwitcher }) =>
      LanguageSwitcher.language
  );
  const [refresher, setRefresher] = useState(false);

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

  // methods
  const changeStatusMutation = useMutation({
    mutationFn: (values: { id: number; is_active: number }) => {
      return axios["post"](
        `/faqs/${values.id}`,
        { _method: "put", is_active: values.is_active },
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );
    },
    onSuccess: (res) => {
      const { message } = res.data;
      toast.success(message, {
        position: "top-center",
        duration: 5000,
      });
    },
    onError: (err) => {
      const {
        data: { message },
      } = (err as any).response;

      toast.error(message, {
        position: "top-center",
        duration: 5000,
      });
    },
  });

  const changeStatus = (id: number, newStatus: number) => {
    const values = {
      id: id,
      is_active: newStatus,
    };
    changeStatusMutation.mutate(values);
  };

  return (
    <MainTable
      config={config}
      url="faqs"
      refresher={refresher}
      addURL={"add"}
      cols={generateCols([
        "question_en",
        {
          title: "answer_en",
          content: (_, record) => (
            <div dangerouslySetInnerHTML={{ __html: record.answer_en }}></div>
          ),
        },
        "question_ar",
        {
          title: "answer_ar",
          content: (_, record) => (
            <div dangerouslySetInnerHTML={{ __html: record.answer_ar }}></div>
          ),
        },
        ...(function () {
          const show =
            getPermissions(config.edit.url, config.edit.type, profile) ||
            getPermissions(config.findOne.url, config.findOne.type, profile) ||
            getPermissions(config.delete.url, config.delete.type, profile) ||
            true;
          return show
            ? [
                {
                  title: "actions",
                  content: (_, record) => (
                    <div className="flex gap-2">
                      {getPermissions(
                        config.edit.url,
                        config.edit.type,
                        profile
                      ) || true ? (
                        <Button
                          onClick={() => navigate(`edit/${record.id}`)}
                          icon={<EditOutlined key="edit" />}
                        />
                      ) : (
                        ""
                      )}

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
                      {getPermissions(
                        config.delete.url,
                        config.delete.type,
                        profile
                      ) || true ? (
                        <Popconfirm
                          title={<FormattedMessage id="delete.deleteItem" />}
                          description={
                            <FormattedMessage id="delete.areYouSure" />
                          }
                          onConfirm={() => deleteItem(record.id)}
                          icon={
                            <QuestionCircleOutlined style={{ color: "red" }} />
                          }
                        >
                          <Button
                            icon={<DeleteOutlined className="mx-1" />}
                            type="primary"
                            danger
                          />
                        </Popconfirm>
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
  );
};

// export default middleware(Index, [PermissionGuard("faqs", "read")]);

export default Index;
