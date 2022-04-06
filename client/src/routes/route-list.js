import Dashboardd from 'app/Dashboard';

import Pomodoro from "components/Pomodoro/Pomodoro"
import CalendarView from "components/ClendarView/index"
import Gant from "components/GantView/Gant"
import Notifications from 'components/Notifitions';
import Dashboard from "components/Dashboard/Dashboard"
import TimeLine from "pages/TimeLine/TimeLine"

import { Login, SignUp, Profile, Boards, Board, BoardFilter, BoardNotDone } from "pages"; 


export const routes = [
  {
    path: "/",
  },
  {
    path: "/boards",
    component: Boards,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/signup",
    component: SignUp,
  },
  {
    path: "/profile",
    component: Profile,
  },
  {
    path: "/pomodoro",
    component: Pomodoro,
  },
  {
    path: "/board/:id",
    component: Board,
  },
  {
    path: "/boardFilter/:id",
    component: BoardFilter,
  },
  {
    path: "/boardNotDone/:id",
    component: BoardNotDone,
  },
  {
    path: "/Dashboard",
    component: Dashboard,
  },
  {
    path: "/CalendarView",
    component: CalendarView,
  },
  {
    path: "/gant",
    component: Gant,
  },
  {
    path: "/Notifitions",
    component: Notifications,
  },
  {
    path: "/TimeLine",
    component: TimeLine,
  },
  // {
  //   path: "/charts/chart-js",
  //   component: Dashboard,
  // },
];
