// /lib/constants.tsx

import {
  LayoutDashboard,
  ShoppingBag,
  UsersRound,
  Building,
  SprayCan,
  Utensils,
  Camera,
  // Transaction,
  Globe,
  Bell,
  Headset,
  Briefcase,
  FileText,
  MessageCircle,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { NavLink } from "./types";

export const navLinks: NavLink[] = [
  {
    url: "/",
    icon: <LayoutDashboard />,
    label: "Favorites",
  },
  {
    url: "/orders",
    icon: <ShoppingBag />,
    label: "Saved",
  },
  {
    url: "/users",
    icon: <UsersRound />,
    label: "Edit Profile",
  },
  {
    url: "/transactions",
    icon: "<Transaction />",
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
