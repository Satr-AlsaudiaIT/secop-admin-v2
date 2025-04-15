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
import { FaFilter } from "react-icons/fa6";
import Search from "../../../components/markets/Search";
import { FaSearch } from "react-icons/fa";
export const config = {
  add: { url: "markets", method: "post", type: "create" },
  edit: { url: "markets", method: "post", type: "update" },
  delete: { url: "markets", method: "delete", type: "delete" },
  findOne: {
    url: "markets",
    method: "get",
    type: "show",
  },
};
const Index: React.FC = () => {
  const navigate = useNavigate();
  const profile = useSelector(({ profile }) => profile.data);
  const [showSearch, setShowSearch] = useState(false);
  const [URL, setURL] = useState("markets");

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

  return (
    <>
      <div className="flex justify-between mb-4">
        <Button
          type="primary"
          onClick={() => setShowSearch((oldValue) => !oldValue)}
        >
          <FormattedMessage id="search" />
          <FaSearch className="mx-1"></FaSearch>
        </Button>
      </div>

      {showSearch && <Search setUrl={setURL}></Search>}
      <MainTable
        config={config}
        url={URL}
        refresher={refresher}
        cols={generateCols([
          "name_en",
          "name_ar",
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

// export default middleware(Index, [PermissionGuard("sectors", "read")]);

export default Index;
