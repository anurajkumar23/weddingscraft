
// /lib/types.ts

import { ReactNode } from "react";

export interface NavLink {
  url: string;
  icon: ReactNode;
  label: string;
  innerLinks?: NavLink[];
}
