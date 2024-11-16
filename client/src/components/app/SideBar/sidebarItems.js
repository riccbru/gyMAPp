'use strict';
import { SideAuth } from "./SideAuth";
import { SideTheme } from "./SideTheme";
import { Calendar, ChartNoAxesCombined, Dumbbell, Home, Settings, Utensils } from "lucide-react";

export const sidebarItems = [
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
    component: SideAuth,
  },
  {
    type: "component",
    component: SideTheme,
  },
];
