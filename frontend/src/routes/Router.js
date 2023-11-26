import { lazy } from "react";
import { Navigate } from "react-router-dom";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/

const Starter = lazy(() => import("../views/Starter.js"));
const About = lazy(() => import("../views/About.js"));
const CreateDeviceAndRegister = lazy(() => import("../views/CreateDeviceAndRegister.js"))
const GetDevice = lazy(() => import("../views/GetDevice.js"))
const SparkPlug_B = lazy(() => import("../views/SparkPlug_B.js"))
const Modbus = lazy(() => import("../views/Modbus.js"))
const LocalStorage = lazy(() => import("../views/LocalStorage.js"))
const CloudStorage = lazy(() => import("../views/CloudStorage.js"))
const NodeParameter = lazy(() => import("../views/NodeParameter.js"))
// const Alerts = lazy(() => import("../views/ui/Alerts"));
// const Badges = lazy(() => import("../views/ui/Badges"));
// const Buttons = lazy(() => import("../views/ui/Buttons"));
// const Cards = lazy(() => import("../views/ui/Cards"));
// const Grid = lazy(() => import("../views/ui/Grid"));
// const Tables = lazy(() => import("../views/ui/Tables"));
// const Forms = lazy(() => import("../views/ui/Forms"));
// const Breadcrumbs = lazy(() => import("../views/ui/Breadcrumbs"));

/*****Routes******/

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/get-device" /> },
      { path: "/starter", exact: true, element: <Starter /> },
      { path: "/about", exact: true, element: <About /> },
      { path: "/create-device-and-register", exact: true, element: <CreateDeviceAndRegister /> },
      { path: "/get-device", exact: true, element: <GetDevice /> },
      { path: "/modbus", exact: true, element: <Modbus /> },
      // eslint-disable-next-line
      { path: "/spark-plug-b", exact: true, element: <SparkPlug_B /> },
      { path: "/local-storage", exact: true, element: <LocalStorage /> },
      { path: "/cloud-storage", exact: true, element: <CloudStorage /> },
      { path: "/cloud-storage", exact: true, element: <CloudStorage /> },
      { path: "/node-parameter", exact: true, element: <NodeParameter /> },
      // { path: "/alerts", exact: true, element: <Alerts /> },
      // { path: "/badges", exact: true, element: <Badges /> },
      // { path: "/buttons", exact: true, element: <Buttons /> },
      // { path: "/cards", exact: true, element: <Cards /> },
      // { path: "/grid", exact: true, element: <Grid /> },
      // { path: "/table", exact: true, element: <Tables /> },
      // { path: "/forms", exact: true, element: <Forms /> },
      // { path: "/breadcrumbs", exact: true, element: <Breadcrumbs /> },
    ],
  },
];

export default ThemeRoutes;