import React, { useEffect, useState } from "react";
import { FloatButton } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useHistory } from "react-router";
import AppointmentsBoard from "./components/AppointmentsBoard";
import { useDispatch, useSelector } from "react-redux";
import {
  AppointmentState,
  getAppointments,
  restartDefaultState,
} from "../redux";
import AppointmentsList from "./components/AppointmentsList";
import { searchAppointments } from "./helpers";

export default function IndexAppointments() {
  const history = useHistory();
  const dispatch = useDispatch<any>();
  useEffect(() => {
    dispatch(restartDefaultState());
    dispatch(getAppointments(null));
  }, [dispatch]);

  const { appointments, _search } = useSelector(
    (state: { appointment: AppointmentState }) => state.appointment
  );

  const [_appointments, setAppointments] = useState([...appointments]);

  useEffect(() => {
    setAppointments(searchAppointments(appointments, _search));
  }, [_search]);
  return (
    <>
      <AppointmentsBoard
        appointments={_search ? _appointments : appointments}
      />
      <AppointmentsList />
      <FloatButton
        icon={<PlusOutlined />}
        className="ms-auto text-white border-0 shadow-lg"
        shape="square"
        style={{ background: "#bd636f" }}
        onClick={() => history.push("/appointments/create")}
      />
    </>
  );
}
