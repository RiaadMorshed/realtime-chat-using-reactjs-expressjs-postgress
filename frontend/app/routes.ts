import { type RouteConfig,route, index } from "@react-router/dev/routes";

export default [
    index("pages/home.tsx"),
    route("login", "pages/login.tsx"),
    route("register", "pages/register.tsx"),
    route("chat", "pages/chat.tsx")
] satisfies RouteConfig;
