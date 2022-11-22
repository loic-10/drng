import {
  configureStore,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { urlAppointments } from "../endpoints";
import axios from "axios";
import {
  AppointmentCreationDTO,
  AppointmentDTO,
  AppointmentUpdateDTO,
} from "../appointments/appointments.model";
import Swal from "sweetalert2";

export interface AppointmentState {
  appointment: AppointmentDTO | undefined | null;
  appointmentLoading: boolean;
  appointmentError: string[];
  appointmentSubmitLoading: boolean;
  appointmentSubmitError: string[];
  appointmentSubmitSuccess: string[];
  appointments: AppointmentDTO[];
  appointmentsLoading: boolean;
  appointmentsError: string[];
  _search: string;
}

const initialState: AppointmentState = {
  appointment: null,
  appointmentLoading: false,
  appointmentSubmitLoading: false,
  appointmentError: [],
  appointmentsError: [],
  appointmentSubmitError: [],
  appointmentSubmitSuccess: [],
  appointments: [],
  appointmentsLoading: false,
  _search: "",
};

export const getAppointments = createAsyncThunk<
  {
    msg: string;
    appointments: AppointmentDTO[];
  },
  null,
  {
    rejectValue: {
      msg: string;
    };
  }
>("appointments/getAppointments", async (appointment, { rejectWithValue }) => {
  try {
    const { data } = await axios.get<{
      msg: string;
      appointments: AppointmentDTO[];
    }>(`${urlAppointments}`);
    return data;
  } catch (error: any) {
    if (error?.response?.data?.msg) {
      Swal.fire("Get appointments", error.response.data.msg, "error").then();
      return rejectWithValue({ msg: error.response.data.msg });
    } else {
      return rejectWithValue({ msg: "Error" });
    }
  }
});

export const createAppointment = createAsyncThunk<
  {
    msg: string;
    appointment: AppointmentDTO;
  },
  { appointment: AppointmentCreationDTO; callback: any },
  {
    rejectValue: {
      msg: string;
    };
  }
>(
  "appointments/createAppointment",
  async ({ appointment, callback }, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.post<{
        msg: string;
        appointment: AppointmentDTO;
      }>(urlAppointments, appointment);
      Swal.fire("Create appointment", data.msg, "success").then();
      dispatch(getAppointments(null));
      callback();
      return data;
    } catch (error: any) {
      if (error?.response?.data?.msg) {
        Swal.fire(
          "Create appointment",
          error.response.data.msg,
          "error"
        ).then();
        return rejectWithValue({ msg: error.response.data.msg });
      } else {
        return rejectWithValue({ msg: "Error" });
      }
    }
  }
);

export const updateAppointment = createAsyncThunk<
  {
    msg: string;
    appointment: AppointmentDTO;
  },
  {
    code: string;
    appointment: AppointmentUpdateDTO;
    callback: any;
  },
  {
    rejectValue: {
      msg: string;
    };
  }
>(
  "appointments/updateAppointment",
  async ({ appointment, code, callback }, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.put<{
        msg: string;
        appointment: AppointmentDTO;
      }>(`${urlAppointments}/${code}`, appointment);
      Swal.fire("Update appointment", data.msg, "success").then();
      dispatch(getAppointments(null));
      callback();
      return data;
    } catch (error: any) {
      if (error?.response?.data?.msg) {
        Swal.fire(
          "Update appointment",
          error.response.data.msg,
          "error"
        ).then();
        return rejectWithValue({ msg: error.response.data.msg });
      } else {
        return rejectWithValue({ msg: "Error" });
      }
    }
  }
);

export const deleteAppointment = createAsyncThunk<
  {
    msg: string;
    appointment: AppointmentDTO;
  },
  {
    code: string;
  },
  {
    rejectValue: {
      msg: string;
    };
  }
>(
  "appointments/deleteAppointment",
  async ({ code }, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.delete<{
        msg: string;
        appointment: AppointmentDTO;
      }>(`${urlAppointments}/${code}`);
      Swal.fire("Delete appointment", data.msg, "success").then();
      dispatch(getAppointments(null));
      return data;
    } catch (error: any) {
      if (error?.response?.data?.msg) {
        Swal.fire(
          "Delete appointment",
          error.response.data.msg,
          "error"
        ).then();
        return rejectWithValue({ msg: error.response.data.msg });
      } else {
        return rejectWithValue({ msg: "Error" });
      }
    }
  }
);

export const getAppointment = createAsyncThunk<
  {
    msg: string;
    appointment: AppointmentDTO;
  },
  {
    code: string;
  },
  {
    rejectValue: {
      msg: string;
    };
  }
>("appointments/getAppointment", async ({ code }, { rejectWithValue }) => {
  try {
    const { data } = await axios.get<{
      msg: string;
      appointment: AppointmentDTO;
    }>(`${urlAppointments}/${code}`);
    return data;
  } catch (error: any) {
    if (error?.response?.data?.msg) {
      Swal.fire("Get appointment", error.response.data.msg, "error").then();
      return rejectWithValue({ msg: error.response.data.msg });
    } else {
      return rejectWithValue({ msg: "Error" });
    }
  }
});

const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    restartDefaultState: (state) => {
      state.appointmentLoading = false;
      state.appointmentError = [];
      state.appointment = null;
      state._search = "";
      state.appointmentSubmitLoading = false;
      state.appointmentSubmitError = [];
      state.appointmentSubmitSuccess = [];
      state.appointmentsLoading = false;
      state.appointmentsError = [];
    },
    changeSearch: (state, { payload }: PayloadAction<{ search: string }>) => {
      state._search = payload.search;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAppointments.pending, (state) => {
      state.appointmentsLoading = true;
    });
    builder.addCase(
      getAppointments.fulfilled,
      (state, { payload: { appointments } }) => {
        state.appointments = appointments;
        state.appointmentsLoading = false;
      }
    );
    builder.addCase(getAppointments.rejected, (state, { payload }) => {
      state.appointmentsError = [payload?.msg || ""];
      state.appointmentsLoading = false;
    });
    builder.addCase(createAppointment.pending, (state) => {
      state.appointmentSubmitSuccess = [];
      state.appointmentSubmitError = [];
      state.appointmentSubmitLoading = true;
    });
    builder.addCase(
      createAppointment.fulfilled,
      (state, { payload: { appointment, msg } }) => {
        state.appointment = appointment;
        state.appointmentSubmitSuccess = [msg];
        state.appointmentSubmitLoading = false;
      }
    );
    builder.addCase(createAppointment.rejected, (state, { payload }) => {
      state.appointmentSubmitError = [payload?.msg || ""];
      state.appointmentSubmitLoading = false;
    });
    builder.addCase(updateAppointment.pending, (state) => {
      state.appointmentSubmitSuccess = [];
      state.appointmentSubmitError = [];
      state.appointmentSubmitLoading = true;
    });
    builder.addCase(
      updateAppointment.fulfilled,
      (state, { payload: { appointment, msg } }) => {
        state.appointment = appointment;
        state.appointmentSubmitSuccess = [msg];
        state.appointmentSubmitLoading = false;
      }
    );
    builder.addCase(updateAppointment.rejected, (state, { payload }) => {
      state.appointmentSubmitError = [payload?.msg || ""];
      state.appointmentSubmitLoading = false;
    });
    builder.addCase(deleteAppointment.pending, (state) => {
      state.appointmentSubmitSuccess = [];
      state.appointmentSubmitError = [];
      state.appointmentSubmitLoading = true;
    });
    builder.addCase(
      deleteAppointment.fulfilled,
      (state, { payload: { appointment, msg } }) => {
        state.appointment = appointment;
        state.appointmentSubmitSuccess = [msg];
        state.appointmentSubmitLoading = false;
      }
    );
    builder.addCase(deleteAppointment.rejected, (state, { payload }) => {
      state.appointmentSubmitError = [payload?.msg || ""];
      state.appointmentSubmitLoading = false;
    });
    builder.addCase(getAppointment.pending, (state) => {
      state.appointmentError = [];
      state.appointmentLoading = true;
    });
    builder.addCase(
      getAppointment.fulfilled,
      (state, { payload: { appointment } }) => {
        state.appointment = appointment;
        state.appointmentLoading = false;
      }
    );
    builder.addCase(getAppointment.rejected, (state, { payload }) => {
      state.appointmentError = [payload?.msg || ""];
      state.appointmentLoading = false;
    });
  },
});

export const { restartDefaultState, changeSearch } = appointmentSlice.actions;

export const store = configureStore({
  reducer: {
    appointment: appointmentSlice.reducer,
  },
});
