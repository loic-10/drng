import AppointmentForm from "./AppointmentForm";
import { AppointmentCreationDTO } from "./appointments.model";
import React, { useEffect } from "react";
import DisplayErrors from "../utils/DisplayErrors";
import { Button, Space } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  AppointmentState,
  createAppointment,
  restartDefaultState,
} from "../redux";
import { useHistory } from "react-router";

export default function CreateAppointment() {
  const history = useHistory();
  const dispatch = useDispatch<any>();
  useEffect(() => {
    dispatch(restartDefaultState());
  }, [dispatch]);
  const { appointmentSubmitError, appointmentSubmitLoading } = useSelector(
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
        <h3 className="pt-2">Create Appointment</h3>
      </Space>
      <AppointmentForm
        model={{
          name: "",
          age: 0,
          date: new Date().toLocaleDateString("fr"),
          email: "",
          phone: "",
          address: "",
          city: "",
          firstTime: false,
          noteAfter: "",
          noteBefore: "",
          status: "pending",
          sex: "female",
          time: "08:00:00",
          requestDate: new Date().toLocaleDateString("fr"),
        }}
        isSubmitted={appointmentSubmitLoading}
        onFinish={(appointment: AppointmentCreationDTO) => {
          const { date, requestDate, time } = appointment;
          appointment.date = new Date(date["$d"]).toLocaleDateString("fr");
          appointment.requestDate = new Date(
            requestDate["$d"]
          ).toLocaleDateString("fr");
          appointment.time = new Date(time["$d"]).toLocaleTimeString("fr");
          dispatch(
            createAppointment({
              appointment,
              callback: () => history.push("/appointments"),
            })
          );
        }}
      />
      <DisplayErrors errors={appointmentSubmitError} />
    </>
  );
}
