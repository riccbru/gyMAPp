'use strict';
import { SideAuthItem } from "./SideAuthItem";
import { SideThemeItem } from "./SideThemeItem";
import { ChartNoAxesCombined, Dumbbell, FileDown, Home, Utensils } from "lucide-react";

const sidebarItems = [

  {
    type: "menu",
    title: "Home",
    url: "/home",
    icon: Home,
  },
  {
    type: "menu",
    title: "Stats",
    url: "/stats",
    icon: ChartNoAxesCombined,
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
    title: "File Download",
    url: "/file",
    icon: FileDown,
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