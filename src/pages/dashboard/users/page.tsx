import React, { useState } from "react";
import MainTable from "containers/mainIndexTable/MainTable";
import { generateCols } from "containers/mainIndexTable/cols";
import SearchFilter from "containers/mainIndexTable/searchFilter";
import { EditOutlined, EyeOutlined, DeleteOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Button, Image, Popconfirm, Tag, Tooltip } from "antd";
import { useSelector } from "react-redux";
import axios, { URL } from "utlis/library/helpers/axios";
import { FormattedMessage } from "react-intl";
import { getPermissions } from "utlis/library/helpers/permissions";
import { FaFilter } from "react-icons/fa6";
import Filter from "components/Users/Filter";
import { FaRepeat } from "react-icons/fa6";
import ChangeStatusModal from "components/Users/ChangeStatusModal";
import fallbackImage from "../../../assets/landingImages/fallback-image.png";

export const config = {
  add: { url: "users/invite", method: "post", type: "Add" },
  edit: { url: "users", method: "put", type: "Update" },
  delete: { url: "users", method: "delete", type: "Delete" },
  findOne: {
    url: "users",
    method: "get",
    type: "Get",
  },
};
export const statusList = {
  0: <FormattedMessage id="pending" />,
  1: <FormattedMessage id="accepted" />,
  2: <FormattedMessage id="rejected" />,
  3: <FormattedMessage id="invited" />,
};

const Index: React.FC = () => {
  const navigate = useNavigate();
  const profile = useSelector(({ profile }) => profile.data);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const { idToken } = useSelector((state: any) => state.Auth);
  const { locale } = useSelector(
    ({ LanguageSwitcher }: { LanguageSwitcher: ILanguageSwitcher }) =>
      LanguageSwitcher.language
  );
  const [refresher, setRefresher] = useState(false);
  const [filter, setFilter] = useState(false);
  const [url, setUrl] = useState("users");

  const showStatusModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const addTag = (status) => {
    return status == "0" ? (
      <Tag color="orange"> {statusList[status]}</Tag>
    ) : status == "1" ? (
      <Tag color="success"> {statusList[status]}</Tag>
    ) : status == "2" ? (
      <Tag color="error"> {statusList[status]}</Tag>
    ) : status == "3" ? (
      <Tag color="gold"> {statusList[status]}</Tag>
    ) : (
      statusList[status]
    );
  };

  return (
    <>
      <div className="flex justify-between mb-5">
        <Button type="primary" onClick={() => navigate("/dashboard/users/add")}>
          <FormattedMessage id="add" />{" "}
        </Button>

        <Button
          type="primary"
          onClick={() => setFilter((oldValue) => !oldValue)}
        >
          <FormattedMessage id="filter" />{" "}
          <FaFilter className="mx-1"></FaFilter>
        </Button>
      </div>

      {filter && <Filter setUrl={setUrl}></Filter>}

      <ChangeStatusModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        selectedUser={selectedUser}
        idToken={idToken}
        statusList={statusList}
        onSuccess={() => setRefresher((old) => !old)}
      />

      <MainTable
        config={config}
        url={url}
        refresher={refresher}
        addURL={""}
        cols={generateCols([
          "name",
          "email",
          "phone",
          "employee_id",
          {
            title: "status",
            content: (_, record) => {
              return addTag(record.status);
            },
          },
          {
            title: "employee_id_image",
            content: (_, record) => (
              <Image
                width={80}
                fallback={fallbackImage}
                src={record.employee_id_image}
              />
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
                        {record.status === 0 && (
                          <Tooltip
                            title={<FormattedMessage id="change_status" />}
                          >
                            <Button
                              onClick={() => showStatusModal(record)}
                              icon={<EditOutlined key="edit" />}
                            />
                          </Tooltip>
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
