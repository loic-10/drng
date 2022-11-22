import { AppointmentDTO } from "../appointments.model";

export const searchAppointments = (
  appointments: AppointmentDTO[],
  searchValue: string = ""
) => [
  ...appointments.filter((appointment) => {
    return Object.values(appointment).some((value: any) =>
      value
        ?.toString()
        ?.toLowerCase()
        .includes(searchValue?.toString()?.toLowerCase())
    );
  }),
];
