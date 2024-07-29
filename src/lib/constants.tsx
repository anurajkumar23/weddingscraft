// /lib/constants.tsx

import {


  Bell,
  Headset,
  Briefcase,
  FileText,
  MessageCircle,
  HelpCircle,
  LogOut,
  ClipboardCheck,
  Heart,
  Bookmark,
  UserRoundPen,
 
} from "lucide-react";
import { NavLink } from "./types";



export const navLinks: NavLink[] = [
  {
    url: "/favorites",
    icon: <Heart />,
    label: "Favorites",
  },
  {
    url: "/saved",
    icon: <Bookmark />,
    label: "Saved",
  },
  {
    url: "/editProfile",
    icon: <UserRoundPen />,
    label: "Edit Profile",
  },
  {
    url: "/transactions",
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
    url: "/notifications",
    icon: <Bell />,
    label: "Notifications",
  },
  {
    url: "/customer-service",
    icon: <Headset />,
    label: "Customer Service",
  },
  {
    url: "/investor-relations",
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
  {
    url: "/logout",
    icon: <LogOut />,
    label: "Logout",
  },
];
