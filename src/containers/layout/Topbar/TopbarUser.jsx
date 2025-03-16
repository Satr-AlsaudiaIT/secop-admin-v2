import authAction from "store/auth/actions";
import { Avatar, Popover, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { FormattedMessage } from "react-intl";
import profileActions from "store/profile/actions";
import { URL } from "utlis/library/helpers/axios";
import { Link } from "react-router-dom";
const { logout } = authAction;
const { removeProfileData } = profileActions;

export default function TopbarUser() {
  const dispatch = useDispatch();
  const profile = useSelector(({ profile }) => profile.data);
  const content = (
    <div className="min-w-[10rem] flex flex-col gap-[2px]">
      <Link to={"profile"}>
        <Button className="w-full text-start" type="text">
          <FormattedMessage id="profile" />
        </Button>
      </Link>
      <Button
        className="w-full text-start"
        type="text"
        onClick={() => {
          dispatch(logout());
          dispatch(removeProfileData());
        }}
      >
        <FormattedMessage id="logout" />
      </Button>
    </div>
  );
  const avatar = (record) => {
    let parts = record?.name?.toUpperCase().split(" ");
    let x = parts?.[0]?.[0] ?? "";
    let y = parts?.[1]?.[0] ?? "";
    return <Avatar size={40} src={record?.image} style={{ background: "#3730a3" }} icon={x + y} />;
  };

  return (
    <Popover
      content={content}
      trigger="click"
      placement="bottom"

      // visible={visible}
      // onVisibleChange={handleVisibleChange}
      // arrowPointAtCenter={false}
    >
      <div className="flex gap-2 h-10 items-center cursor-pointer">
        {/* <h4 className="m-0">{profile.name}</h4> */}
        <div className="">
          {avatar({ name: profile.name, image: `${URL}/${profile.photoUrl}` })}
          {/* <Avatar icon={<UserOutlined />} /> */}

          <span className="userActivity online" />
        </div>
      </div>
    </Popover>
  );
}
