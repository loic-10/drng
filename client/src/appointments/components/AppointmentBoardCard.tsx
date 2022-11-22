export default function AppointmentBoardCard(props: AppointmentsBoardProps) {
  let appearance = "";
  switch (props.status) {
    case "passed":
      appearance = " bg-success bg-opacity-25 text-success";
      break;
    case "missed":
      appearance = " bg-danger bg-opacity-25 text-danger";
      break;
    case "rescheduled":
      appearance = " bg-warning bg-opacity-25 text-warning";
      break;
    case "pending":
      appearance = " bg-info bg-opacity-25 text-info";
      break;
  }
  return (
    <div className={props.className}>
      <div
        style={{ borderRadius: "5px 30px 5px 30px" }}
        className={"fw-bold text-capitalize p-3 my-2 shadow-sm " + appearance}
      >
        <div className="text-dark">{props.status}</div>
        <div className="fs-4">{props.count}</div>
      </div>
    </div>
  );
}

interface AppointmentsBoardProps {
  status: string | "missed" | "rescheduled" | "passed" | "pending";
  className: string;
  count: number;
}
