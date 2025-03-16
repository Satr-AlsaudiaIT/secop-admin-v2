import { Card, Input, Button, Space, Spin, Form, Select, Checkbox } from "antd";
import { FormattedMessage, useIntl } from "react-intl";
import { useForm } from "antd/es/form/Form";
import { statusList } from "../../pages/dashboard/users/page";
import { motion } from "framer-motion";

const { Option } = Select;

const SearchFilterCard = ({ setUrl }) => {
  // Hooks
  const [form] = useForm(); // Form
  const intl = useIntl();

  const handleFilterClick = (values) => {
    const keys = Object.keys(values);
    for (let i of keys) {
      if (values[i] === undefined) delete values[i];
    }
    const query = new URLSearchParams(values).toString();
    setUrl(`users?${query}`);
  };

  const reset = () => {
    form.resetFields();
    setUrl("users");
  };

  return (
    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Form form={form} onFinish={handleFilterClick} layout="vertical">
        <Card title={<FormattedMessage id="search_and_filter"></FormattedMessage>} bordered={true} className="my-5">
          <Space className="w-full" direction="vertical">
            {/* Search Input */}
            <Form.Item label={<FormattedMessage id="search" />} name="search">
              <Input size="large" />
            </Form.Item>
            {/* Dropdown for User Status */}
            <Form.Item label={<FormattedMessage id="status" />} name="status">
              <Select className="w-full" placeholder={<FormattedMessage id="status"></FormattedMessage>} size="large">
                {Object.keys(statusList).map((key) => (
                  <Option value={key}>{statusList[key]}</Option>
                ))}
              </Select>
            </Form.Item>

            {/* Filter Button */}
            <div className="flex gap-2">
              <Button type="primary" htmlType="submit">
                <FormattedMessage id="apply_filters"></FormattedMessage>
              </Button>
              <Button onClick={reset}>
                <FormattedMessage id="reset"></FormattedMessage>
              </Button>
            </div>
          </Space>
        </Card>
      </Form>
    </motion.div>
  );
};

export default SearchFilterCard;
