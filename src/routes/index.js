import React from "react"
import { Redirect } from "react-router-dom"
// User profile
import UserProfile from "../pages/Authentication/UserProfile"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"
import ForgetPwd from "../pages/Authentication/ForgetPassword"

// Dashboard
import Dashboard from "../pages/Dashboard/index"
import Series from "../pages/Settings/Series";
import SeriesDetail from "../pages/Series/SeriesDetail";
import Scoring from "../pages/Settings/Scoring";
import Car from "../pages/Settings/Car";
import Licenses from "../pages/Licenses/Licenses";
import LicenseNew from "../pages/Licenses/LicenseNew";
import LicenseDetail from "../pages/Licenses/LicenseDetail";
import Users from "../pages/Users/Users";
import UserDetail from "../pages/Users/UserDetail";
import EventDetail from "../pages/Series/EventDetail";
import EntryDetail from "../pages/Series/EntryDetail";

const authProtectedRoutes = [
  { path: "/dashboard", component: Dashboard },
  { path: "/profile", component: UserProfile },
  { path: "/settings/series", component: Series },
  { path: "/settings/licenses/new", component: LicenseNew },
  { path: "/settings/licenses/:id", component: LicenseDetail },
  { path: "/settings/licenses", component: Licenses },
  { path: "/settings/users/:id", component: UserDetail },
  { path: "/settings/users", component: Users },
  { path: "/settings/scoring", component: Scoring },
  { path: "/settings/cars", component: Car },
  { path: "/series/:id/entry/:entryId", component: EntryDetail },
  { path: "/series/:id/event/:eventId", component: EventDetail },
  { path: "/series/:id/:module", component: SeriesDetail },
  { path: "/series/:id", component: SeriesDetail },


  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> }
]

const publicRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/register", component: Register },
]

export { authProtectedRoutes, publicRoutes }
