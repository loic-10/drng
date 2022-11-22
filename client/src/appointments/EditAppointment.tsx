import { useHistory, useParams } from "react-router";
import AppointmentForm from "./AppointmentForm";
import React, { useEffect } from "react";
import { AppointmentUpdateDTO } from "./appointments.model";
import Loading from "../utils/Loading";
import DisplayErrors from "../utils/DisplayErrors";
import { Button, Space } from "antd";
import { Link } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  AppointmentState,
  getAppointment,
  restartDefaultState,
  updateAppointment,
} from "../redux";

export default function EditAppointment() {
  const history = useHistory();
  const { code }: any = useParams();
  const dispatch = useDispatch<any>();
  useEffect(() => {
    dispatch(restartDefaultState());
    dispatch(getAppointment({ code }));
  }, [dispatch]);
  const { appointmentSubmitError, appointmentSubmitLoading, appointment } =
    useSelector(
      (state: { appointment: AppointmentState }) => state.appointment
    );

  return (
    <>
      <Space
        size="large"
        className="py-4"
        direction="horizontal"
        align="center"
      >
        <Link className="btn btn-info text-white" to="/appointments">
          <Button
            type="ghost"
            className="mb-2 text-white"
            size="small"
            shape="circle"
            icon={<ArrowLeftOutlined />}
          />
        </Link>
        <h3 className="pt-2">Update Appointment {code}</h3>
      </Space>
      <DisplayErrors errors={appointmentSubmitError} />
      {appointment ? (
        <AppointmentForm
          isSubmitted={appointmentSubmitLoading}
          model={appointment}
          onFinish={(appointment: AppointmentUpdateDTO) => {
            const { date, requestDate, time } = appointment;
            appointment.date = new Date(date["$d"]).toLocaleDateString("fr");
            appointment.requestDate = new Date(
              requestDate["$d"]
            ).toLocaleDateString("fr");
            appointment.time = new Date(time["$d"]).toLocaleTimeString("fr");
            dispatch(
              updateAppointment({
                code,
                appointment,
                callback: () => history.push("/appointments"),
              })
            );
          }}
        />
      ) : (
        <Loading />
      )}
    </>
  );
}
