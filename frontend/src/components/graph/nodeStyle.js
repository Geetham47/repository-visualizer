import {
  FaReact,
  FaRoute,
  FaDatabase,
  FaCog,
  FaCubes,
} from "react-icons/fa";

import {
  FiFile,
} from "react-icons/fi";

export function getNodeStyle(type) {

  switch (type) {

    case "component":

      return {

        color: "#8B5CF6",

        background: "#2A1F43",

        border: "#8B5CF6",

        label: "React Component",

        icon: FaReact,

      };

    case "route":

      return {

        color: "#22C55E",

        background: "#1D3528",

        border: "#22C55E",

        label: "Route",

        icon: FaRoute,

      };

    case "controller":

      return {

        color: "#EF4444",

        background: "#3B1D20",

        border: "#EF4444",

        label: "Controller",

        icon: FaCog,

      };

    case "service":

      return {

        color: "#3B82F6",

        background: "#1E2E48",

        border: "#3B82F6",

        label: "Service",

        icon: FaCubes,

      };

    case "model":

      return {

        color: "#F59E0B",

        background: "#43321D",

        border: "#F59E0B",

        label: "Model",

        icon: FaDatabase,

      };

    case "config":

      return {

        color: "#06B6D4",

        background: "#163540",

        border: "#06B6D4",

        label: "Configuration",

        icon: FiFile,

      };

    case "utility":

      return {

        color: "#94A3B8",

        background: "#2B313B",

        border: "#94A3B8",

        label: "Utility",

        icon: FiFile,

      };

    default:

      return {

        color: "#64748B",

        background: "#262A33",

        border: "#64748B",

        label: "File",

        icon: FiFile,

      };

  }

}