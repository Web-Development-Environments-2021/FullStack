import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage")
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage")
  },
  {
    path: "/favoriteGames",
    name: "favoriteGames",
    component: () => import("./pages/FavoriteGamesPage")
  },
  {
    path: "/teamCard",
    name: "teamCard",
    component: () => import("./pages/TeamPage")
  },
  {
    path:"/playerPage",
    name:"playerPage",
    component:()=>import("./pages/PlayerPage")
  },
  {
    path:"/leagueManagment",
    name:"leagueManagment",
    component:()=>import("./pages/LeagueManagmentPage")
  },
  {
    path:"/About",
    name:"About",
    component:()=>import("./pages/AboutPage")
  },
  {
    path:"/Games",
    name:"Games",
    component:()=>import("./pages/GamesPage")
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound
  }
];

export default routes;
