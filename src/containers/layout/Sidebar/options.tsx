import { AppstoreOutlined, UserOutlined, LineChartOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import { AiOutlineAudit } from "react-icons/ai";
import { RiShipLine, RiRoadMapLine, RiUserSettingsFill, RiSettings2Fill } from "react-icons/ri";
import { TbBuildingEstate } from "react-icons/tb";
import {
  FaBoxOpen,
  FaCodeBranch,
  FaFileCircleQuestion,
  FaListUl,
  FaShop,
  FaUser,
} from "react-icons/fa6";
import {
  MdAssignmentAdd,
  MdCollectionsBookmark,
  MdContactPage,
  MdMeetingRoom,
  MdPolicy,
  MdWork,
} from "react-icons/md";
import { RiAuctionFill } from "react-icons/ri";
import { PiProjectorScreenChartFill, PiSlideshowFill } from "react-icons/pi";

import {
  MdOutlineLocalFireDepartment,
  MdOutlineCastForEducation,
  MdOutlineWorkOutline,
  MdLocationCity,
  MdOutlineImportExport,
  MdProductionQuantityLimits,
} from "react-icons/md";
import { getPermissions } from "utlis/library/helpers/permissions";
import {
  FaFileImport,
  FaQuestion,
  FaQuestionCircle,
  FaShieldAlt,
  FaCog,
  FaUsers,
} from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { FaAllergies } from "react-icons/fa";
import { GiButterflyKnife } from "react-icons/gi";
import { BiSolidCategory, BiSolidSelectMultiple } from "react-icons/bi";

import { SiMaterialformkdocs } from "react-icons/si";

// Registrations

interface MenuItem {
  key: string;
  to?: string;
  icon?: any;
  label: any;
  onClick?: () => void;
  hidden?: boolean;
  disabled?: boolean;
  children?: MenuItem[];
}
const getMenuItems: (profile) => MenuItem[] = (profile) => {
  console.log(profile);
  return [
    {
      key: "users",
      to: "users",
      label: <FormattedMessage id="users" />,
      icon: <FaUsers className="!text-xl" />,
      disabled: false,
      hidden: false,
    },
    {
      key: "settings",
      to: "settings",
      label: <FormattedMessage id="settings" />,
      icon: <FaCog className="!text-xl" />,
      disabled: false,
      hidden: false,
    },
    {
      key: "faqs",
      to: "faqs",
      label: <FormattedMessage id="faqs" />,
      icon: <FaQuestion className="!text-xl" />,
      disabled: false,
      hidden: false,
    },
    {
      key: "contact-us",
      to: "contact-us",
      label: <FormattedMessage id="users-inquiries" />,
      icon: <FaFileCircleQuestion className="!text-xl" />,
      disabled: false,
    },
    {
      key: "markets",
      to: "markets",
      label: <FormattedMessage id="markets" />,
      icon: <FaShop className="!text-xl" />,
      disabled: false,
    },

    // {
    //   key: "offers-group",
    //   label: <FormattedMessage id={"offers"} />,
    //   icon: <IoMdSettings className="!text-xl" />,
    //   disabled: false,
    //   children: [
    //     {
    //       key: "offers",
    //       to: "offers",
    //       label: <FormattedMessage id="offers" />,
    //       icon: <MdPolicy className="!text-xl" />,
    //       disabled: false,
    //       hidden: false,
    //     },
    //     {
    //       key: "voucher",
    //       to: `voucher`,
    //       label: <FormattedMessage id="voucher" />,
    //       icon: <AppstoreOutlined />,
    //       disabled: false,
    //       // hidden: !getPermissions("permissions", "Get", profile),
    //     },
    //   ],
    // },

    // {
    //   key: "profile",
    //   to: "profile",
    //   label: <FormattedMessage id="profile" />,
    //   icon: <FaUser className="!text-xl" />,
    //   disabled: false,
    //   hidden: false,
    // },
  ];
};
export default getMenuItems;
