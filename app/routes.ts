import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("relational-devices", "routes/relational-devices.tsx"),
] satisfies RouteConfig;
