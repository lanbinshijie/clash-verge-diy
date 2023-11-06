import LogsPage from "./logs";
import ProxiesPage from "./proxies";
import ProfilesPage from "./profiles";
import SettingsPage from "./settings";
import ConnectionsPage from "./connections";
import RulesPage from "./rules";
import HomePage from "./home";

export const routers = [
  {
    label: "Label-Proxies",
    link: "/proxies",
    ele: ProxiesPage,
  },
  {
    label: "Label-Profiles",
    link: "/profile",
    ele: ProfilesPage,
  },
  {
    label: "Label-Connections",
    link: "/connections",
    ele: ConnectionsPage,
  },
  {
    label: "Label-Rules",
    link: "/rules",
    ele: RulesPage,
  },
  {
    label: "Label-Logs",
    link: "/logs",
    ele: LogsPage,
  },
  {
    label: "Label-Settings",
    link: "/settings",
    ele: SettingsPage,
  },
  {
    label: "Label-Home",
    link: "/",
    ele: HomePage,
  },
];
