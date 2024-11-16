'use strict';
import { SideAuthItem } from "./SideAuthItem";
import { SideThemeItem } from "./SideThemeItem";
import { Calendar, ChartNoAxesCombined, Dumbbell, Home, Settings, Utensils } from "lucide-react";

const sidebarItems = [

  {
    type: "menu",
    title: "Home",
    url: "/home",
    icon: Home,
  },
  {
    type: "menu",
    title: "Meals",
    url: "/meals",
    icon: Utensils,
  },
  {
    type: "menu",
    title: "Workouts",
    url: "/workouts",
    icon: Dumbbell,
  },
  {
    type: "menu",
    title: "Progress",
    url: "/progresses",
    icon: ChartNoAxesCombined,
  },
  {
    type: "menu",
    title: "Calendar",
    url: "/calendar",
    icon: Calendar,
  },
  {
    type: "menu",
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
  {
    type: "component",
    component: SideAuthItem,
  },
  {
    type: "component",
    component: SideThemeItem,
  },

];

export { sidebarItems };