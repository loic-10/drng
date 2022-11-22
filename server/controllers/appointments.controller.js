const {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointmentByCode,
  deleteAppointmentByCode,
} = require("../queries/appointments.queries");

exports.appointmentGetOne = async (req, res) => {
  try {
    let { appointment, params } = req;
    const { code } = params;
    if (appointment) {
      return res.status(200).json({
        success: true,
        msg: `Appointment ${code} found!`,
        appointment,
      });
    } else {
      return res
        .status(404)
        .json({ success: false, msg: `Appointment ${code} not found!` });
    }
  } catch (e) {
    return res.status(500).json({ success: false, msg: e.message });
  }
};

exports.appointmentGetOneById = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const appointment = await getAppointmentById(id);
      if (appointment) {
        return res.status(200).json({
          success: true,
          msg: `Appointment ${id} found!`,
          appointment,
        });
      } else {
        return res
          .status(404)
          .json({ success: false, msg: `Appointment ${id} not found!` });
      }
    } else {
      return res
        .status(400)
        .json({ success: false, msg: "Param 'id' is required!" });
    }
  } catch (e) {
    return res.status(500).json({ success: false, msg: e.message });
  }
};

exports.appointmentGetAll = async (req, res) => {
  try {
    const appointments = await getAllAppointments();
    return res.status(200).json({ success: true, appointments });
  } catch (e) {
    return res.status(500).json({ success: false, msg: e.message });
  }
};

exports.appointmentCreate = async (req, res) => {
  try {
    let { body } = req;
    const appointment = await createAppointment(body);
    return res.status(201).json({
      success: true,
      msg: `Appointment ${appointment.code} created successfully!`,
      appointment,
    });
  } catch (e) {
    return res.status(500).json({ success: false, msg: e.message });
  }
};

exports.appointmentUpdate = async (req, res) => {
  try {
    let { body, appointment } = req;
    appointment = await updateAppointmentByCode(appointment.code, body);
    return res.status(200).json({
      success: true,
      msg: `Appointment ${appointment.code} updated successfully!`,
      appointment,
    });
  } catch (e) {
    return res.status(500).json({ success: false, msg: e.message });
  }
};

exports.appointmentDelete = async (req, res) => {
  try {
    let { appointment } = req;
    appointment = await deleteAppointmentByCode(appointment.code);
    return res.status(200).json({
      success: true,
      msg: `Appointment ${appointment.code} deleted successfully!`,
      appointment,
    });
  } catch (e) {
    return res.status(500).json({ success: false, msg: e.message });
  }
};
