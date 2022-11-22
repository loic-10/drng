const Appointment = require("../database/models/appointment.model");

exports.createAppointment = (appointment) =>
  new Appointment(appointment).save();

exports.updateAppointment = (appointmentId, appointment) =>
  Appointment.findByIdAndUpdate(
    appointmentId,
    { $set: appointment },
    { runValidators: true }
  );

exports.updateAppointmentByCode = (code, appointment) =>
  Appointment.findOneAndUpdate(
    { code },
    { $set: appointment },
    { runValidators: true }
  );

exports.deleteAppointment = (appointmentId) =>
  Appointment.findByIdAndDelete(appointmentId).exec();

exports.deleteAppointmentByCode = (code) =>
  Appointment.findOneAndDelete({ code }).exec();

exports.getAllAppointments = () => Appointment.find().exec();

exports.getAppointmentById = (appointmentId) =>
  Appointment.findById(appointmentId).exec();

exports.getAppointmentByCode = (code) => Appointment.findOne({ code }).exec();
