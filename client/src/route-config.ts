import { RouteProps } from "react-router";
import IndexAppointments from "./appointments/IndexAppointments";
import CreateAppointment from "./appointments/CreateAppointment";
import EditAppointment from "./appointments/EditAppointment";
import RedirectToLandingPage from "./utils/RedirectToLandingPage";

const routes: RouteProps[] = [
  { path: "/appointments", component: IndexAppointments, exact: true },
  { path: "/appointments/create", component: CreateAppointment },
  { path: "/appointments/edit/:code", component: EditAppointment },

  { path: "/", component: IndexAppointments, exact: true },
  { path: "*", component: RedirectToLandingPage },
];

export default routes;
