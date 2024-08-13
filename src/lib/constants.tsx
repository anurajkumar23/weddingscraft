// /lib/constants.tsx

import {


  Bell,
  Headset,
  Briefcase,
  FileText,
  MessageCircle,
  HelpCircle,
  ClipboardCheck,
  Heart,
  Bookmark,
  UserRoundPen,
  User,
  LayoutDashboard,
 
} from "lucide-react";
import { NavLink } from "./types";



export const navLinks: NavLink[] = [

 {
  url: "/user/profile",
  icon:  <User />,
  label: "Profile",
 },
 {
  url: "/user/profile/dashboard",
  icon:  <LayoutDashboard />,
  label: "Dashboard",
},
  {
    url: "/user/profile/favorites",
    icon: <Heart />,
    label: "Favorites",
  },
  {
    url: "/user/profile/saved",
    icon: <Bookmark />,
    label: "Saved",
  },
  {
    url: "/user/profile/editProfile",
    icon: <UserRoundPen />,
    label: "Edit Profile",
  },
  {
    url: "/user/profile/transactions",
    icon: <ClipboardCheck />,
    label: "My Transaction",
  },
  // {
  //   url: "/change-language",
  //   icon: <Globe />,
  //   label: "Change language",
  //   // subLabel: "English",
  // },
  {
    url: "/user/profile/notifications",
    icon: <Bell />,
    label: "Notifications",
  },
  {
    url: "/user/profile/customer-service",
    icon: <Headset />,
    label: "Customer Service",
  },
  {
    url: "/user/profile/investor-relations",
    icon: <Briefcase />,
    label: "Investor Relations",
  },
  {
    url: "/policy",
    icon: <FileText />,
    label: "Policy",
  },
  {
    url: "/feedback",
    icon: <MessageCircle />,
    label: "Feedback",
  },
  {
    url: "/help",
    icon: <HelpCircle />,
    label: "Help",
  },
  // {
  //   url: "",
  //   icon: <LogOut />,
  //   label: "Logout",
  // },
];
