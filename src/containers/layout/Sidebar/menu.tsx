import { Menu } from "antd";
import getMenuItems from "./options";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { AnimateSharedLayout, Variants, motion } from "framer-motion";
import HomeLayoutAnimation from "components/AnimationLayout/home-layout-animation";
import QueueAnim from 'rc-queue-anim';

const { SubMenu } = Menu;
interface MenuItem {
  key: string;
  to?: string;
  icon?: any;
  label: string;
  onClick?: () => void;
  hidden?: boolean;
  disabled?: boolean;
  children?: MenuItem[];
}
   

const MyMenu = ({collapsed}) => {
  const location = useLocation();
  const profile = useSelector(({ profile }) => profile.data);

  const renderMenuItem = (
    { key, to, label, onClick, hidden, children, icon, ...others }: MenuItem,
    index?: number
  ) => {
    // const isActive = location.pathname.substring(11) === key;
    if (hidden) {
      return null;
    }

    if (children) {
      return (
        <SubMenu
          className={`sider-antd-sub-menu`}
          key={key}
          icon={
            <div className=" icon-wraper -ms-4 h-full px-3 leading-normal align-baseline inline-flex">
              {icon}
            </div>
          }
          title={
            to || typeof to === "string" ? <Link to={to}>{label}</Link> : label
          }
          {...others}
        >
          {children.map((child) => renderMenuItem({ ...child }))}
        </SubMenu>
      );
    }

    return (
      <Menu.Item
        // className={`!flex`}
        
        key={key}
        icon={
          <div className=" icon-wraper -ms-4 h-full px-3 leading-normal align-baseline inline-flex">
            {icon}
          </div>
        }
        onClick={onClick}
        {...others}
      >
        {to || typeof to === "string" ? (
          <Link className="ms-2" to={to}>
            {label}
          </Link>
        ) : (
          label
        )}
      </Menu.Item>
    );
  };


  return (
<motion.div 
key={collapsed}
      initial={{ y: 30, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
      }}
     
      transition={{
        delay:  0.3 ,
        duration:  0.3,
      }}
>
<style>{`.sider-antd-sub-menu.ant-menu-submenu-inline ul.ant-menu-inline{border-radius:12px;}`}</style>
    <Menu
        className="h-full bg-transparent !border-none"
        // theme="light"
        // mode="vertical"
        mode="inline"
        selectedKeys={[location.pathname.substring(11)]}
        defaultSelectedKeys={[location.pathname.substring(11)]}
      >
 
        {getMenuItems(profile).map((item, index) =>
          renderMenuItem(item, index)
        )}
   

      </Menu>
</motion.div>
  );
};

export default MyMenu;
