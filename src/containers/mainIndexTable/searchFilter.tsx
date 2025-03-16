import { Input, Space, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";

export default function SearchFilter() {
  return {
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => {
      return (
        <div
          className="p-4 flex flex-col gap-4"
          onKeyDown={(e) => e.stopPropagation()}
        >
          <Input
            value={selectedKeys[0]}
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value, "search"] : []);
            }}
            onPressEnter={() => {
              confirm();
            }}
          />

          <Space>
            <Button
              type="primary"
              onClick={() => {
                confirm();
              }}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              <FormattedMessage id="search" />
            </Button>
            <Button
              onClick={() => {
                clearFilters();
                confirm({ closeDropdown: false });
              }}
              size="small"
              style={{ width: 90 }}
            >
              <FormattedMessage id="reset" />
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                close();
              }}
            >
              <FormattedMessage id="close" />
            </Button>
          </Space>
        </div>
      );
    },
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) => {
      return true;
    },
    onFilterDropdownOpenChange: (visible) => {
      // console.log("dropdown ", visible);
    },
    filterSearch: true,
  };
}
