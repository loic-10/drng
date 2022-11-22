const { getAppointmentByCode } = require("../../queries/appointments.queries");

exports.checkAppointmentExistFromParams = async (req, res, next) => {
  try {
    let { code } = req.params;
    if (code) {
      const appointment = await getAppointmentByCode(code);
      if (appointment) {
        req.appointment = appointment;
        next();
      } else {
        return res
          .status(404)
          .json({ success: false, msg: `Appointment ${code} not found!` });
      }
    } else {
      return res
        .status(400)
        .json({ success: false, msg: "Param 'code' is required!" });
    }
  } catch (e) {
    return res.status(500).json({ success: false, msg: e.message });
  }
};
