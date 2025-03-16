import { useMutation } from "@tanstack/react-query";
import { AutoComplete, Button, Card, Col, Divider, Form, Input, InputNumber, Row, Upload } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useEffect, useState } from "react";
import axios, { URL } from "utlis/library/helpers/axios";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { FormattedMessage } from "react-intl";
import { DeleteOutlined, FileDoneOutlined, QuestionCircleOutlined, UploadOutlined } from "@ant-design/icons";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { PhoneNumberUtil } from "google-libphonenumber";
import profileActions from "store/profile/actions";
import { useNavigate } from "react-router-dom";

const phoneUtil = PhoneNumberUtil.getInstance();
const { fetchProfileDataSuccess } = profileActions;
// Promise.all(imageSelected.map(imageUrlToBase64)).then((newArray) =>
// setImgUrl(newArray)
// );
function Profile() {
  const profile = useSelector(({ profile }) => profile.data);
  const token = useSelector(({ Auth }: { Auth: IAuth }) => Auth.idToken);
  const role = useSelector(({ profile }) => profile.roles);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = useForm();

  const mutation = useMutation({
    mutationFn: (values) =>
      axios["post"]("profile", values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    onSuccess: (res) => {
      const { message } = res.data;
      axios["get"](`profile`, {
        headers: {
          "X-Portal": "dashboard",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          const { data } = response.data;
          data.isVerified = true;
          data.isApproved = true;
          data.isActivated = true;
          dispatch(fetchProfileDataSuccess(data));
          navigate("/dashboard");
        })
        .catch((error) => {});
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

  const onFinish = (values: any) => {
    values._method = "put";
    mutation.mutate(values);
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical" initialValues={profile}>
      <Divider orientation="left">
        <FormattedMessage id="edit-profile" />
      </Divider>
      <div className="w-full">
        <Card>
          <Form.Item
            label={<FormattedMessage id="name" />}
            name="name"
            rules={[
              {
                required: true,
                message: <FormattedMessage id="name" />,
              },
            ]}
          >
            <Input type="text" />
          </Form.Item>
          <Form.Item
            label={<FormattedMessage id="contactEmail" />}
            name="email"
            rules={[
              {
                required: true,
                message: <FormattedMessage id="contactEmail" />,
              },
              {
                type: "email",
                message: <FormattedMessage id="contactEmail" />,
              },
            ]}
          >
            <Input type="text" />
          </Form.Item>
          <Form.Item label={<FormattedMessage id="password" />} name="password">
            <Input.Password />
          </Form.Item>
        </Card>
      </div>
      <div className="text-end">
        <Form.Item>
          <Button type="primary" className="mt-4" htmlType="submit" loading={mutation.isPending}>
            <FormattedMessage id="global.save" />
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
}
export default Profile;
