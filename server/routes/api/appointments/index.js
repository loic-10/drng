const {
  checkAppointmentExistFromParams,
} = require("../../../config/guards/appointments");

const {
  appointmentGetOneById,
  appointmentGetOne,
  appointmentCreate,
  appointmentDelete,
  appointmentGetAll,
  appointmentUpdate,
} = require("../../../controllers/appointments.controller");

const express = require("express");
const router = express.Router();

router.get("/:id/id", appointmentGetOneById);

router.get("/:code", checkAppointmentExistFromParams, appointmentGetOne);

router.get("/", appointmentGetAll);

router.post("/", appointmentCreate);

router.put("/:code", checkAppointmentExistFromParams, appointmentUpdate);

router.delete("/:code", checkAppointmentExistFromParams, appointmentDelete);

module.exports = router;
