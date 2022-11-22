import { AppointmentDTO } from "../appointments.model";
import AppointmentBoardCard from "./AppointmentBoardCard";
import { Space } from "antd";
import Search from "antd/es/input/Search";
import { useDispatch } from "react-redux";
import { changeSearch } from "../../redux";

export default function AppointmentsBoard(props: AppointmentsBoardProps) {
  const [missed, rescheduled, passed, pending] = [
    "missed",
    "rescheduled",
    "passed",
    "pending",
  ].map(
    (_status) =>
      props.appointments.filter(({ status }) => status === _status)?.length
  );
  const dispatch = useDispatch<any>();
  return (
    <Space
      direction="vertical"
      className="my-4"
      size="middle"
      style={{ width: "100%" }}
    >
      <Space
        direction="horizontal"
        className="justify-content-between"
        align="center"
        style={{ width: "100%" }}
      >
        <div className="me-auto fs-5 text-danger text-opacity-75 fw-bolder">
          Appointments
        </div>
        <Search
          className="ms-auto"
          placeholder="Search"
          allowClear
          onChange={({ target }) =>
            dispatch(changeSearch({ search: target.value }))
          }
          style={{ width: 200 }}
        />
      </Space>

      <div className="row">
        {Object.entries({ missed, rescheduled, passed, pending }).map(
          ([status, count], index) => (
            <AppointmentBoardCard
              className="col-lg-3 col-md-6"
              status={status}
              count={count}
              key={index}
            />
          )
        )}
      </div>
    </Space>
  );
}

interface AppointmentsBoardProps {
  appointments: AppointmentDTO[];
}
