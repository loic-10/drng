const { Schema, model } = require("mongoose");
const moment = require("moment");

const appointmentSchema = Schema(
  {
    position: {
      type: Number,
      immutable: true,
    },
    code: {
      type: String,
      unique: [true, "Code already used!"],
      immutable: true,
    },
    name: {
      type: String,
      required: [true, "Name is required!"],
    },
    address: String,
    city: {
      type: String,
      required: [true, "City is required!"],
    },
    age: {
      type: Number,
      required: [true, "Age is required!"],
    },
    sex: {
      type: String,
      required: [true, "Sex is required!"],
      enum: ["male", "female"],
      default: "female",
    },
    email: {
      type: String,
      required: [true, "Email is required!"],
      trim: true,
      validate:
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    },
    phone: {
      type: String,
      required: [true, "Phone is required!"],
      minLength: 8,
      validate: /^[0-9]{1,12}$/,
    },
    date: {
      type: String,
      required: [true, "Date is required!"],
    },
    requestDate: {
      type: String,
      required: [true, "Date is required!"],
    },
    time: {
      type: String,
      required: [true, "Time is required!"],
    },
    firstTime: {
      type: Boolean,
      required: [true, "First Time is required!"],
    },
    status: {
      type: String,
      required: [true, "Status is required!"],
      enum: ["missed", "rescheduled", "passed", "pending"],
      default: "pending",
    },
    noteBefore: String,
    noteAfter: String,
  },
  {
    timestamps: true,
  }
);

appointmentSchema.pre("save", async function (next) {
  try {
    let appointment;
    appointment = await Appointment.getLastAppointment();
    const [YY, MM, DD] = moment(
      new Date(this.date.split("/").reverse().join("/"))
    )
      .format("YY-MM-DD")
      .split("-");
    let { position } = appointment || { position: 0 };
    position += 1;
    this.code = `A${position.toString().padStart(2, "0")}${DD}${MM}${YY}`;
    this.position = position;
    console.log("Pre save appointment");
  } catch (e) {
    console.log(e);
  }
  next();
});

appointmentSchema.post("save", async (data) => {
  try {
  } catch (e) {
    console.log(e);
  } finally {
    console.log("Post save appointment: ", data);
  }
});

appointmentSchema.pre("findOneAndUpdate", (next) => {
  console.log("Pre findOneAndUpdate appointment");
  next();
});

appointmentSchema.post("findOneAndUpdate", async (data) => {
  try {
  } catch (e) {
    console.log(e);
  } finally {
    console.log("Post update appointment: ", data);
  }
});

appointmentSchema.pre("findOneAndDelete", (next) => {
  console.log("Pre findOneAndDelete appointment");
  next();
});

appointmentSchema.post("findOneAndDelete", async (data) => {
  try {
  } catch (e) {
    console.log(e);
  } finally {
    console.log("Post delete appointment: ", data);
  }
});

appointmentSchema.pre("deleteMany", (next) => {
  console.log("Pre deleteMany appointment");
  next();
});

appointmentSchema.post("deleteMany", async (data) => {
  console.log("Pro deleteMany appointment: ", data);
});

appointmentSchema.statics.getAppointmentByCode = async function (code) {
  return Appointment.findOne({ code }).exec();
};

appointmentSchema.statics.getLastAppointment = async function () {
  return Appointment.findOne({}).sort({ createdAt: -1 }).exec();
};

const Appointment = model("appointment", appointmentSchema);

module.exports = Appointment;
