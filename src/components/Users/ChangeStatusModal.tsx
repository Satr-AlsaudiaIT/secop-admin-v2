import React from "react";
import { Modal, Form, Select, Button } from "antd";
import { FormattedMessage } from "react-intl";
import { useMutation } from "@tanstack/react-query";
import axios from "utlis/library/helpers/axios";
import toast from "react-hot-toast";

interface ChangeStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedUser: any;
  idToken: string;
  onSuccess?: () => void;
}

interface StatusMutationVariables {
  id: number | string;
  status: number;
}

const statusList = {
  1: <FormattedMessage id="accept-joining-request" />,
  2: <FormattedMessage id="reject-joining-request" />,
};

const ChangeStatusModal: React.FC<ChangeStatusModalProps> = ({
  isOpen,
  onClose,
  selectedUser,
  idToken,
  onSuccess,
}) => {
  const [form] = Form.useForm();

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: StatusMutationVariables) => {
      const response = await axios.post(
        `users/${id}/change-status`,
        { status, _method: "patch" },
        {
          headers: {
            "X-Portal": "dashboard",
            Authorization: `Bearer ${idToken}`,
          },
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(
        data.message || <FormattedMessage id="status_updated_successfully" />
      );
      form.resetFields();
      onSuccess?.();
      onClose();
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || (
          <FormattedMessage id="failed_to_update_status" />
        )
      );
    },
  });

  const handleStatusChange = (values: { status: number }) => {
    if (!selectedUser) return;
    updateStatusMutation.mutate({
      id: selectedUser.id,
      status: values.status,
    });
  };

  return (
    <Modal
      title={<FormattedMessage id="change_status" />}
      open={isOpen}
      onCancel={() => {
        form.resetFields();
        onClose();
      }}
      footer={null}
    >
      <Form form={form} onFinish={handleStatusChange} layout="vertical">
        <Form.Item
          name="status"
          label={<FormattedMessage id="status" />}
          rules={[
            { required: true, message: <FormattedMessage id="status" /> },
          ]}
        >
          <Select
            placeholder={<FormattedMessage id="status"></FormattedMessage>}
          >
            {Object.entries(statusList)
              // .filter(([key]) => Number(key) !== 0 && Number(key) !== 3)
              .map(([key, value]) => (
                <Select.Option key={key} value={Number(key)}>
                  {value}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={updateStatusMutation.isPending}
          >
            <FormattedMessage id="global.submit" />
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ChangeStatusModal;
