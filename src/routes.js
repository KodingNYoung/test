// core components
import Dashboard from "views/admin/Dashboard.js";
import Profile from "views/admin/Profile.js";
import Users from "views/admin/Users.js";
import Transaction from "views/admin/Transaction";
import Customers from "views/admin/Customers";
// @material-ui/icons components
import AccountCircle from "@material-ui/icons/AccountCircle";
import Dns from "@material-ui/icons/Dns";
import FormatListBulleted from "@material-ui/icons/FormatListBulleted";
import CompareArrows from "@material-ui/icons/CompareArrows";
import Group from "@material-ui/icons/Group";
import Tv from "@material-ui/icons/Tv";
// import VpnKey from "@material-ui/icons/VpnKey";
import VerifiedUser from '@material-ui/icons/VerifiedUser';
import { Settings, Cached } from "@material-ui/icons";
import Records from "views/admin/Records";
import Audits from "views/admin/Audits";
import Compliance from "views/admin/Compliance/index";
// import API from "views/admin/API";
import HostedPayment from "views/admin/HostedPayment";

var routes = [
  {
    path: "/index",
    name: "Overview",
    icon: Tv,
    iconColor: "Primary",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/transactions",
    name: "Transactions",
    icon: CompareArrows,
    iconColor: "Warning",
    component: Transaction,
    layout: "/admin",
  },
  {
    path: "/records",
    name: "Records",
    icon: Cached,
    iconColor: "Warning",
    component: Records,
    layout: "/admin",
  },
  {
    path: "/users",
    name: "Users",
    icon: Group,
    iconColor: "WarningLight",
    component: Users,
    layout: "/admin",
  },
  {
    path: "/audits",
    name: "Audits",
    icon: FormatListBulleted,
    iconColor: "Error",
    component: Audits,
    layout: "/admin",
  },
  {
    path: "/customers",
    name: "Customers",
    icon: AccountCircle,
    iconColor: "Info",
    component: Customers,
    layout: "/admin",
  },
  {
    path: "/compliance",
    name: "Compliance",
    icon: VerifiedUser,
    iconColor: "ErrorLight",
    component: Compliance,
    layout: "/admin",
  },
  
  // {
  //   path: "/login",
  //   name: "Compliance",
  //   icon: VerifiedUser,
  //   iconColor: "ErrorLight",
  //   component: Login,
  //   layout: "/auth",
  // },
  
  {
    divider: true,
  },
  {
    title: "Set Up",
  },
  {
    path: "/payment",
    name: "Hosted Payment",
    icon: Dns,
    component: HostedPayment,
    layout: '/admin'
  },
  // {
  //   path: "/api_settings",
  //   name: "API Token",
  //   icon: VpnKey,
  //   component: API,
  //   layout: "/admin"
  // },
  {
    path: '/settings',
    component: Profile,
    name: "Settings",
    icon: Settings,
    layout: "/admin"
  },
];
export default routes;
